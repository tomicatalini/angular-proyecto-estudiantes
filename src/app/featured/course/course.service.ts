import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, take } from 'rxjs';
import { Course } from './model/model';
import { ApiService } from 'src/app/core/services/api.service';
import { CustomNotifierService } from 'src/app/core/services/custom-notifier.service';

@Injectable({
  providedIn: 'root'
})
export class CourseService {

  private _courses$ = new BehaviorSubject<Course[]>([]);

  constructor(
    private apiService: ApiService<Course>,
    private notifierService: CustomNotifierService
  ) {}

  getAll(): Observable<Course[]> {
    return this._courses$.asObservable();
  }

  getById(courseId: number): Observable<Course | undefined> {
    return this.apiService.getById('courses', courseId).pipe(take(1));
  }

  load(): void {
    this.apiService
      .getAll('courses')
      .subscribe({
        next: (courses) => {
          this._courses$.next(courses)
        },
        error: () => this.notifierService.toastErrorNotification('No se pudo realizar la operación...')
      })
  }

  create(payload: Course): void {
    this.apiService
      .create('courses', payload)
      .subscribe({
        next: () => {
          this.load();
          this.notifierService.toastSuccessNotification('Operación exitosa!');
        },
        error: () => this.notifierService.toastErrorNotification('No se pudo realizar la operación...')
      });
  }

  update(id: number | string, payload: Course): void {
    this.apiService
    .updateById('courses', id, payload)
    .subscribe({
      next: () => {
        this.load();
        this.notifierService.toastSuccessNotification('Operación exitosa!');
      },
      error: () => this.notifierService.toastErrorNotification('No se pudo realizar la operación...')
    });
  }

  deleteById(courseId: number): void {
    this.apiService
      .deleteById('courses', courseId)
      .subscribe({
        next: () => {
          this.load();
          this.notifierService.toastSuccessNotification('Operación exitosa!');
        },
        error: () => this.notifierService.toastErrorNotification('No se pudo realizar la operación...')
      });
  }
}
