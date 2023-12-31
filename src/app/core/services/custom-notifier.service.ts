import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import Swal, { SweetAlertOptions, SweetAlertResult } from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class CustomNotifierService {
  private _notifier$ = new Subject<SweetAlertOptions>();
  private _toastNotifier$ = new Subject<SweetAlertOptions>();

  constructor() {
    this._notifier$.subscribe( notification => Swal.fire(notification));
    this._toastNotifier$.subscribe( notification => Swal.fire(notification));
  }

  successNotification(text: string, title: string = 'Realizado'): void {
    this._notifier$.next({icon: 'success', title, text});
  }

  errorNotification(text: string, title: string = 'Error'): void {
    this._notifier$.next({icon: 'error', title, text});
  }

  toastSuccessNotification(message: string, timer?: number): void {
    this._toastNotifier$.next({
      position: 'top-end',
      icon: 'success',
      title: message,
      showConfirmButton: false,
      toast: true,
      timer: timer || 2500,
      timerProgressBar: true
    });
  }

  toastErrorNotification(message: string): void {
    this._toastNotifier$.next({
      position: 'top-end',
      icon: 'error',
      title: message,
      showConfirmButton: false,
      toast: true,
      timer: 2500,
      timerProgressBar: true
    });
  }

  errorPopup(title: string, text?: string): Promise<SweetAlertResult<any>> {
    return Swal.fire({
      icon: 'error',
      title: title,
      text,
      showCloseButton: true,
      showCancelButton: true,
      confirmButtonText: 'Aceptar',
      cancelButtonText: 'Cancelar',
    })
  }

  warnPopup(title: string, text?: string): Promise<SweetAlertResult<any>> {
    return Swal.fire({
      icon: 'warning',
      title: title,
      text,
      showCloseButton: true,
      showCancelButton: true,
      confirmButtonText: 'Aceptar',
      cancelButtonText: 'Cancelar',
    })
  }
}
