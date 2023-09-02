import { createFeature, createReducer, on } from '@ngrx/store';
import { StudentActions } from './student.actions';
import { Student } from '../model/student';
import { Inscription } from '../../inscription/models/models';

export const studentFeatureKey = 'student';

export interface State {
  student: Student | null,
  students: Student[],
  enrolledCourses: Inscription[],
  error: unknown
}

export const initialState: State = {
  student: null,
  students: [],
  enrolledCourses: [],
  error: null
};

export const reducer = createReducer(
  initialState,
  
  on(StudentActions.loadStudents, state => state),
  on(StudentActions.loadStudentsSuccess, (state, action) => {
    return {
      ...state,
      students: action.data,
    }
  }),
  on(StudentActions.loadStudentsFailure, (state, action) => {
    return {
      ...state,
      error: action.error,
    }
  }),

  on(StudentActions.loadStudentById, state => state),
  on(StudentActions.loadStudentByIdSuccess, (state, action) => {
    return {
      ...state,
      student: action.data,
    }
  }),
  on(StudentActions.loadStudentByIdFailure, (state, action) => {
    return {
      ...state,
      error: action.error,
    }
  }),

  on(StudentActions.loadStudentCoursesInscriptions, state => state),
  on(StudentActions.loadStudentCoursesInscriptionsSuccess, (state, action) => {
    return {
      ...state,
      enrolledCourses: action.data,
    }
  }),
  on(StudentActions.loadStudentCoursesInscriptionsFailure, (state, action) => {
    return {
      ...state,
      error: action.error,
    }
  }),

);

export const studentFeature = createFeature({
  name: studentFeatureKey,
  reducer,
});

