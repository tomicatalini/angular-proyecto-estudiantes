import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StudentComponent } from './student.component';
import { StudentTableComponent } from './pages/student-table/student-table.component';
import { StudentDialogFormComponent } from './pages/student-dialog-form/student-dialog-form.component';
import { CompleteNamePipe } from './pipes/complete-name.pipe';
import { ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from 'src/app/shared/modules/material.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { StudentDetailComponent } from './pages/student-detail/student-detail.component';
import { RouterModule } from '@angular/router';
import { StudentRoutingModule } from './student-routing.module';
import { InscriptionModule } from '../inscription/inscription.module';
import { EffectsModule } from '@ngrx/effects';
import { StudentEffects } from './store/student.effects';
import { StoreModule } from '@ngrx/store';
import { studentFeature } from './store/student.reducer';



@NgModule({
  declarations: [
    StudentComponent,
    StudentTableComponent,
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
    StudentTableComponent,
    StudentDetailComponent,
  ]
})
export class StudentModule { }
