import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { Store } from '@ngrx/store';
import { selectUserName, selectUserRole } from 'src/app/store/auth/auth.selectors';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: []
})
export class HomeComponent implements OnInit, OnDestroy {
  private destoyed = new Subject<boolean>();

  numberStudents: number = 0;
  userName$: Observable<string | null>;
  userRole$: Observable<string | null>;

  constructor(
    private store: Store
  ){
    this.userName$ = this.store.select(selectUserName);
    this.userRole$ = this.store.select(selectUserRole);
  }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    this.destoyed.next(true);
  }

}
