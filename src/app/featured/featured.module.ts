import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FeaturedRoutingModule } from './featured-routing.module';
import { CourseModule } from './course/course.module';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    FeaturedRoutingModule,
    CourseModule
  ]
})
export class FeaturedModule { }
