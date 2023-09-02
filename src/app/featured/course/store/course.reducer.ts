import { createFeature, createReducer, on } from '@ngrx/store';
import { CourseActions } from './course.actions';
import { Course } from '../model/model';
import { Inscription } from '../../inscription/models/models';

export const courseFeatureKey = 'course';

export interface State {
  course: Course | null,
  courses: Course[],
  enrolledStudents: Inscription[],
  error: unknown
}

export const initialState: State = {
  course: null,
  courses: [],
  enrolledStudents: [],
  error: null
};

export const reducer = createReducer(
  initialState,

  on(CourseActions.loadCourses, state => state),
  on(CourseActions.loadCoursesSuccess, (state, action) => {
    return {
      ...state,
      courses: action.data
    }
  }),
  on(CourseActions.loadCoursesFailure, (state, action) => {
    return {
      ...state,
      error: action.error
    }
  }),

  on(CourseActions.loadCourseById, state => state),
  on(CourseActions.loadCourseByIdSuccess, (state, action) => {
    return {
      ...state,
      course: action.data,
    }
  }),
  on(CourseActions.loadCourseByIdFailure, (state, action) => {
    return {
      ...state,
      error: action.error,
    }
  }),

  on(CourseActions.loadEnrolledStudents, (state) => state),
  on(CourseActions.loadEnrolledStudentsSuccess, (state, action) => {
    return {
      ...state,
      enrolledStudents: action.data
    }
  }),
  on(CourseActions.loadEnrolledStudentsFailure, (state,action) => {
    return {
      ...state,
      error: action.error
    }
  }),
);

export const courseFeature = createFeature({
  name: courseFeatureKey,
  reducer,
});

