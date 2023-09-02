import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, concatMap } from 'rxjs/operators';
import { of } from 'rxjs';
import { StudentActions } from './student.actions';
import { Store } from '@ngrx/store';
import { StudentService } from '../student.service';
import { InscriptionService } from '../../inscription/inscription.service';


@Injectable()
export class StudentEffects {

  loadStudents$ = createEffect(() => {
    return this.actions$.pipe(

      ofType(StudentActions.loadStudents),
      concatMap(() =>
        this.studentService.getAll('students').pipe(
          map(data => StudentActions.loadStudentsSuccess({ data })),
          catchError(error => of(StudentActions.loadStudentsFailure({ error }))))
      )
    );
  });

  loadStudentById$ = createEffect(() => {
    return this.actions$.pipe(

      ofType(StudentActions.loadStudentById),
      concatMap((action) =>
        this.studentService.getById('students',action.payload).pipe(
          map(data => StudentActions.loadStudentByIdSuccess({ data })),
          catchError(error => of(StudentActions.loadStudentByIdFailure({ error }))))
      )
    );
  });

  loadStudentCoursesInscriptions$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(StudentActions.loadStudentCoursesInscriptions),
      concatMap((action) => 
        this.inscriptionService.getAllByStudentId(action.payload).pipe(
          map(data => StudentActions.loadStudentCoursesInscriptionsSuccess( {data})),
          catchError(error => of(StudentActions.loadStudentCoursesInscriptionsFailure({error})))
        )
      )
    )
  })

  createStudent$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(StudentActions.createStudent),
      concatMap((action) => 
        this.studentService.create('students',action.payload).pipe(
          map(data => StudentActions.createStudentSuccess( {data} )),
          catchError(error => of(StudentActions.createStudentFailure( {error} )))
        )
      )
    )
  })

  updateStudent$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(StudentActions.updateStudent),
      concatMap((action) => 
        this.studentService.updateById('students',action.studentId, action.payload).pipe(
          map(data => StudentActions.updateStudentSuccess( {data} )),
          catchError(error => of(StudentActions.updateStudentFailure( {error} )))
        )
      )
    )
  })

  dateleStudentById$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(StudentActions.deleteStudentById),
      concatMap((action) => 
        this.studentService.deleteById('students', action.studentId).pipe(
          map(data => StudentActions.deleteStudentByIdSuccess( {data} )),
          catchError(error => of(StudentActions.deleteStudentByIdFailure( {error} )))
        )
      )
    )
  });

  createCourseInscription$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(StudentActions.createCourseInscription),
      concatMap((action) => 
        this.inscriptionService.create('inscriptions',action.payload).pipe(
          map(inscription => StudentActions.createCourseInscriptionSuccess({payload: inscription.studentId})),
          catchError(error => of(StudentActions.createCourseInscriptionFailure({error})))
        )
      )
    )
  });

  deleteCourseInscription$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(StudentActions.deleteCourseInscription),
      concatMap((action) => 
        this.inscriptionService.deleteById('inscriptions', action.payload.id!).pipe(
          map(() => StudentActions.deleteCourseInscriptionSuccess({ payload: action.payload.studentId })),
          catchError(error => of(StudentActions.deleteCourseInscriptionFailure({error})))
        )
      )
    )
  });
  
  studentsOperationsSuccess$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(
        StudentActions.createStudentSuccess, 
        StudentActions.updateStudentSuccess,
        StudentActions.deleteStudentByIdSuccess,
      ),
      map(() => this.store.dispatch(StudentActions.loadStudents()))
    )
  }, {dispatch: false});

  inscriptionsOperationsSuccess$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(
        StudentActions.createCourseInscriptionSuccess,
        StudentActions.deleteCourseInscriptionSuccess
      ),
      map((action) => this.store.dispatch(StudentActions.loadStudentCoursesInscriptions({payload: action.payload})))
    )
  }, {dispatch: false});
  
  constructor(
    private actions$: Actions,
    private studentService: StudentService,
    private inscriptionService: InscriptionService, 
    private store: Store) {}
}
