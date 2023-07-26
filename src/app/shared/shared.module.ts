import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TitleDirective } from './directives/title.directive';
import { FormControlErrorPipe } from './pipes/form-control-error.pipe';



@NgModule({
  declarations: [
    TitleDirective,
    FormControlErrorPipe
  ],
  imports: [
    CommonModule
  ], 
  exports: [
    TitleDirective,
    FormControlErrorPipe
  ]
})
export class SharedModule { }
