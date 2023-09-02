import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, concatMap } from 'rxjs/operators';
import { of } from 'rxjs';
import { CourseActions } from './course.actions';
import { CourseService } from '../course.service';
import { Store } from '@ngrx/store';
import { InscriptionService } from '../../inscription/inscription.service';


@Injectable()
export class CourseEffects {

  loadCourses$ = createEffect(() => {
    return this.actions$.pipe(

      ofType(CourseActions.loadCourses),
      concatMap(() =>
        this.courseService.getAll('courses').pipe(
          map(data => CourseActions.loadCoursesSuccess({ data })),
          catchError(error => of(CourseActions.loadCoursesFailure({ error }))))
      )
    );
  });

  loadCourseById$ = createEffect(() => {
    return this.actions$.pipe(

      ofType(CourseActions.loadCourseById),
      concatMap((action) =>
        this.courseService.getById('courses', action.courseId).pipe(
          map(data => CourseActions.loadCourseByIdSuccess({ data })),
          catchError(error => of(CourseActions.loadCourseByIdFailure({ error }))))
      )
    );
  });

  createCourse$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(CourseActions.createCourse),
      concatMap((action) => 
        this.courseService.create('courses',action.payload).pipe(
          map(data => CourseActions.createCourseSuccess( {data} )),
          catchError(error => of(CourseActions.createCourseFailure( {error} )))
        )
      )
    )
  });

  updateCourse$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(CourseActions.updateCourse),
      concatMap((action) => 
        this.courseService.updateById('courses',action.courseId, action.payload).pipe(
          map(data => CourseActions.updateCourseSuccess( {data} )),
          catchError(error => of(CourseActions.updateCourseFailure( {error} )))
        )
      )
    )
  });

  dateleCourseById$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(CourseActions.deleteCourse),
      concatMap((action) => 
        this.courseService.deleteById('courses', action.payload.id!).pipe(
          map(data => CourseActions.deleteCourseSuccess({payload: action.payload})),
          catchError(error => of(CourseActions.deleteCourseFailure( {error} )))
        )
      )
    )
  });

  loadEnrolledStudents$ = createEffect(() => {
    return this.actions$.pipe(

      ofType(CourseActions.loadEnrolledStudents),
      concatMap((action) =>
        this.courseService.getEnrolledStudents(action.courseId).pipe(
          map(data => CourseActions.loadEnrolledStudentsSuccess({ data })),
          catchError(error => of(CourseActions.loadEnrolledStudentsFailure({ error }))))
      )
    );
  });

  createStudentInscription$ = createEffect(() => {
    return this.actions$.pipe(

      ofType(CourseActions.createStudentInscription),
      concatMap((action) =>
        this.inscriptionService.create('inscriptions', action.payload).pipe(
          map((data) => CourseActions.createStudentInscriptionSuccess({ payload: data.courseId })),
          catchError(error => of(CourseActions.createStudentInscriptionFailure({ error }))))
      )
    );
  });

  deleteStudentInscription$ = createEffect(() => {
    return this.actions$.pipe(

      ofType(CourseActions.deleteStudentInscription),
      concatMap((action) =>
        this.inscriptionService.deleteById('inscriptions', action.payload.id!).pipe(
          map(() => CourseActions.deleteStudentInscriptionSuccess({ payload: action.payload.courseId })),
          catchError(error => of(CourseActions.loadEnrolledStudentsFailure({ error }))))
      )
    );
  });

  refreshCourses$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(
        CourseActions.createCourseSuccess, 
        CourseActions.updateCourseSuccess,
        CourseActions.deleteCourseSuccess,
      ),
      map(() => this.store.dispatch(CourseActions.loadCourses()))
    )
  }, {dispatch: false});

  inscriptionsOperations$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(
        CourseActions.createStudentInscriptionSuccess,
        CourseActions.deleteStudentInscriptionSuccess
      ),
      map((action) => 
        this.store.dispatch(CourseActions.loadEnrolledStudents({ courseId: action.payload}))
      )
    )
  }, {dispatch: false});

  constructor(
    private actions$: Actions, 
    private courseService: CourseService,
    private inscriptionService: InscriptionService, 
    private store: Store) {}
}
