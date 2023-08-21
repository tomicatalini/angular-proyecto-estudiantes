import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InscriptionDialogFormComponent } from './pages/inscription-dialog-form/inscription-dialog-form.component';
import { MaterialModule } from 'src/app/shared/modules/material.module';
import { ReactiveFormsModule } from '@angular/forms';
import { InscriptionTableComponent } from './pages/inscription-table/inscription-table.component';
import { RouterModule } from '@angular/router';
import { EffectsModule } from '@ngrx/effects';
import { InscriptionEffects } from './store/inscription.effects';
import { StoreModule } from '@ngrx/store';
import { inscriptionFeature } from './store/inscription.reducer';



@NgModule({
  declarations: [
    InscriptionDialogFormComponent,
    InscriptionTableComponent
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
    InscriptionDialogFormComponent,
    InscriptionTableComponent
  ]
})
export class InscriptionModule { }
