import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StudentsComponent } from './students.component';
import { StudentListComponent } from './student-list/student-list.component';
import { StudentDialogFormComponent } from './student-dialog-form/student-dialog-form.component';
import { CompleteNamePipe } from './pipes/complete-name.pipe';
import { FormControlErrorPipe } from './pipes/form-control-error.pipe';
import { MaterialModule } from 'src/app/shared/modules/material.module';
import { ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    StudentsComponent,
    StudentListComponent,
    StudentDialogFormComponent,
    CompleteNamePipe,
    FormControlErrorPipe
  ],
  imports: [
    CommonModule,
    MaterialModule,
    ReactiveFormsModule
  ],
  exports: [
    StudentsComponent
  ]
})
export class StudentsModule { }
