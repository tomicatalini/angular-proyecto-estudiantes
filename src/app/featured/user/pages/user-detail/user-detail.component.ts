import { Component, OnInit, OnDestroy } from '@angular/core';
import { User } from '../../models/models';
import { Observable, BehaviorSubject, take, tap, takeUntil, Subject } from 'rxjs';
import { UserService } from '../../user.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: []
})
export class UserDetailComponent implements OnInit, OnDestroy {
  isDestroyed = new Subject<boolean>();

  user: User | null = null;
  user$ = new BehaviorSubject<User | null>(null);

  idControl = new FormControl<number | null>(null);
  nameControl = new FormControl<string | null>(null, [Validators.required]);
  surnameControl = new FormControl<string | null>(null, [Validators.required]);
  emailControl = new FormControl<string | null>(null, [Validators.required, Validators.email]);
  passwordControl = new FormControl<string | null>(null, [Validators.required, Validators.minLength(5)]);
  token = new FormControl<string | null>(null);
  role = new FormControl<string | null>(null, [Validators.required]);

  form = new FormGroup({
    id: this.idControl,
    name: this.nameControl,
    surname: this.surnameControl,
    email: this.emailControl,
    password: this.passwordControl,
    token: this.token,
    role: this.role
  });

  updateMode: boolean = false;
  showPassword: boolean = false;

  constructor(
    private userService: UserService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ){
    this.user$
      .pipe(
        takeUntil(this.isDestroyed)
      )
      .subscribe(student => this.form.patchValue(student!));
      
    this.form.disable();
  }

  ngOnDestroy(): void {
    this.isDestroyed.next(true);
  }

  ngOnInit(): void {
    const userId = Number(this.activatedRoute.snapshot.params['id']);
    
    if(Number.isNaN(userId)){
      alert(`El id ${this.activatedRoute.snapshot.params['id']} es invalido!`);
      this.router.navigate(['dashboard','user']);
    }
        
    this.userService.getById(userId)
      .pipe(
        take(1),
        tap(user => this.user = user)
      )
      .subscribe(user => this.user$.next(user!));
  }

  enableUpdate(){
    this.updateMode = true;
    this.form.enable();
  }

  update(){
    this.updateMode = false;

    if(this.form.valid){
      this.userService.update(this.user?.id!, this.form.getRawValue())
        .pipe(take(1))
        .subscribe({
          next: (newUser) => {
            this.user$.next(newUser);
          },
          complete: () => {
            this.updateMode = false
            this.form.disable();
          }
        });
    }
  }

  delete(){
    Swal.fire({
      icon: 'error',
      title: 'Eliminar Estudiante',
      text: `¿Desea eliminar el usuario ${this.user?.name} ?`,
      showCancelButton: true,
      confirmButtonText: 'Eliminar',
      cancelButtonText: 'Cancelar'
    }).then(res => {
      if(res.isConfirmed){
        this.userService.deleteById(this.user?.id!)
          .pipe(take(1))
          .subscribe({
            next: () => this.router.navigate(['dashboard', 'course']),
          })        
      }
    });
  }

  cancel(){
    this.form.patchValue(this.user!);
    this.updateMode = false;
    this.form.disable();
  }
}
