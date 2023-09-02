import { BreakpointObserver } from '@angular/cdk/layout';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, tap } from 'rxjs';
import { selectIsAdmin } from 'src/app/store/auth/auth.selectors';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss']
})
export class SidenavComponent {
  @Input() sidenav = false;
  @Output() sidenavChange = new EventEmitter();

  small: boolean = false;
  menuSelected: string = 'home';

  isAdmin$: Observable<boolean>;

  constructor( 
    private breakpoints: BreakpointObserver,
    private store: Store
  ){
    this.breakpoints
    .observe('(max-width: 750px)')
    .subscribe( data => {
      this.small = data.matches;
      this.sidenav = !this.sidenav;
      this.sidenavChange.emit(this.sidenav);
    });

    this.isAdmin$ = this.store.select(selectIsAdmin);
  }
}
