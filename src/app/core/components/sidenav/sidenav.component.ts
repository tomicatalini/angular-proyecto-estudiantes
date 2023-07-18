import { AfterViewInit, Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild  } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { MatSidenav } from '@angular/material/sidenav';
import { Menu } from '../../models/menu';

const menues: Menu[] = [{
    icon: 'people',
    title: 'Estudiantes'
  },{
    icon: 'class',
    title: 'Cursos'
  }
]; 

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss']
})
export class SidenavComponent implements OnInit {
  
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

  ngOnInit(): void {
    
  }

  changeMenu(menu: Menu): void{
    this.menuSelected = menu;
  }
  
  getMenues(): Menu[] {
    return menues;
  }
}