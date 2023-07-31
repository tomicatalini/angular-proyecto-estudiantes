import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SubjectRoutingModule } from './subject-routing.module';
import { SubjectComponent } from './subject.component';
import { SubjectTableComponent } from './pages/subject-table/subject-table.component';
import { SubjectDialogFormComponent } from './pages/subject-dialog-form/subject-dialog-form.component';
import { SubjectDetailComponent } from './pages/subject-detail/subject-detail.component';
import { MaterialModule } from 'src/app/shared/modules/material.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';


@NgModule({
  declarations: [
    SubjectComponent,
    SubjectTableComponent,
    SubjectDialogFormComponent,
    SubjectDetailComponent
  ],
  imports: [
    CommonModule,
    SubjectRoutingModule,
    MaterialModule,
    SharedModule,
    ReactiveFormsModule,
    RouterModule
  ],
  exports: [
    SubjectComponent,
    SubjectDetailComponent
  ]
})
export class SubjectModule { }
