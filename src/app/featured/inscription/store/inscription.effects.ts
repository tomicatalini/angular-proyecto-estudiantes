import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, concatMap, tap } from 'rxjs/operators';
import { Observable, EMPTY, of } from 'rxjs';
import { InscriptionActions } from './inscription.actions';
import { InscriptionService } from '../inscription.service';
import { HttpClient } from '@angular/common/http';
import { Inscription } from '../models/models';
import { environment } from 'src/environments/environment';
import { Store } from '@ngrx/store';


@Injectable()
export class InscriptionEffects {

  loadInscriptions$ = createEffect(() => {
    return this.actions$.pipe(

      ofType(InscriptionActions.loadInscriptions),
      concatMap(() =>
        /** An EMPTY observable only emits completion. Replace with your own observable API request */
        this.inscriptionService.getAll('inscriptions').pipe(
          map(data => InscriptionActions.loadInscriptionsSuccess({ data })),
          catchError(error => of(InscriptionActions.loadInscriptionsFailure({ error }))))
      )
    );
  });

  loadEnrolledStudentsByFilter$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(InscriptionActions.loadEnrolledStudentsByFilter),
      concatMap((action) => {
        let obs$ = null;

        if(action.filter){
          obs$ = this.inscriptionService.getAllByCourseId(action.id, action.filter);
        } else {
          obs$ = this.inscriptionService.getAllByCourseId(action.id);
        }
        return obs$.pipe(
          map(inscriptions => inscriptions.map((inscription) => inscription.student!)),
          tap(console.log),
          map(students => InscriptionActions.loadEnrolledStudentsByFilterSuccess({data: students})),
          catchError(error => of(InscriptionActions.loadEnrolledStudentsByFilterFailure({ error })))
        )
      })
    )
  });

  loadInscriptionsByStudenId$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(InscriptionActions.loadInscriptionsByStudentId),
      concatMap((action) => 
        this.inscriptionService.getAllByStudentId(action.payload).pipe(
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
        this.inscriptionService.getAllByCourseId(action.payload).pipe(
          map(data => InscriptionActions.loadInscriptionsByCourseIdSuccess({data})),
          catchError(error => of(InscriptionActions.loadInscriptionsByCourseIdFailure({ error })))
        )
      )
    )
  });

  createInscription$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(InscriptionActions.createInscription),
      concatMap((action) =>
        this.inscriptionService.create('inscriptions',action.payload).pipe(
          map(data => InscriptionActions.createInscriptionSuccess({data})),
          catchError(error => of(InscriptionActions.createInscriptionFailure({error})))
        )
      )
    )
  });

  deleteInscriptionById$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(InscriptionActions.deleteInscriptionById),
      concatMap((action) =>
        this.inscriptionService.deleteById('inscriptions',action.payload).pipe(
          map(data => InscriptionActions.createInscriptionSuccess({data})),
          catchError(error => of(InscriptionActions.createInscriptionFailure({error})))
        )
      )
    )
  });

  // createStudentSuccess$ = createEffect(() => {
  //   return this.actions$.pipe(
  //     ofType(InscriptionActions.createInscriptionSuccess, 
  //       InscriptionActions.deleteInscriptionByIdSuccess,
  //     ),
  //     map(() => this.store.dispatch(InscriptionActions.loadInscriptions()))
  //   )
  // }, {dispatch: false})

  constructor(
    private actions$: Actions,
    private inscriptionService: InscriptionService,
    private store: Store
  ) {}
}
