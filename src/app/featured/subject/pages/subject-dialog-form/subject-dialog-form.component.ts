import { Component, Inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Subject } from '../../model/models';

@Component({
  selector: 'app-subject-dialog-form',
  templateUrl: './subject-dialog-form.component.html',
  styleUrls: []
})
export class SubjectDialogFormComponent {
  idControl = new FormControl<number | null>(null);
  nameControl = new FormControl<string | null>(null, [Validators.required]);
  descriptionControl = new FormControl<string | null>(null, [Validators.required, Validators.maxLength(250)]);

  form = new FormGroup({
    id: this.idControl,
    name: this.nameControl,
    description: this.descriptionControl
  });

  showPassword: boolean = false;
  
  constructor(
    public dialogRef: MatDialogRef<SubjectDialogFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Subject,
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
