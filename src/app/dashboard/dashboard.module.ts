import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidenavComponent } from './layout/sidenav/sidenav.component';
import { ToolbarComponent } from './layout/toolbar/toolbar.component';
import { DashboardComponent } from './dashboard.component';
import { MaterialModule } from '../shared/modules/material.module';
import { StudentModule } from '../featured/student/student.module';



@NgModule({
  declarations: [
    SidenavComponent,
    ToolbarComponent,
    DashboardComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    StudentModule
  ],
  exports:[
    DashboardComponent
  ]
})
export class DashboardModule { }
