import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StudentComponent } from './student.component';
import { StudentListComponent } from './components/student-list/student-list.component';
import { StudentDialogFormComponent } from './components/student-dialog-form/student-dialog-form.component';
import { CompleteNamePipe } from './pipes/complete-name.pipe';
import { ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from 'src/app/shared/modules/material.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { StudentMockService } from './mocks/student-mock.service';



@NgModule({
  declarations: [
    StudentComponent,
    StudentListComponent,
    StudentDialogFormComponent,
    CompleteNamePipe
  ],
  imports: [
    CommonModule,
    MaterialModule,
    ReactiveFormsModule,
    SharedModule
  ],
  exports:[
    StudentComponent,
    StudentListComponent,
  ],
  providers: [StudentMockService]
})
export class StudentModule { }
