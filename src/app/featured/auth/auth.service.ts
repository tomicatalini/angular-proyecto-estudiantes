import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, map, of } from 'rxjs';
import { User } from '../user/models/models';
import { environment } from '../../../environments/environment';
import { Router } from '@angular/router';
import { CustomNotifierService } from 'src/app/core/services/custom-notifier.service';
import { Auth } from './models/models';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private _authUser$ = new BehaviorSubject<User | null>(null);
  public authUser$ = this._authUser$.asObservable();

  constructor(
    private httpClient: HttpClient,
    private router: Router,
    private notifier: CustomNotifierService
  ) { }

  isAuthenticated(): Observable<boolean> {
    return this.httpClient.get<User[]>(`${environment.baseApiUrl}/users`, {
        params: {
          token: localStorage.getItem('token') || ''
        }
      })
      .pipe(
        map((users) => !!users.length)
      );
  }

  login(payload: Auth) {
    this.httpClient.get<User[]>(`${environment.baseApiUrl}/users`, {
      params: {
        email: payload.email || '',
        password: payload.pass || ''
      }
    })
    .subscribe({
      next: (response) => {
        if(response.length){
          const user = response[0];

          localStorage.setItem('token', user.token);

          this._authUser$.next(user);
          this.router.navigate(['/dashboard']);
        } else {
          this.notifier.errorNotification('Email o contraseña invalida');
          this._authUser$.next(null);
        }
      },
      error: (err) => {
        if (err instanceof HttpErrorResponse) {
          let message = 'Ocurrio un error inespeado';
          if (err.status === 500) {
          }
          if (err.status === 401) {
            message = 'Email o contrasena invalida';
          }
          this.notifier.errorNotification(message);
        }
      }
    });
  }

  logout(){
    localStorage.removeItem('token');
    this.router.navigate(['/auth/login']);
  }
}
