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
  idControl = new FormControl(null);
  nameControl= new FormControl(null, [Validators.required, Validators.minLength(4)]);
  surnameControl= new FormControl(null, [Validators.required]);
  birthdateControl= new FormControl(null);
  emailControl= new FormControl(null, [Validators.required, Validators.email]);

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
