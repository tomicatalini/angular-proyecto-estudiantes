import { createFeature, createReducer, on } from '@ngrx/store';
import { StudentActions } from './student.actions';
import { Student } from '../model/student';
import { Inscription } from '../../inscription/models/models';

export const studentFeatureKey = 'student';

export interface State {
  student: Student | null,
  data: Student[],
  inscriptions: Inscription[],
  loading: boolean,
  error: unknown
}

export const initialState: State = {
  student: null,
  data: [],
  inscriptions: [],
  loading: false,
  error: null
};

export const reducer = createReducer(
  initialState,
  
  on(StudentActions.loadStudents, state => {
    return {
      ...state,
      loading: true,
    }
  }),
  on(StudentActions.loadStudentsSuccess, (state, action) => {
    return {
      ...state,
      data: action.data,
      loading: false,
    }
  }),
  on(StudentActions.loadStudentsFailure, (state, action) => {
    return {
      ...state,
      error: action.error,
      loading: false,
    }
  }),

  on(StudentActions.loadStudentById, state => {
    return {
      ...state,
      loading: true,
    }
  }),
  on(StudentActions.loadStudentByIdSuccess, (state, action) => {
    return {
      ...state,
      student: action.data,
      loading: false,
    }
  }),
  on(StudentActions.loadStudentByIdFailure, (state, action) => {
    return {
      ...state,
      error: action.error,
      loading: false,
    }
  }),

  on(StudentActions.loadStudentCoursesInscriptions, state => {
    return {
      ...state,
      loading: true,
    }
  }),
  on(StudentActions.loadStudentCoursesInscriptionsSuccess, (state, action) => {
    return {
      ...state,
      inscriptions: action.data,
      loading: false,
    }
  }),
  on(StudentActions.loadStudentCoursesInscriptionsFailure, (state, action) => {
    return {
      ...state,
      error: action.error,
      loading: false,
    }
  }),

);

export const studentFeature = createFeature({
  name: studentFeatureKey,
  reducer,
});

