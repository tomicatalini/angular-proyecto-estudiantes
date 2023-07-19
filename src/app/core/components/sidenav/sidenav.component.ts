import { Component, EventEmitter, Input, OnInit, Output  } from '@angular/core';
import { BreakpointObserver } from '@angular/cdk/layout';
import { Menu } from '../../models/menu';

const menues: Menu[] = [{
    icon: 'people',
    title: 'Estudiantes',
    disabled: false
  },{
    icon: 'class',
    title: 'Cursos',
    disabled: true
  }
]; 

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss']
})
export class SidenavComponent {
  
  @Input() sidenav = false;
  @Output() sidenavChange = new EventEmitter();

  small: boolean = false;

  menuSelected: Menu = menues[0];

  constructor( private breakpoints: BreakpointObserver){
    this.breakpoints
    .observe('(max-width: 750px)')
    .subscribe( data => {
      this.small = data.matches;
      this.sidenav = !this.sidenav;
      this.sidenavChange.emit(this.sidenav);
    });
  }

  changeMenu(menu: Menu): void{
    if(!menu.disabled){
      this.menuSelected = menu;
    }
  }
  
  getMenues(): Menu[] {
    return menues;
  }
}