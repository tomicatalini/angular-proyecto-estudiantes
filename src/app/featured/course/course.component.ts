import { Component } from '@angular/core';
import { Observable, Subject, takeUntil } from 'rxjs';
import { Course } from './model/model';
import { MatDialog } from '@angular/material/dialog';
import { CourseDialogFormComponent } from './pages/course-dialog-form/course-dialog-form.component';
import { Store } from '@ngrx/store';
import { selectCourses } from './store/course.selectors';
import { CourseActions } from './store/course.actions';

@Component({
  selector: 'app-course',
  templateUrl: './course.component.html',
  styleUrls: []
})
export class CourseComponent {
  public destroyed = new Subject<boolean>();
  dataSource$: Observable<Course[]>;

  constructor(
    public dialog: MatDialog,
    private store: Store
  ){
    this.dataSource$ = this.store.select(selectCourses);
  }

  ngOnInit(): void {
    this.store.dispatch(CourseActions.loadCourses());
  }

  edit(course: Course): void{
    this.dialog
      .open(CourseDialogFormComponent, {data: course})
      .afterClosed()
      .pipe(
        takeUntil(this.destroyed)
      )
      .subscribe( (edited: Course) => {
        if(edited){
          this.store.dispatch(CourseActions.updateCourse({ courseId:course.id, payload: edited}));
        }
      });
  }

  delete(course: Course): void{
    this.store.dispatch(CourseActions.deleteCourseById({ courseId:course.id}));
  }

  createCourseDialog(): void{
    this.dialog
      .open(CourseDialogFormComponent)
      .afterClosed()
      .pipe(
        takeUntil(this.destroyed)
      )
      .subscribe( (newCourse: Course) => {
        if(newCourse){
          this.store.dispatch(CourseActions.createCourse({ payload: newCourse}));   
        }
      });
  }

  ngOnDestroy(): void {
    this.destroyed.next(true);
  }
}
