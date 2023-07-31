import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidenavComponent } from './layout/sidenav/sidenav.component';
import { ToolbarComponent } from './layout/toolbar/toolbar.component';
import { DashboardComponent } from './dashboard.component';
import { MaterialModule } from '../shared/modules/material.module';
import { StudentModule } from '../featured/student/student.module';
import { RouterModule } from '@angular/router';
import { CourseModule } from '../featured/course/course.module';
import { UserModule } from '../featured/user/user.module';
import { SubjectModule } from '../featured/subject/subject.module';
import { HomeModule } from '../featured/home/home.module';



@NgModule({
  declarations: [
    SidenavComponent,
    ToolbarComponent,
    DashboardComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    MaterialModule,
    StudentModule,
    CourseModule,
    UserModule,
    SubjectModule,
    HomeModule
  ],
  exports:[
    DashboardComponent
  ]
})
export class DashboardModule { }
