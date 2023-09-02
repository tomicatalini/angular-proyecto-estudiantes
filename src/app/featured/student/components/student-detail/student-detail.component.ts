import { Component, OnInit } from '@angular/core';
import { StudentService } from '../../student.service';
import { Student } from '../../model/student';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Course } from 'src/app/featured/course/model/model';
import { CourseModalInscription, Inscription } from 'src/app/featured/inscription/models/models';
import { Observable, take, tap } from 'rxjs';
import Swal from 'sweetalert2';
import { Store } from '@ngrx/store';
import { StudentActions } from '../../store/student.actions';
import { selectStudent, selectStudentCoursesInscriptions } from '../../store/student.selectors';
import { CourseInscriptionDialogFormComponent } from 'src/app/featured/inscription/pages/course-inscription-dialog-form/course-inscription-dialog-form.component';

@Component({
  selector: 'app-student-detail',
  templateUrl: './student-detail.component.html',
  styleUrls: []
})
export class StudentDetailComponent implements OnInit{

  idControl = new FormControl({value: null, disabled: true});
  nameControl= new FormControl({value: null, disabled: true}, [Validators.required, Validators.minLength(4)]);
  surnameControl= new FormControl({value: null, disabled: true}, [Validators.required]);
  birthdateControl= new FormControl({value: null, disabled: true});
  emailControl= new FormControl({value: null, disabled: true}, [Validators.required, Validators.email]);

  studentForm: FormGroup = new FormGroup({
    id: this.idControl,
    name: this.nameControl,
    surname: this.surnameControl,
    birthdate: this.birthdateControl,
    email: this.emailControl
  }); 

  student: Student | null = null;
  studentInscriptions$: Observable<Inscription[]>;
  
  courses: Course[] = [];

  updateMode: boolean = false;

  constructor(
    private studentService: StudentService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private store: Store,
    public dialog: MatDialog,    
  ){
    this.studentInscriptions$ = this.store.select(selectStudentCoursesInscriptions).pipe(
      tap(inscriptions => {
        if(inscriptions){
          this.courses = inscriptions.map(i => i.course!);
        }
      })
    );
    
    this.store.select(selectStudent)
      .subscribe(student => {
        this.student = student;
        if(student){
          this.studentForm.patchValue(student);
        }
      });
  }

  ngOnInit(): void {
    const studentId = Number(this.activatedRoute.snapshot.params['id']);
    
    if(Number.isNaN(studentId)){
      alert(`El id ${this.activatedRoute.snapshot.params['id']} es invalido!`);
      this.router.navigate(['dashboard','student']);
    }

    this.store.dispatch(StudentActions.loadStudentById({payload: studentId}));
    this.store.dispatch(StudentActions.loadStudentCoursesInscriptions({payload: studentId}));
  }

  assignCourse(){
    const data: CourseModalInscription = {
      studenId: this.student?.id!,
      enrolledCoursesIds: this.courses.map(c => c.id),
    }

    this.dialog
      .open(CourseInscriptionDialogFormComponent, {data})
      .afterClosed()
      .pipe(take(1))
      .subscribe( (course: Course) => {
        if(course){
          let inscription: Inscription = {
            id: null,
            studentId: this.student?.id!,
            courseId: course.id
          }

          this.store.dispatch(StudentActions.createCourseInscription({payload: inscription}));
        }
      });
  }

  enableUpdate(){
    this.updateMode = true;
    this.studentForm.enable();
  }

  update(){
    this.updateMode = false;
    this.studentService
      .updateById('students',Number(this.student?.id), this.studentForm.getRawValue())
      .subscribe({
        next: (isUpdated) => {
          if(isUpdated){
            this.student = this.studentForm.getRawValue() as Student;
          } else {
            this.studentForm.patchValue(this.student!);
          }
        },
        complete: () => this.studentForm.disable()
      });
  }

  delete(){
    Swal.fire({
      icon: 'error',
      title: 'Eliminar Estudiante',
      text: `¿Desea eliminar el estudiante ${this.student?.name} ${this.student?.surname}?`,
      showCancelButton: true,
      confirmButtonText: 'Eliminar',
      cancelButtonText: 'Cancelar'
    }).then(res => {
      if(res.isConfirmed){
        this.studentService.deleteById('students', Number(this.student?.id));
        this.router.navigate(['dashboard', 'student']);
      }
    });
  }
  
  inscriptionTableDelete(inscription: Inscription): void{    
    if(inscription){
      this.store.dispatch(StudentActions.deleteCourseInscriptionById({ payload: inscription.id! }));
    }
  }
}
