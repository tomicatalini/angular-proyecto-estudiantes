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
import { HomeModule } from '../featured/home/home.module';
import { DashboarRoutingModule } from './dashboard-routing.module';



@NgModule({
  declarations: [
    SidenavComponent,
    ToolbarComponent,
    DashboardComponent
  ],
  imports: [
    CommonModule,
    DashboarRoutingModule,
    RouterModule,
    MaterialModule,
    StudentModule,
    CourseModule,
    UserModule,
    HomeModule
  ],
  exports:[
    DashboardComponent
  ]
})
export class DashboardModule { }
