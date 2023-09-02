import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { Inscription } from '../models/models';
import { HttpErrorResponse } from '@angular/common/http';
import { KeyValue } from '@angular/common';
import { Student } from '../../student/model/student';

export const InscriptionActions = createActionGroup({
  source: 'Inscription',
  events: {
    'Load Inscriptions': emptyProps(),
    'Load Inscriptions Success': props<{ data: Inscription[] }>(),
    'Load Inscriptions Failure': props<{ error: HttpErrorResponse }>(),

    'Load Enrolled Students By Filter': props<{ id: number, filter?: KeyValue<any, number | string> }>(),
    'Load Enrolled Students By Filter Success': props<{ data: Student[] }>(),
    'Load Enrolled Students By Filter Failure': props<{ error: HttpErrorResponse }>(),

    'Load Inscriptions By Student Id': props<{ payload: number }>(),
    'Load Inscriptions By Student Id Success': props<{ data: Inscription[] }>(),
    'Load Inscriptions By Student Id Failure': props<{ error: HttpErrorResponse }>(),
    
    'Load Inscriptions By Course Id': props<{ payload: number }>(),
    'Load Inscriptions By Course Id Success': props<{ data: Inscription[] }>(),
    'Load Inscriptions By Course Id Failure': props<{ error: HttpErrorResponse }>(),

    'Create Inscription': props< {payload: Inscription}>(),
    'Create Inscription Success': props<{ data: Inscription }>(),
    'Create Inscription Failure': props<{ error: HttpErrorResponse }>(),

    'Delete Inscription By Id': props< {payload: number}>(),
    'Delete Inscription By Id Success': props<{ data: Inscription }>(),
    'Delete Inscription By Id Failure': props<{ error: HttpErrorResponse }>(),
  }
});
