import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/featured/auth/auth.service';
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

  constructor(
    private router: Router,
    private authService: AuthService
  ){}

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
      }
    });
  }
}
