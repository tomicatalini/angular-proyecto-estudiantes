import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FeaturedRoutingModule } from './featured-routing.module';
import { CourseComponent } from './course/course.component';
import { CourseModule } from './course/course.module';
import { StudentModule } from './student/student.module';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    FeaturedRoutingModule,
    CourseModule,
    StudentModule
  ]
})
export class FeaturedModule { }
