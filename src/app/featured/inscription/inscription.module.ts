import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StudentInscriptionDialogFormComponent } from './pages/student-inscription-dialog-form/student-inscription-dialog-form.component';
import { MaterialModule } from 'src/app/shared/modules/material.module';
import { ReactiveFormsModule } from '@angular/forms';
import { InscriptionTableComponent } from './pages/inscription-table/inscription-table.component';
import { RouterModule } from '@angular/router';
import { EffectsModule } from '@ngrx/effects';
import { InscriptionEffects } from './store/inscription.effects';
import { StoreModule } from '@ngrx/store';
import { inscriptionFeature } from './store/inscription.reducer';
import { CourseInscriptionDialogFormComponent } from './pages/course-inscription-dialog-form/course-inscription-dialog-form.component';



@NgModule({
  declarations: [
    InscriptionTableComponent,
    StudentInscriptionDialogFormComponent,
    CourseInscriptionDialogFormComponent,
  ],
  imports: [
    CommonModule,
    MaterialModule,
    ReactiveFormsModule,
    RouterModule,
    StoreModule.forFeature(inscriptionFeature),
    EffectsModule.forFeature([InscriptionEffects])
  ],
  exports: [
    StudentInscriptionDialogFormComponent,
    InscriptionTableComponent,
  ]
})
export class InscriptionModule { }
