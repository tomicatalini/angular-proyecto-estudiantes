import { createFeature, createReducer, on } from '@ngrx/store';
import { InscriptionActions } from './inscription.actions';
import { Inscription } from '../models/models';
import { Student } from '../../student/model/student';

export const inscriptionFeatureKey = 'inscription';

export interface State {
  data: Inscription[],
  enrolledStudents: Student[],
  loading: boolean,
  error: unknown
}

export const initialState: State = {
  data: [],
  enrolledStudents: [],
  loading: false,
  error: null
};

export const reducer = createReducer(
  initialState,
  on(InscriptionActions.loadInscriptions, state => {
    return {
      ...state,
      loading: true,
    }
  }),
  on(InscriptionActions.loadInscriptionsSuccess, (state, action) => {
    return {
      ...state,
      data: action.data,
      loading: false,
    }
  }),
  on(InscriptionActions.loadInscriptionsFailure, (state, action) => {
    return {
      ...state,
      error: action.error,
      loading: false
    }
  }),

  on(InscriptionActions.loadEnrolledStudentsByFilter, state => {
    return {
      ...state,
      loading: true,
    }
  }),
  on(InscriptionActions.loadEnrolledStudentsByFilterSuccess, (state, action) => {
    return {
      ...state,
      enrolledStudents: action.data,
      loading: false,
    }
  }),
  on(InscriptionActions.loadEnrolledStudentsByFilterFailure, (state, action) => {
    return {
      ...state,
      error: action.error,
      loading: false
    }
  }),

  on(InscriptionActions.loadInscriptionsByStudentId, state => {
    return {
      ...state,
      loading: true,
    }
  }),
  on(InscriptionActions.loadInscriptionsByStudentIdSuccess, (state, action) => {
    return {
      ...state,
      loading: false,
      data: action.data
    }
  }),
  on(InscriptionActions.loadInscriptionsByStudentIdFailure, (state, action) => {
    return {
      ...state,
      loading: false,
      error: action.error
    }
  }),
  on(InscriptionActions.loadInscriptionsByCourseId, state => {
    return {
      ...state,
      loading: true,
    }
  }),
  on(InscriptionActions.loadInscriptionsByCourseIdSuccess, (state, action) => {
    return {
      ...state,
      loading: false,
      data: action.data
    }
  }),
  on(InscriptionActions.loadInscriptionsByCourseIdFailure, (state, action) => {
    return {
      ...state,
      loading: false,
      error: action.error
    }
  }),
);

export const inscriptionFeature = createFeature({
  name: inscriptionFeatureKey,
  reducer,
});

