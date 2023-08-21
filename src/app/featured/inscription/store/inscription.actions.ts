import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { Inscription } from '../models/models';
import { HttpErrorResponse } from '@angular/common/http';

export const InscriptionActions = createActionGroup({
  source: 'Inscription',
  events: {
    'Load Inscriptions': emptyProps(),
    'Load Inscriptions Success': props<{ data: Inscription[] }>(),
    'Load Inscriptions Failure': props<{ error: HttpErrorResponse }>(),

    'Load Inscriptions By Student Id': props<{ payload: number }>(),
    'Load Inscriptions By Student Id Success': props<{ data: Inscription[] }>(),
    'Load Inscriptions By Student Id Failure': props<{ error: HttpErrorResponse }>(),
    
    'Load Inscriptions By Course Id': props<{ payload: number }>(),
    'Load Inscriptions By Course Id Success': props<{ data: Inscription[] }>(),
    'Load Inscriptions By Course Id Failure': props<{ error: HttpErrorResponse }>(),
  }
});
