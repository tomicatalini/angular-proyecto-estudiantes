import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { Student } from '../model/student';
import { HttpErrorResponse } from '@angular/common/http';
import { Inscription } from '../../inscription/models/models';

export const StudentActions = createActionGroup({
  source: 'Student',
  events: {
    'Load Students': emptyProps(),
    'Load Students Success': props<{ data: Student[] }>(),
    'Load Students Failure': props<{ error: HttpErrorResponse }>(),

    'Load Student By Id': props< {payload: number} >(),
    'Load Student By Id Success': props<{ data: Student }>(),
    'Load Student By Id Failure': props<{ error: HttpErrorResponse }>(),

    'Create Student': props<{ payload: Student }>(),
    'Create Student Success': props<{ data: Student }>(),
    'Create Student Failure': props<{ error: HttpErrorResponse }>(),

    'Update Student': props<{ studentId: number, payload: Student }>(),
    'Update Student Success': props<{ data: Student }>(),
    'Update Student Failure': props<{ error: HttpErrorResponse }>(),

    'Delete Student By Id': props<{ studentId: number }>(),
    'Delete Student By Id Success': props<{ data: Student }>(),
    'Delete Student By Id Failure': props<{ error: HttpErrorResponse }>(),

    'Load Student Courses Inscriptions': props< {payload: number} >(),
    'Load Student Courses Inscriptions Success': props<{ data: Inscription[] }>(),
    'Load Student Courses Inscriptions Failure': props<{ error: HttpErrorResponse }>(),

    'Create Course Inscription': props<{ payload: Inscription }>(),
    'Create Course Inscription Success': props<{ payload: number }>(),
    'Create Course Inscription Failure': props<{ error: HttpErrorResponse }>(),
    
    'Delete Course Inscription': props<{ payload: Inscription }>(),
    'Delete Course Inscription Success': props<{ payload: number }>(),
    'Delete Course Inscription Failure': props<{ error: HttpErrorResponse }>(),
  }
});
