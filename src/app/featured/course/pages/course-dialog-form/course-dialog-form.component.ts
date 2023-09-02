import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Course } from '../../model/model';

@Component({
  selector: 'app-course-dialog-form',
  templateUrl: './course-dialog-form.component.html',
  styleUrls: []
})
export class CourseDialogFormComponent implements OnInit {

  idControl = new FormControl<number | null>(null);
  nameControl = new FormControl<string | null>(null, [Validators.required]);
  startDateControl = new FormControl<Date | null>(null, [Validators.required]);
  endDateControl = new FormControl<Date | null>(null, [Validators.required]);
  professorControl = new FormControl<string | null>(null);

  form = new FormGroup({
    id: this.idControl,
    name: this.nameControl,
    startDate: this.startDateControl,
    endDate: this.endDateControl,
    professor: this.professorControl
  });

  constructor(
    public dialogRef: MatDialogRef<CourseDialogFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Course,
  ) {
    if(data){
      this.form.patchValue(data);
    }
  }
  ngOnInit(): void {
    this.dialogRef.updateSize('40%');
  }

  close(){
    if(this.form.valid){
      this.dialogRef.close(this.form.value);
    }
  }
}
