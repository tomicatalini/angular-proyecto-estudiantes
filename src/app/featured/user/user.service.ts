import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, take } from 'rxjs';
import { User } from './models/models';
import { ApiService } from 'src/app/core/services/api.service';
import { CustomNotifierService } from 'src/app/core/services/custom-notifier.service';
import { generateRandomString } from 'src/app/shared/utils/helpers';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private _users$ = new BehaviorSubject<User[]>([]);

  constructor(
    private apiService: ApiService<User>,
    private notifierService: CustomNotifierService
  ) {}

  getAll(): Observable<User[]> {
    return this._users$.asObservable();
  }

  getById(userId: number): Observable<User> {
    return this.apiService.getById('users', userId);
  }

  load(): void {
    this.apiService
      .getAll('users')
      .subscribe({
        next: (users) => {
          this._users$.next(users)
        },
        error: () => this.notifierService.toastErrorNotification('No se pudo realizar la operación...')
      })
  }

  create(payload: User): void {
    const token = generateRandomString(20);
    this.apiService
      .create('users', {...payload, token: token})
      .subscribe({
        next: () => {
          this.load();
          this.notifierService.toastSuccessNotification('Operación exitosa!');
        },
        error: () => this.notifierService.toastErrorNotification('No se pudo realizar la operación...')
      });
  }

  update(id: number, payload: User): Observable<User> {
    return this.apiService.updateById('users', id, payload);
  }

  deleteById(userId: number): Observable<User> {
    return this.apiService.deleteById('users', userId);
  }
}
