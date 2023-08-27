import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromCourse from './course.reducer';

export const selectCourseState = createFeatureSelector<fromCourse.State>(
  fromCourse.courseFeatureKey
);

export const selectCourse = createSelector(selectCourseState, state => state.course);
export const selectCourses = createSelector(selectCourseState, state => state.courses);
export const selectEnrolledStudent = createSelector(selectCourseState, state => state.enrolledStudents);
