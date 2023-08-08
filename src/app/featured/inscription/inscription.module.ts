import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InscriptionDialogFormComponent } from './pages/inscription-dialog-form/inscription-dialog-form.component';
import { MaterialModule } from 'src/app/shared/modules/material.module';
import { ReactiveFormsModule } from '@angular/forms';
import { InscriptionTableComponent } from './pages/inscription-table/inscription-table.component';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [
    InscriptionDialogFormComponent,
    InscriptionTableComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    ReactiveFormsModule,
    RouterModule
  ],
  exports: [
    InscriptionDialogFormComponent,
    InscriptionTableComponent
  ]
})
export class InscriptionModule { }
