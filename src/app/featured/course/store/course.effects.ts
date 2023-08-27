import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, concatMap } from 'rxjs/operators';
import { of } from 'rxjs';
import { CourseActions } from './course.actions';
import { CourseService } from '../course.service';
import { Store } from '@ngrx/store';


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
  })

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
  })

  dateleCourseById$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(CourseActions.deleteCourseById),
      concatMap((action) => 
        this.courseService.deleteById('courses', action.courseId).pipe(
          map(data => CourseActions.deleteCourseByIdSuccess( {data} )),
          catchError(error => of(CourseActions.deleteCourseByIdFailure( {error} )))
        )
      )
    )
  })
  
  refreshCourses$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(CourseActions.createCourseSuccess, 
        CourseActions.updateCourseSuccess,
        CourseActions.deleteCourseByIdSuccess,
      ),
      map(() => this.store.dispatch(CourseActions.loadCourses()))
    )
  }, {dispatch: false})

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

  constructor(private actions$: Actions, private courseService: CourseService, private store: Store) {}
}
