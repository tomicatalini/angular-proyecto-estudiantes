import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Inscription } from '../../models/models';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { StudentService } from 'src/app/featured/student/student.service';
import { CourseService } from 'src/app/featured/course/course.service';
import { Student } from 'src/app/featured/student/model/student';
import { Course } from 'src/app/featured/course/model/model';
import { take, Observable } from 'rxjs';

@Component({
  selector: 'app-inscription-dialog-form',
  templateUrl: './inscription-dialog-form.component.html',
  styleUrls: ['./inscription-dialog-form.component.scss']
})
export class InscriptionDialogFormComponent implements OnInit {
  idControl = new FormControl<number | string | null>(null);
  studentControl = new FormControl<number | string | null>(null, [Validators.required]);
  courseControl = new FormControl<Course | number | string | null>(null, [Validators.required]);

  form = new FormGroup({
    id: this.idControl,
    studentId: this.studentControl,
    courseId: this.courseControl
  });

  student = new Observable<Student | undefined>;
  // courses: Course[] = [];
  courses$ = new Observable<Course[]>;
  
  constructor(
    public dialogRef: MatDialogRef<InscriptionDialogFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Inscription,
    private studentService: StudentService,
    private courseService: CourseService
  ) {
    if(data){
      this.form.patchValue(data);
    }
    this.student = this.studentService.getStudentById(data.studentId);

    this.courses$ = this.courseService.getSubscription();
    this.courseService.getAll();
  }

  ngOnInit(): void {
    // this.courses = this.courseService.getAll();
  }

  displayFn(seleccionado: Course): string {
    return seleccionado ? seleccionado.name : '';
  }

  close(){
    if(this.form.valid){
      this.dialogRef.close(this.courseControl.value);
    }
  }
}
