import { Directive, ElementRef } from '@angular/core';

@Directive({
  selector: '[title]'
})
export class TitleDirective {

  private headers: string[] = ['H1','H2','H3','H4','H5','H6','SPAN'];
  
  constructor(
    private elementRef: ElementRef
  ) {
    if(this.headers.includes(this.elementRef.nativeElement.tagName)){
      this.elementRef.nativeElement.style.fontSize = '28px';
    } 
  }

}
