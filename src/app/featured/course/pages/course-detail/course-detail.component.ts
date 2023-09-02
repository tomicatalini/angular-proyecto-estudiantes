import { Component, OnInit } from '@angular/core';
import { Course } from '../../model/model';
import { Observable, take, tap } from 'rxjs';
import { CourseService } from '../../course.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { selectCourse, selectEnrolledStudent } from '../../store/course.selectors';
import { CourseActions } from '../../store/course.actions';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Student } from 'src/app/featured/student/model/student';
import { Inscription, InscriptionModalData } from 'src/app/featured/inscription/models/models';
import { InscriptionActions } from 'src/app/featured/inscription/store/inscription.actions';
import { MatDialog } from '@angular/material/dialog';
import { InscriptionDialogFormComponent } from 'src/app/featured/inscription/pages/inscription-dialog-form/inscription-dialog-form.component';

@Component({
  selector: 'app-course-detail',
  templateUrl: './course-detail.component.html',
  styleUrls: ['./course-detail.component.scss']
})
export class CourseDetailComponent implements OnInit {

  course: Course | null = null;

  enrolledStudents: Student[] = [];
  enrolledStudents$: Observable<Inscription[]>;
  
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
    private store: Store,
    private dialog: MatDialog
  ){
    this.store.select(selectCourse).subscribe( course => {
      if(course !== null){
        this.course = course;
        this.courseForm.patchValue(this.course);
      }
    });

    this.enrolledStudents$ = this.store.select(selectEnrolledStudent).pipe(
      tap(inscriptions => {
        if(inscriptions){
          this.enrolledStudents = inscriptions.map(insc => insc.student!);
        }
      })
    );
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

  inscriptionTableDelete(inscription: Inscription): void{    
    if(inscription){
      this.store.dispatch(InscriptionActions.deleteInscriptionById({ payload: inscription.id! }));
    }
  }

  enrollStudent(){
    const data: InscriptionModalData = {
      id: this.course?.id!,
      students: this.enrolledStudents,
      courses: null,
      entity: 'course'
    }

    this.dialog
      .open(InscriptionDialogFormComponent, {data})
      .afterClosed()
      .subscribe((studentId: number) => {
        if(studentId){
          const inscription: Inscription = {
            id: null,
            courseId: this.course?.id!,
            studentId: studentId
          }
          this.store.dispatch(InscriptionActions.createInscription({payload: inscription}));
        }
      });
  }
}
