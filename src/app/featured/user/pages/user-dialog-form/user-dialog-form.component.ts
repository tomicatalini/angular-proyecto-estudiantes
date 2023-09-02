import { Component, Inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { User } from '../../models/models';

@Component({
  selector: 'app-user-dialog-form',
  templateUrl: './user-dialog-form.component.html',
  styleUrls: ['./user-dialog-form.component.scss']
})
export class UserDialogFormComponent {
  idControl = new FormControl<number | null>(null);
  nameControl = new FormControl<string | null>(null, [Validators.required]);
  surnameControl = new FormControl<string | null>(null, [Validators.required]);
  emailControl = new FormControl<string | null>(null, [Validators.required, Validators.email]);
  passwordControl = new FormControl<string | null>(null, [Validators.required, Validators.minLength(5)]);
  token = new FormControl<string | null>(null);
  role = new FormControl<string | null>('professor');

  form = new FormGroup({
    id: this.idControl,
    name: this.nameControl,
    surname: this.surnameControl,
    email: this.emailControl,
    password: this.passwordControl,
    token: this.token,
    role: this.role
  });

  showPassword: boolean = false;
  
  constructor(
    public dialogRef: MatDialogRef<UserDialogFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: User,
  ) {
    if(data){
      this.form.patchValue(data);
    }
  }

  close(){
    if(this.form.valid){
      this.dialogRef.close(this.form.value);
    }
  }
}
