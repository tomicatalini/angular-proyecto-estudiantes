import { Component, Inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Student } from '../../model/student';

@Component({
  selector: 'app-student-dialog-form',
  templateUrl: './student-dialog-form.component.html',
  styleUrls: ['./student-dialog-form.component.scss']
})
export class StudentDialogFormComponent {
  idControl = new FormControl<number | null>(null);
  nameControl= new FormControl<string | null>(null, [Validators.required, Validators.minLength(4)]);
  surnameControl= new FormControl<string | null>(null, [Validators.required]);
  birthdateControl = new FormControl<Date | undefined | null>(null);
  emailControl= new FormControl<string | null>(null, [Validators.required, Validators.email]);

  studentForm: FormGroup = new FormGroup({
    id: this.idControl,
    name: this.nameControl,
    surname: this.surnameControl,
    birthdate: this.birthdateControl,
    email: this.emailControl
  }); 

  constructor(
    public dialogRef: MatDialogRef<StudentDialogFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Student,
  ){
    this.studentForm.patchValue(data);
  }

  close(){
    if(this.studentForm.valid){
      this.dialogRef.close({...this.studentForm.value, registerDate: new Date()});
    }
  }
}
