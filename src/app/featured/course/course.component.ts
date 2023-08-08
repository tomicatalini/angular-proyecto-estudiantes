import { Component } from '@angular/core';
import { Observable, Subject, map, takeUntil } from 'rxjs';
import { Course } from './model/model';
import { MatDialog } from '@angular/material/dialog';
import { CourseService } from './course.service';
import { CourseDialogFormComponent } from './pages/course-dialog-form/course-dialog-form.component';

@Component({
  selector: 'app-course',
  templateUrl: './course.component.html',
  styleUrls: ['./course.component.scss']
})
export class CourseComponent {
  dataSource$: Observable<Course[]>;
  public destroyed = new Subject<boolean>();
  
  constructor(
    public dialog: MatDialog,
    private courseService: CourseService
  ){    
    this.dataSource$ = this.courseService.getSubscription();
  }

  ngOnInit(): void {
    this.courseService.getAll();
  }

  edit(course: Course): void{
    this.dialog
      .open(CourseDialogFormComponent, {data: course})
      .afterClosed()
      .pipe(
        takeUntil(this.destroyed)
      )
      .subscribe( (edited: Course) => {
        console.log(edited);
        if(edited){
          this.courseService.update(course.id, edited);
        }
      });
  }

  delete(course: Course): void{
    this.courseService.deleteById(course.id);
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
          this.courseService.create(newCourse);    
        }
      });
  }

  ngOnDestroy(): void {
    this.destroyed.next(true);
  }
}
