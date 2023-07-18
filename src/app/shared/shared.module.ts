import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TitleDirective } from './directives/title.directive';



@NgModule({
  declarations: [
    TitleDirective
  ],
  imports: [
    CommonModule
  ], 
  exports: [
    TitleDirective
  ]
})
export class SharedModule { }
