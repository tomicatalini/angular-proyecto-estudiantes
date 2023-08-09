import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, take } from 'rxjs';
import { Inscription } from './models/models';
import { ApiService } from 'src/app/core/services/api.service';
import { CustomNotifierService } from 'src/app/core/services/custom-notifier.service';
import { Relationship } from '../../core/services/api.service';

@Injectable({
  providedIn: 'root'
})
export class InscriptionService {

  private _inscriptions$ = new BehaviorSubject<Inscription[]>([]);

  constructor(
    private apiService: ApiService<Inscription>,
    private notifierService: CustomNotifierService
  ) { }

  getSubscription(): Observable<Inscription[]> {
    return this._inscriptions$.asObservable();
  }

  getById(inscriptionId: number): Observable<Inscription | undefined> {
    return this.apiService.getById('inscriptions', inscriptionId).pipe(take(1));
  }

  getAll(param?: any): void {

    this.apiService
      .getAll('inscriptions', {type: 'parent', name:'course'}, param)
      .subscribe({
        next: (inscriptions) => {
          this._inscriptions$.next(inscriptions)
        },
        error: () => this.notifierService.toastErrorNotification('No se pudo realizar la operación...')
      })
  }

  create(payload: Inscription): void {
    this.apiService
      .create('inscriptions', payload)
      .subscribe({
        next: () => {
          this.getAll({studentId: payload.id});
          this.notifierService.toastSuccessNotification('Operación exitosa!');
        },
        error: () => this.notifierService.toastErrorNotification('No se pudo realizar la operación...')
      });
  }

  update(id: number | string, payload: Inscription): void {
    this.apiService
    .updateById('inscriptions', id, payload)
    .subscribe({
      next: () => {
        this.getAll({studentId: payload.id});
        this.notifierService.toastSuccessNotification('Operación exitosa!');
      },
      error: () => this.notifierService.toastErrorNotification('No se pudo realizar la operación...')
    });
  }

  deleteById(inscriptionId: number | string): void {
    this.apiService
      .deleteById('inscriptions', inscriptionId)
      .subscribe({
        next: () => {
          this.getAll('inscriptions');
          this.notifierService.toastSuccessNotification('Operación exitosa!');
        },
        error: () => this.notifierService.toastErrorNotification('No se pudo realizar la operación...')
      });
  }
}