import { Component } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {
  sidenav: boolean = true;

  sidenavChange(value: boolean){
    this.sidenav = value;
  }
}
