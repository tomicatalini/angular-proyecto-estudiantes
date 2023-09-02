import { Component, OnInit, AfterViewInit, OnDestroy } from '@angular/core';
import { Observable, Subject, take, takeUntil } from 'rxjs';
import { Course } from './model/model';
import { MatDialog } from '@angular/material/dialog';
import { BehaviorSubject } from 'rxjs';
import { CourseDialogFormComponent } from './pages/course-dialog-form/course-dialog-form.component';
import { Store } from '@ngrx/store';
import { selectCourses } from './store/course.selectors';
import { CourseActions } from './store/course.actions';
import { selectIsAdmin } from 'src/app/store/auth/auth.selectors';
import { CourseService } from './course.service';
import { CustomNotifierService } from 'src/app/core/services/custom-notifier.service';

@Component({
  selector: 'app-course',
  templateUrl: './course.component.html',
  styleUrls: []
})
export class CourseComponent implements OnInit, AfterViewInit, OnDestroy {
  destroyed = new Subject<boolean>();
  coursesCount$ = new BehaviorSubject<number>(0);
  dataSource$: Observable<Course[]>;

  isAdmin$: Observable<boolean>;

  constructor(
    private dialog: MatDialog,
    private courseService: CourseService,
    private store: Store,
    private notifier: CustomNotifierService
  ){
    this.dataSource$ = this.store.select(selectCourses);
    this.isAdmin$ = this.store.select(selectIsAdmin);
  }

  ngOnInit(): void {
    this.store.dispatch(CourseActions.loadCourses());
  }

  ngAfterViewInit(): void {
    this.courseService.getAll('courses')
      .pipe(takeUntil(this.destroyed))
      .subscribe(courses => this.coursesCount$.next(courses.length));
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
          this.store.dispatch(CourseActions.updateCourse({ courseId: course.id!, payload: edited}));
        }
      });
  }

  delete(course: Course): void{
    this.notifier
      .warnPopup('Eliminar', '¿Desea continuar con la eliminación del curso?')
      .then( res => {
        if(res.isConfirmed){
          this.store.dispatch(CourseActions.deleteCourse({ payload: course}));
          this.coursesCount$
            .pipe(take(1))
            .subscribe(coursesCount => this.coursesCount$.next(coursesCount - 1)); 
          
        }
      });
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
          this.coursesCount$
            .pipe(take(1))
            .subscribe(coursesCount => this.coursesCount$.next(coursesCount + 1));  
        }
      });
  }

  ngOnDestroy(): void {
    this.destroyed.next(true);
  }
}
