import { Injectable } from '@angular/core';
import { Student } from './model/student';
import { BehaviorSubject, Observable, take, map, mergeMap } from 'rxjs';
import { ApiService } from 'src/app/core/services/api.service';
import { CustomNotifierService } from '../../core/services/custom-notifier.service';

@Injectable({
  providedIn: 'root'
})
export class StudentService {
  private students$ = new BehaviorSubject<Student []>([]); 

  constructor(
    private apiService: ApiService<Student>,
    private notifierService: CustomNotifierService
  ) {}

  getStudents(): Observable<Student[]>{
    return this.students$.asObservable();
  }

  loadStudents(): void {
    this.apiService
      .getAll('students')
      .subscribe(students => this.students$.next(students));
  }

  getStudentById(id: number | string): Observable<Student | undefined> {
    return this.apiService.getById('students', id).pipe(take(1));
  }

  createStudent(payload: Student): void {
    this.apiService
      .create('students', payload)
      .pipe(        
        mergeMap((newStudent) => this.students$.pipe(
          take(1),
          map((students) => [...students, newStudent])
        ))
      )
      .subscribe( {
        next: students => {
          this.students$.next(students);
          this.notifierService.toastSuccessNotification('Tenemos un nuevo estudiante!');
        },
        error: () => this.notifierService.toastErrorNotification('No se pudo realizar la operación..')
      });
  }  

  updateStudent(id: string | number, payload: Student): void {
    this.apiService
      .updateById('students', id, payload)
      .subscribe(() => this.loadStudents());    
  }

  deleteStudentById(id: number): void {
    this.apiService
      .deleteById('students', id)
      .subscribe(() => this.loadStudents());
  }

  getTotal(): Observable<number> {
    return this.students$
      .pipe(
        take(1),
        map((students) => students.length)
      );
  }
}
