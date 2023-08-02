import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';

const api_path = 'http://localhost:3000';

@Injectable({
  providedIn: 'root'
})
export class ApiService<T> {

  constructor(
    private httpClient: HttpClient
  ) {}
  
  getById(entity: string, id: string | number) {
    return this.httpClient.get<T>(`${api_path}/${entity}/${id}`).pipe(catchError(this.handlerError));
  }

  getAll(entity: string): Observable<T[]> {
    return this.httpClient.get<T[]>(`${api_path}/${entity}`).pipe(catchError(this.handlerError));
  }

  create(entity: string, body: T): Observable<T> {
    return this.httpClient.post<T>(`${api_path}/${entity}`, body).pipe(catchError(this.handlerError));
  }

  updateById(entity: string, id: string | number, body: T): Observable<T> {
    return this.httpClient.put<T>(`${api_path}/${entity}/${id}`, body).pipe(catchError(this.handlerError));
  }

  deleteById(entity: string, id: string | number): Observable<T> {
    return this.httpClient.delete<T>(`${api_path}/${entity}/${id}`).pipe(catchError(this.handlerError));
  }

  private handlerError(error: HttpErrorResponse) {
    if(error.error instanceof ErrorEvent){
      console.warn('Error del Front:', error.error.message);
    } else {
      console.warn(`Error del Back: ${error.status}`, error.message);
    }

    return throwError('Error en la comunicación http de la API-JsonServer');
  }
}
