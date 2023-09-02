import { Component } from '@angular/core';
import { Observable, Subject, takeUntil, take } from 'rxjs';
import { User } from './models/models';
import { MatDialog } from '@angular/material/dialog';
import { UserService } from './user.service';
import { UserDialogFormComponent } from './pages/user-dialog-form/user-dialog-form.component';
import Swal from 'sweetalert2';
import { CustomNotifierService } from 'src/app/core/services/custom-notifier.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: []
})
export class UserComponent {
  dataSource$: Observable<User[]>;
  public destroyed = new Subject<boolean>();
  
  constructor(
    public dialog: MatDialog,
    private userService: UserService,
    private notifier: CustomNotifierService
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
        if(edited){
          this.userService
            .update(user.id!, edited)
            .pipe(take(1))
            .subscribe(() => this.userService.load());
        }
      });
  }

  delete(user: User): void{
    
    this.notifier
      .warnPopup('Eliminar', '¿Desea continuar con la eliminación del usuario?')
      .then( res => {
        if(res.isConfirmed){
          this.userService.deleteById(user.id!)
            .pipe(take(1))
            .subscribe(() => this.userService.load());
        } 
      });
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
