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
    private httpClient: HttpClient
  ) {}
  
  getById(entity: string, id: string | number) {
    return this.httpClient.get<T>(`${environment.baseApiUrl}/${entity}/${id}`).pipe(catchError(this.handlerError));
  }

  getAll(entity: string, relationship?: Relationship, params?: any): Observable<T[]> {
    let relationshipUrl = '';

    if(relationship){
      relationshipUrl = (relationship.type === 'child' ? '?_embed=' : '?_expand=') + relationship.name;
      return this.httpClient.get<T[]>(`${environment.baseApiUrl}/${entity}${relationshipUrl}`, {params}).pipe(catchError(this.handlerError));
    }

    return this.httpClient.get<T[]>(`${environment.baseApiUrl}/${entity}`, {params}).pipe(catchError(this.handlerError));
  }

  create(entity: string, body: T): Observable<T> {
    return this.httpClient.post<T>(`${environment.baseApiUrl}/${entity}`, body).pipe(catchError(this.handlerError));
  }

  updateById(entity: string, id: string | number, body: T): Observable<T> {
    return this.httpClient.put<T>(`${environment.baseApiUrl}/${entity}/${id}`, body).pipe(catchError(this.handlerError));
  }

  deleteById(entity: string, id: string | number): Observable<T> {
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
