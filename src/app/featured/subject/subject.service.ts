import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, take } from 'rxjs';
import { Subject } from './model/models';
import { ApiService } from 'src/app/core/services/api.service';
import { CustomNotifierService } from 'src/app/core/services/custom-notifier.service';

@Injectable({
  providedIn: 'root'
})
export class SubjectService {

  private _subjects$ = new BehaviorSubject<Subject[]>([]);

  constructor(
    private apiService: ApiService<Subject>,
    private notifierService: CustomNotifierService
  ) {}

  getAll(): Observable<Subject[]> {
    return this._subjects$.asObservable();
  }

  getById(subjectId: number): Observable<Subject | undefined> {
    return this.apiService.getById('subjects', subjectId).pipe(take(1));
  }

  load(): void {
    this.apiService
      .getAll('subjects')
      .subscribe({
        next: (subjects) => {
          this._subjects$.next(subjects)
        },
        error: () => this.notifierService.toastErrorNotification('No se pudo realizar la operación...')
      })
  }

  create(payload: Subject): void {
    this.apiService
      .create('subjects', payload)
      .subscribe({
        next: () => {
          this.load();
          this.notifierService.toastSuccessNotification('Operación exitosa!');
        },
        error: () => this.notifierService.toastErrorNotification('No se pudo realizar la operación...')
      });
  }

  update(id: number | string, payload: Subject): void {
    this.apiService
    .updateById('subjects', id, payload)
    .subscribe({
      next: () => {
        this.load();
        this.notifierService.toastSuccessNotification('Operación exitosa!');
      },
      error: () => this.notifierService.toastErrorNotification('No se pudo realizar la operación...')
    });
  }

  deleteById(subjectId: number): void {
    this.apiService
      .deleteById('subjects', subjectId)
      .subscribe({
        next: () => {
          this.load();
          this.notifierService.toastSuccessNotification('Operación exitosa!');
        },
        error: () => this.notifierService.toastErrorNotification('No se pudo realizar la operación...')
      });
  }
}
