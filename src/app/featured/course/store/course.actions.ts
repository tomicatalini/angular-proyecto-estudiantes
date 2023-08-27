import { HttpErrorResponse } from '@angular/common/http';
import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { Course } from '../model/model';
import { Student } from '../../student/model/student';

export const CourseActions = createActionGroup({
  source: 'Course',
  events: {
    'Load Courses': emptyProps(),
    'Load Courses Success': props<{ data: Course[] }>(),
    'Load Courses Failure': props<{ error: HttpErrorResponse }>(),

    'Load Course By Id': props<{ courseId: number }>(),
    'Load Course By Id Success': props<{ data: Course }>(),
    'Load Course By Id Failure': props<{ error: HttpErrorResponse }>(),

    'Create Course': props<{ payload: Course }>(),
    'Create Course Success': props<{ data: Course }>(),
    'Create Course Failure': props<{ error: HttpErrorResponse }>(),

    'Update Course': props<{ courseId: number, payload: Course }>(),
    'Update Course Success': props<{ data: Course }>(),
    'Update Course Failure': props<{ error: HttpErrorResponse }>(),

    'Delete Course By Id': props<{ courseId: number }>(),
    'Delete Course By Id Success': props<{ data: Course }>(),
    'Delete Course By Id Failure': props<{ error: HttpErrorResponse }>(),

    'Load Enrolled Students': props<{ courseId: number }>(),
    'Load Enrolled Students Success': props<{ data: Student[] }>(),
    'Load Enrolled Students Failure': props<{ error: HttpErrorResponse }>(),
  }
});
