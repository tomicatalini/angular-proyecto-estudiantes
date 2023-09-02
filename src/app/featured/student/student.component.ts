import { AfterViewInit, Component, OnInit, OnDestroy } from '@angular/core';
import { Observable, Subject, takeUntil, BehaviorSubject, take } from 'rxjs';
import { Student } from './model/student';
import { MatDialog } from '@angular/material/dialog';
import { StudentDialogFormComponent } from './pages/student-dialog-form/student-dialog-form.component';
import { Store } from '@ngrx/store';
import { StudentActions } from './store/student.actions';
import { selectStudents } from './store/student.selectors';
import { CustomNotifierService } from 'src/app/core/services/custom-notifier.service';
import { selectIsAdmin } from 'src/app/store/auth/auth.selectors';
import { StudentService } from './student.service';

@Component({
  selector: 'app-student',
  templateUrl: './student.component.html',
  styleUrls: []
})
export class StudentComponent implements OnInit, AfterViewInit, OnDestroy {
  destroyed = new Subject<boolean>();
  studentsCount$ = new BehaviorSubject<number>(0);
  dataSource$: Observable<Student[]>;
  
  isAdmin$: Observable<boolean>;

  constructor(
    public dialog: MatDialog,
    private store: Store,
    private studentService: StudentService,
    private notifier: CustomNotifierService
  ){
    this.dataSource$ = this.store.select(selectStudents);
    this.isAdmin$ = this.store.select(selectIsAdmin);
  }  

  ngOnInit(): void {
    this.store.dispatch(StudentActions.loadStudents());    
  }

  ngAfterViewInit(): void {
    this.studentService.getAll('students').pipe(take(1)).subscribe(students => this.studentsCount$.next(students.length));
  }

  edit(student: Student): void{
    this.dialog
      .open(StudentDialogFormComponent, {data: student})
      .afterClosed()
      .pipe(
        takeUntil(this.destroyed)
      )
      .subscribe( (edited: Student) => {
        if(edited){
          this.store.dispatch(StudentActions.updateStudent( {studentId: student.id, payload: edited} ));
        }
      });
  }

  delete(student: Student): void{
    this.notifier
      .warnPopup('Eliminar', '¿Desea continuar con la eliminación del estudiante?')
      .then( res => {
        if(res.isConfirmed){
          this.store.dispatch(StudentActions.deleteStudentById( {studentId: student.id} ));
          
          this.studentsCount$
            .pipe(take(1))
            .subscribe(studentsCount => this.studentsCount$.next(studentsCount - 1))
        } 
      });
  }

  createUserDialog(): void{
    this.dialog
      .open(StudentDialogFormComponent)
      .afterClosed()
      .pipe(
        takeUntil(this.destroyed)
      )
      .subscribe( (newStudent: Student) => {
        if(newStudent){
          this.store.dispatch(StudentActions.createStudent( {payload: newStudent} ));
          this.studentsCount$
            .pipe(take(1))
            .subscribe(studentsCount => this.studentsCount$.next(studentsCount + 1));    
        }
      });
  }

  ngOnDestroy(): void {
    this.destroyed.next(true);
  }
}
