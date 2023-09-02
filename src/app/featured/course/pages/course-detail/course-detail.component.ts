import { Component, OnInit } from '@angular/core';
import { Course } from '../../model/model';
import { Observable, take, tap } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { selectCourse, selectEnrolledStudent } from '../../store/course.selectors';
import { CourseActions } from '../../store/course.actions';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Student } from 'src/app/featured/student/model/student';
import { Inscription, StudentModalInscription } from 'src/app/featured/inscription/models/models';
import { MatDialog } from '@angular/material/dialog';
import { StudentInscriptionDialogFormComponent } from 'src/app/featured/inscription/pages/student-inscription-dialog-form/student-inscription-dialog-form.component';
import Swal from 'sweetalert2';
import { selectIsAdmin } from 'src/app/store/auth/auth.selectors';

@Component({
  selector: 'app-course-detail',
  templateUrl: './course-detail.component.html',
  styleUrls: []
})
export class CourseDetailComponent implements OnInit {

  course: Course | null = null;

  enrolledStudents: Student[] = [];
  enrolledStudents$: Observable<Inscription[]>;
  
  idControl = new FormControl<number | null>({value: null, disabled: true});
  nameControl= new FormControl<string | null>({value: null, disabled: true}, [Validators.required]);
  startDateControl= new FormControl<Date | null>({value: null, disabled: true});
  endDateControl= new FormControl<Date | null>({value: null, disabled: true});
  professorControl = new FormControl<string | null>({value: null, disabled: true});

  courseForm = new FormGroup ({
    id: this.idControl,
    name: this.nameControl,
    startDate: this.startDateControl,
    endDate: this.endDateControl,
    professor: this.professorControl
  });

  panelOpenState: boolean = false;
  updateMode: boolean = false;
  isAdmin$: Observable<boolean>;

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
          this.enrolledStudents = inscriptions.map(i => i.student!);
        }
      })
    );

    this.isAdmin$ = this.store.select(selectIsAdmin);
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
      this.store.dispatch(CourseActions.deleteStudentInscription({ payload: inscription }));
    }
  }

  enrollStudent(){
    const data: StudentModalInscription = {
      courseId: this.course?.id!,
      enrolledStudentsIds: this.enrolledStudents.map(s => s.id)
    }

    this.dialog
      .open(StudentInscriptionDialogFormComponent, {data})
      .afterClosed()
      .pipe(take(1))
      .subscribe((student: Student) => {
        if(student){
          const inscription: Inscription = {
            id: null,
            courseId: this.course?.id!,
            studentId: student.id,
            date: new Date()
          }
          this.store.dispatch(CourseActions.createStudentInscription({payload: inscription}));
        }
      });
  }

  enableUpdate(){
    this.updateMode = true;
    this.courseForm.enable();
  }

  update(){
    this.updateMode = false;
    if(this.courseForm.valid){
      this.store.dispatch(CourseActions.updateCourse({ courseId: this.course?.id!, payload: this.courseForm.getRawValue() }));
      this.updateMode = false;
      this.courseForm.disable();
    }
  }

  delete(){
    Swal.fire({
      icon: 'error',
      title: 'Eliminar Estudiante',
      text: `¿Desea eliminar el curso ${this.course?.name} ?`,
      showCancelButton: true,
      confirmButtonText: 'Eliminar',
      cancelButtonText: 'Cancelar'
    }).then(res => {
      if(res.isConfirmed){
        this.store.dispatch(CourseActions.deleteCourse({ payload: this.course! }));
        this.router.navigate(['dashboard', 'course']);
      }
    });
  }

  cancel(){
    this.courseForm.patchValue(this.course!);
    this.updateMode = false;
    this.courseForm.disable();
  }
}
