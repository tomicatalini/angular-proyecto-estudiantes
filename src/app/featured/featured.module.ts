import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FeaturedRoutingModule } from './featured-routing.module';
import { CourseComponent } from './course/course.component';


@NgModule({
  declarations: [  
    CourseComponent
  ],
  imports: [
    CommonModule,
    FeaturedRoutingModule
  ]
})
export class FeaturedModule { }
