import { Injectable } from '@angular/core';
import { Student } from './model/student';
import { BehaviorSubject, Observable, take, map, of } from 'rxjs';
import { StudentMockService } from './mock/student-mock.service';

@Injectable({
  providedIn: 'root'
})
export class StudentService {
  private students$ = new BehaviorSubject<Student []>([]); 

  constructor(
    private studentMockService: StudentMockService
  ) {}

  getStudents(): Observable<Student[]>{
    return this.students$.asObservable();
  }

  loadStudents(): void {
    this.students$.next(this.studentMockService.getStudents());
  }

  getStudentById(id: number): Observable<Student | undefined> {
    return this.students$.pipe(take(1),map( (students) => students.find( s => s.id === id)));
  }

  createStudent(newStudent: Student): void {
    this.students$
      .pipe(
        take(1)
      )
      .subscribe( students => {
        this.students$.next([...students, {...newStudent, id: students.length + 1}]);
      });
  }  

  updateStudent(student: Student): void {
    this.students$
      .pipe(
        take(1)
      )
      .subscribe( students => {
        this.students$.next(students.map(s => {return s.id === student.id ? {...s, ...student} : s}));
      });
    
  }

  deleteStudentById(id: number): void {
    this.students$
    .pipe(
      take(1)
    )
    .subscribe( students => {
      this.students$.next(students.filter(s => s.id !== id));
    });
  }

  getTotal(): Observable<number> {
    return this.students$
      .pipe(
        take(1),
        map((students) => students.length)
      );
  }
}
