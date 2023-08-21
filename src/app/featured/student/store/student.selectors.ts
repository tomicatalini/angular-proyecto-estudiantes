import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromStudent from './student.reducer';

export const selectStudentState = createFeatureSelector<fromStudent.State>(
  fromStudent.studentFeatureKey
);

export const selectStudent = createSelector(selectStudentState, state => state.student);
export const selectStudents = createSelector(selectStudentState, state => state.data);
export const selectStudentCourses = createSelector(selectStudentState, state => state.courses);