import { Component, OnInit } from '@angular/core';
import { StudentService } from '../../student.service';
import { Student } from '../../model/student';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { InscriptionDialogFormComponent } from 'src/app/featured/inscription/pages/inscription-dialog-form/inscription-dialog-form.component';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { InscriptionService } from '../../../inscription/inscription.service';
import { Course } from 'src/app/featured/course/model/model';
import { Inscription, InscriptionModalData } from 'src/app/featured/inscription/models/models';
import { Observable, finalize, pipe, take, tap } from 'rxjs';
import Swal from 'sweetalert2';
import { Store } from '@ngrx/store';
import { InscriptionActions } from 'src/app/featured/inscription/store/inscription.actions';
import { selectInscriptionLoading, selectInscriptions } from 'src/app/featured/inscription/store/inscription.selectors';
import { StudentActions } from '../../store/student.actions';
import { selectStudent, selectStudentCourses } from '../../store/student.selectors';

@Component({
  selector: 'app-student-detail',
  templateUrl: './student-detail.component.html',
  styleUrls: ['./student-detail.component.scss']
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
  studenInscription$ = new Observable<Inscription[]>;
  
  courses: Course[] = [];

  updateMode: boolean = false;

  constructor(
    private studentService: StudentService,
    private inscriptionService: InscriptionService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private store: Store,
    public dialog: MatDialog,    
  ){
    this.studenInscription$ = this.store.select(selectInscriptions).pipe(
      tap(inscriptions => {
        if(inscriptions){
          this.courses = inscriptions.map(insc => insc.course!);
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
    this.store.dispatch(InscriptionActions.loadInscriptionsByStudentId({payload: studentId}));
  }

  assignCourse(){
    const data: InscriptionModalData = {
      id: this.student?.id!,
      students: null,
      courses: this.courses,
      entity: 'student'
    }

    this.dialog
      .open(InscriptionDialogFormComponent, {data})
      .afterClosed()
      .pipe(take(1))
      .subscribe( (courseId: number) => {
        if(courseId){
          let inscription: Inscription = {
            id: null,
            studentId: this.student?.id!,
            courseId: courseId
          }

          this.inscriptionService.create('inscriptions', inscription);
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
      this.inscriptionService.deleteById('inscriptions', inscription.id!);
    }
  }
}
