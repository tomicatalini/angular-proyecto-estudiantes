import { Component } from '@angular/core';
import { Observable, Subject, takeUntil } from 'rxjs';
import { User } from './models/models';
import { MatDialog } from '@angular/material/dialog';
import { UserService } from './user.service';
import { UserDialogFormComponent } from './pages/user-dialog-form/user-dialog-form.component';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent {
  dataSource$: Observable<User[]>;
  public destroyed = new Subject<boolean>();
  
  constructor(
    public dialog: MatDialog,
    private userService: UserService
  ){    
    this.dataSource$ = this.userService.getAll();
  }

  ngOnInit(): void {
    this.userService.load();
  }

  edit(user: User): void{
    this.dialog
      .open(UserDialogFormComponent, {data: user})
      .afterClosed()
      .pipe(
        takeUntil(this.destroyed)
      )
      .subscribe( (edited: User) => {
        console.log(edited);
        if(edited){
          this.userService.update(edited);
        }
      });
  }

  delete(user: User): void{
    this.userService.deleteById(user.id);
  }

  createUserDialog(): void{
    this.dialog
      .open(UserDialogFormComponent)
      .afterClosed()
      .pipe(
        takeUntil(this.destroyed)
      )
      .subscribe( (newUser: User) => {
        if(newUser){
          this.userService.create(newUser);    
        }
      });
  }

  ngOnDestroy(): void {
    this.destroyed.next(true);
  }

}
