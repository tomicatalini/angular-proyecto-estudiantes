import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, concatMap } from 'rxjs/operators';
import { Observable, EMPTY, of } from 'rxjs';
import { InscriptionActions } from './inscription.actions';
import { InscriptionService } from '../inscription.service';
import { HttpClient } from '@angular/common/http';
import { Inscription } from '../models/models';
import { environment } from 'src/environments/environment';


@Injectable()
export class InscriptionEffects {

  loadInscriptions$ = createEffect(() => {
    return this.actions$.pipe(

      ofType(InscriptionActions.loadInscriptions),
      concatMap(() =>
        /** An EMPTY observable only emits completion. Replace with your own observable API request */
        this.getAll().pipe(
          map(data => InscriptionActions.loadInscriptionsSuccess({ data })),
          catchError(error => of(InscriptionActions.loadInscriptionsFailure({ error }))))
      )
    );
  });

  loadInscriptionsByStudenId$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(InscriptionActions.loadInscriptionsByStudentId),
      concatMap((action) => 
        this.getAllByStudentId(action.payload).pipe(
          map(data => InscriptionActions.loadInscriptionsByStudentIdSuccess({data})),
          catchError(error => of(InscriptionActions.loadInscriptionsByStudentIdFailure({ error })))
        )
      )
    )
  });

  loadInscriptionsByCourseId$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(InscriptionActions.loadInscriptionsByCourseId),
      concatMap((action) => 
        this.getAllByCourseId(action.payload).pipe(
          map(data => InscriptionActions.loadInscriptionsByCourseIdSuccess({data})),
          catchError(error => of(InscriptionActions.loadInscriptionsByCourseIdFailure({ error })))
        )
      )
    )
  });


  constructor(
    private actions$: Actions,
    private apiService: InscriptionService,
    private httpClient: HttpClient
  ) {}
  
  private getAll(): Observable<Inscription[]>{
    return this.httpClient.get<Inscription[]>(environment.baseApiUrl + `/inscriptions`);
  }

  private getAllByStudentId(studentId: number): Observable<Inscription[]> {
    return this.httpClient.get<Inscription[]>(environment.baseApiUrl + `/inscriptions?_expand=student&_expand=course&studentId=${studentId}`);
  }

  private getAllByCourseId(courseId: number): Observable<Inscription[]> {
    return this.httpClient.get<Inscription[]>(environment.baseApiUrl + `/inscriptions?_expand=student&_expand=course&courseId=${courseId}`);
  }

}
