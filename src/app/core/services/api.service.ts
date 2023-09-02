import { KeyValue } from '@angular/common';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';

export interface Relationship {
  type: 'child' | 'parent',
  name: string
} 

@Injectable({
  providedIn: 'root'
})
export class ApiService<T> {
  
  constructor(
    public httpClient: HttpClient
  ) {}
  
  getById(entity: string, id: number) {
    return this.httpClient.get<T>(`${environment.baseApiUrl}/${entity}/${id}`).pipe(catchError(this.handlerError));
  }

  getAll(entity: string, filter?: KeyValue<string, number | string>): Observable<T[]> {
    const url = `${environment.baseApiUrl}/${entity}`;
    
    if(filter){      
      return this.httpClient.get<T[]>(url, {params: {
        [filter.key]: filter.value
      }})
      .pipe(catchError(this.handlerError)); 
    }

    return this.httpClient.get<T[]>(url).pipe(catchError(this.handlerError));
  }

  create(entity: string, payload: T): Observable<T> {
    return this.httpClient.post<T>(`${environment.baseApiUrl}/${entity}`, payload).pipe(catchError(this.handlerError));
  }

  updateById(entity: string, id: number, payload: T): Observable<T> {
    return this.httpClient.put<T>(`${environment.baseApiUrl}/${entity}/${id}`, payload).pipe(catchError(this.handlerError));
  }

  deleteById(entity: string, id: number): Observable<T> {
    return this.httpClient.delete<T>(`${environment.baseApiUrl}/${entity}/${id}`).pipe(catchError(this.handlerError));
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
