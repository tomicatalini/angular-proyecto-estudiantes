import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, concatMap } from 'rxjs/operators';
import { of } from 'rxjs';
import { StudentActions } from './student.actions';
import { HttpClient } from '@angular/common/http';
import { Store } from '@ngrx/store';
import { StudentService } from '../student.service';


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

  loadStudentCourses$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(StudentActions.loadStudentCourses),
      concatMap((action) => 
        this.studentService.getAllStudentCourses(action.payload).pipe(
          map(data => StudentActions.loadStudentCoursesSuccess( {data})),
          catchError(error => of(StudentActions.loadStudentCoursesFailure({error})))
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
  })
  
  createStudentSuccess$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(StudentActions.createStudentSuccess, 
        StudentActions.updateStudentSuccess,
        StudentActions.deleteStudentByIdSuccess,
      ),
      map(() => this.store.dispatch(StudentActions.loadStudents()))
    )
  }, {dispatch: false})

  constructor(
    private actions$: Actions, 
    private httpClient: HttpClient,
    private studentService: StudentService, 
    private store: Store) {}
  
  // private getStudentById(studentId: number): Observable<Student> {
  //   return this.httpClient.get<Student>(environment.baseApiUrl + `/students/${studentId}`);
  // }

  // private getAll(): Observable<Student[]> {
  //   return this.httpClient.get<Student[]>(environment.baseApiUrl + `/students`);
  // }

  // private getAllStudentCourses(studentId: number):  Observable<Course[]>{
  //   return this.httpClient
  //     .get<Inscription[]>(environment.baseApiUrl + `/inscriptions?_expand=student&_expand=course&studentId=${studentId}`)
  //     .pipe(
  //       map((inscriptions) => inscriptions.map(inscription => inscription.course!))
  //     )
  // }

  // private createStudent(payload: Student): Observable<Student> {
  //   return this.httpClient.post<Student>(environment.baseApiUrl + `/students`, payload);
  // }

  // private updateStudent(studentId: number, payload: Student): Observable<Student> {
  //   return this.httpClient.put<Student>(environment.baseApiUrl + `/students/${studentId}`, payload);
  // }

  // private deleteStudentById(studentId: number): Observable<Student>{
  //   return this.httpClient.delete<Student>(environment.baseApiUrl + `/students/${studentId}`);
  // }
}
