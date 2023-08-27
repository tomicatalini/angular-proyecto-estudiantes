import { Component, Inject, OnDestroy } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Course } from 'src/app/featured/course/model/model';
import { Observable, Subject, map, takeUntil } from 'rxjs';
import { InscriptionService } from '../../inscription.service';
import { CourseService } from 'src/app/featured/course/course.service';

@Component({
  selector: 'app-inscription-dialog-form',
  templateUrl: './inscription-dialog-form.component.html',
  styleUrls: ['./inscription-dialog-form.component.scss']
})
export class InscriptionDialogFormComponent implements OnDestroy {

  isDetroyed = new Subject<boolean>();

  idControl = new FormControl<number | string | null>(null);
  studentControl = new FormControl<number | string | null>(null, [Validators.required]);
  courseControl = new FormControl<number | string | null>(null, [Validators.required]);

  form = new FormGroup({
    id: this.idControl,
    studentId: this.studentControl,
    courseId: this.courseControl
  });

  courses$ = new Observable<Course[]>;
  
  constructor(
    public dialogRef: MatDialogRef<InscriptionDialogFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public inscriptionService: InscriptionService,
    public courseService: CourseService
  ) {

    if(data){
      this.form.patchValue(data.inscription);
    }

    // this.courses$ = this.courseService
    //   .getSubscription()
    //   .pipe(
    //     takeUntil(this.isDetroyed),
    //     map( courses => courses.filter(course => !data.courses.includes(course.id)))
    //   );

    // this.courseService.getAll();
  }

  displayFn(seleccionado: Course): string {
    return seleccionado ? seleccionado.name : '';
  }

  close(){
    if(this.form.valid){
      this.dialogRef.close(this.courseControl.value);
    }
  }

  ngOnDestroy(): void {
      this.isDetroyed.next(true);
  }
}
