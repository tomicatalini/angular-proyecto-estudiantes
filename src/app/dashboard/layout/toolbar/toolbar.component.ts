import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable, take } from 'rxjs';
import { AuthService } from 'src/app/featured/auth/auth.service';
import { User } from 'src/app/featured/user/models/models';
import { selectAuthUser } from 'src/app/store/auth/auth.selectors';
import Swal from 'sweetalert2';

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

  userNameInitials = '';
  user$: Observable< User | null>;

  constructor(
    private store: Store,
    private authService: AuthService,
    private router: Router
  ){    
    this.user$ = this.store.select(selectAuthUser);
  }

  sidenavToggle(){
    this.sidenav = !this.sidenav;
    this.sidenavChange.emit(this.sidenav);
  }

  logout() {
    Swal.fire({
      icon: 'warning',
      title: 'Cerrar Sesión',
      text: '¿Desea cerrar sesión?',
      showCancelButton: true,
      confirmButtonText: 'Cerrar',
      cancelButtonText: 'Cancelar'
    }).then(res => {
      if(res.isConfirmed){
       this.authService.logout();
       this.router.navigate(['/auth/login']);
      }
    });
  }
}
