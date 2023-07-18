import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent {
  
  @Input()
  sidenav: boolean = false;

  @Output()
  sidenavChange = new  EventEmitter<boolean>();

  constructor(){}

  sidenavToggle(){
    this.sidenav = !this.sidenav;
    this.sidenavChange.emit(this.sidenav);
  }
}
