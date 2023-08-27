import { Component, OnInit } from '@angular/core';
import { Course } from '../../model/model';
import { Observable, take } from 'rxjs';
import { CourseService } from '../../course.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { selectCourse, selectEnrolledStudent } from '../../store/course.selectors';
import { CourseActions } from '../../store/course.actions';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Student } from 'src/app/featured/student/model/student';

@Component({
  selector: 'app-course-detail',
  templateUrl: './course-detail.component.html',
  styleUrls: ['./course-detail.component.scss']
})
export class CourseDetailComponent implements OnInit {

  course: Course | null = null;
  // course$: Observable<Course | null>;
  enrolledStudents$: Observable<Student[]>;
  
  idControl = new FormControl<number | null>({value: null, disabled: true});
  nameControl= new FormControl<string | null>({value: null, disabled: true}, [Validators.required]);
  startDateControl= new FormControl<Date | null>({value: null, disabled: true});
  endDateControl= new FormControl<Date | null>({value: null, disabled: true});

  courseForm = new FormGroup ({
    id: this.idControl,
    name: this.nameControl,
    startDate: this.startDateControl,
    endDate: this.endDateControl
  });

  panelOpenState: boolean = false;

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private store: Store
  ){
    this.store.select(selectCourse).subscribe( course => {
      if(course !== null){
        this.course = course;
        this.courseForm.patchValue(this.course);
      }
    });

    this.enrolledStudents$ = this.store.select(selectEnrolledStudent);
  }

  ngOnInit(): void {
    const courseId = Number(this.activatedRoute.snapshot.params['id']);
    
    if(Number.isNaN(courseId)){
      alert(`El id ${this.activatedRoute.snapshot.params['id']} es invalido!`);
      this.router.navigate(['dashboard','course']);
    }

    this.store.dispatch(CourseActions.loadCourseById({courseId}));
    this.store.dispatch(CourseActions.loadEnrolledStudents({courseId}));
  }

  editStudent(event: any) {
    console.log(event);
  }

  deleteStudent(event: any) {
    console.log(event);
  }
}
