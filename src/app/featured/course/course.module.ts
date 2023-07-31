import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CourseRoutingModule } from './course-routing.module';
import { MaterialModule } from 'src/app/shared/modules/material.module';
import { CourseTableComponent } from './pages/course-table/course-table.component';
import { CourseDetailComponent } from './pages/course-detail/course-detail.component';
import { CourseDialogFormComponent } from './pages/course-dialog-form/course-dialog-form.component';
import { RouterModule } from '@angular/router';
import { CourseComponent } from './course.component';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [
    CourseComponent,
    CourseTableComponent,
    CourseDetailComponent,
    CourseDialogFormComponent
  ],
  imports: [
    CommonModule,
    CourseRoutingModule,
    RouterModule,
    MaterialModule,
    ReactiveFormsModule,
    SharedModule
  ],
  exports:[
    CourseTableComponent,
    CourseDialogFormComponent,
    CourseDetailComponent
  ]
})
export class CourseModule { }
