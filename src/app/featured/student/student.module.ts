import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StudentComponent } from './student.component';
import { StudentListComponent } from './components/student-list/student-list.component';
import { StudentDialogFormComponent } from './components/student-dialog-form/student-dialog-form.component';
import { CompleteNamePipe } from './pipes/complete-name.pipe';
import { ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from 'src/app/shared/modules/material.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { StudentMockService } from './mock/student-mock.service';
import { StudentDetailComponent } from './components/student-detail/student-detail.component';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [
    StudentComponent,
    StudentListComponent,
    StudentDialogFormComponent,
    StudentDetailComponent,
    CompleteNamePipe,
  ],
  imports: [
    CommonModule,
    MaterialModule,
    ReactiveFormsModule,
    SharedModule,
    RouterModule,
  ],
  exports:[
    StudentComponent,
    StudentListComponent,
    StudentDetailComponent,
  ],
  providers: [StudentMockService]
})
export class StudentModule { }
