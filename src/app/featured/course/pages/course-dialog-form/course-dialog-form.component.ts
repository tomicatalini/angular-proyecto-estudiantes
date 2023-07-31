import { Component, Inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Course } from '../../model/model';

@Component({
  selector: 'app-course-dialog-form',
  templateUrl: './course-dialog-form.component.html',
  styleUrls: ['./course-dialog-form.component.scss']
})
export class CourseDialogFormComponent {

  idControl = new FormControl<number | null>(null);
  nameControl = new FormControl<string | null>(null, [Validators.required]);
  startDateControl = new FormControl<Date | null>(null, [Validators.required]);
  endDateControl = new FormControl<Date | null>(null, [Validators.required]);

  form = new FormGroup({
    id: this.idControl,
    name: this.nameControl,
    startDate: this.startDateControl,
    endDate: this.endDateControl
  });

  constructor(
    public dialogRef: MatDialogRef<CourseDialogFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Course,
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
