import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Subject, map, startWith, take, takeUntil } from 'rxjs';
import { Course } from 'src/app/featured/course/model/model';
import { CourseModalInscription } from '../../models/models';
import { CourseService } from 'src/app/featured/course/course.service';

@Component({
  selector: 'app-course-inscription-dialog-form',
  templateUrl: './course-inscription-dialog-form.component.html',
  styleUrls: ['./course-inscription-dialog-form.component.scss']
})
export class CourseInscriptionDialogFormComponent implements OnInit, OnDestroy{
  isDetroyed = new Subject<boolean>();

  control = new FormControl<any | null>(null);
  enrolledCourses$ = new Subject<Course[]>();

  constructor(
    private dialogRef: MatDialogRef<CourseInscriptionDialogFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: CourseModalInscription,
    private courseService: CourseService
  ) {
    this.courseService
      .getAll('courses')
      .pipe(
        take(1),
        map(courses => courses.filter(s => !this.data.enrolledCoursesIds?.includes(s.id)))
      )
      .subscribe(enrolledCourses => this.enrolledCourses$.next(enrolledCourses));
  }

  ngOnDestroy(): void {
    this.isDetroyed.next(true);
  }

  ngOnInit(): void {
    this.control.valueChanges.pipe(
      takeUntil(this.isDetroyed),
      startWith(''),
      map(value => {
        let obs$ = this.courseService.getAll('courses');

        if(value){
          let filter = {key: 'id', value};
          
          obs$ = this.courseService.getAll('courses', filter);
        }
        
        obs$.pipe(
          take(1),
          map(courses => {
            return courses.filter(s => !this.data.enrolledCoursesIds?.includes(s.id))
          })
        )
        .subscribe(enrolledCourses => this.enrolledCourses$.next(enrolledCourses));
      }),
    ).subscribe();
  }

  displayFn(seleccionado: Course): string {
    return seleccionado ? (seleccionado.id + ' | ' + seleccionado.name) : '';
  }

  close(){
    if(this.control.valid){
      this.dialogRef.close(this.control.value);
    }
  }

  cancel(){
    this.dialogRef.close();
  }
}
