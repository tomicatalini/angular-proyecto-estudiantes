import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StudentComponent } from './student.component';
import { StudentListComponent } from './components/student-list/student-list.component';
import { StudentDialogFormComponent } from './components/student-dialog-form/student-dialog-form.component';
import { CompleteNamePipe } from './pipes/complete-name.pipe';
import { ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from 'src/app/shared/modules/material.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { StudentDetailComponent } from './components/student-detail/student-detail.component';
import { RouterModule } from '@angular/router';
import { StudentRoutingModule } from './student-routing.module';
import { InscriptionModule } from '../inscription/inscription.module';
import { CourseModule } from '../course/course.module';
import { EffectsModule } from '@ngrx/effects';
import { StudentEffects } from './store/student.effects';
import { StoreModule } from '@ngrx/store';
import { studentFeature } from './store/student.reducer';



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
    StudentRoutingModule,
    MaterialModule,
    ReactiveFormsModule,
    SharedModule,
    RouterModule,
    InscriptionModule,
    // CourseModule,
    StoreModule.forFeature(studentFeature),
    EffectsModule.forFeature([StudentEffects]),
  ],
  exports:[
    StudentComponent,
    StudentListComponent,
    StudentDetailComponent,
  ]
})
export class StudentModule { }
