import { BreakpointObserver } from '@angular/cdk/layout';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Menu } from 'src/app/core/models/menu';

const menues: Menu[] = [{
    icon: 'home',
    title: 'Inicio',
    route: 'home',
    disabled: false
  },{
  icon: 'people',
  title: 'Estudiantes',
  route: 'student',
  disabled: false
  },{
    icon: 'class',
    title: 'Cursos',
    route: 'course',
    disabled: false
}]; 

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
