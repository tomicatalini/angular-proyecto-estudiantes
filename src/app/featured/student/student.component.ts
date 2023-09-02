import { Component } from '@angular/core';
import { Observable, Subject, takeUntil } from 'rxjs';
import { Student } from './model/student';
import { MatDialog } from '@angular/material/dialog';
import { StudentDialogFormComponent } from './components/student-dialog-form/student-dialog-form.component';
import { Store } from '@ngrx/store';
import { StudentActions } from './store/student.actions';
import { selectStudents } from './store/student.selectors';
import { CustomNotifierService } from 'src/app/core/services/custom-notifier.service';

@Component({
  selector: 'app-student',
  templateUrl: './student.component.html',
  styleUrls: []
})
export class StudentComponent {
  dataSource$: Observable<Student[]>;
  public destroyed = new Subject<boolean>();
  
  constructor(
    public dialog: MatDialog,
    private store: Store,
    private notifier: CustomNotifierService
  ){
    this.dataSource$ = this.store.select(selectStudents);
  }

  ngOnInit(): void {
    this.store.dispatch(StudentActions.loadStudents());
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
        if(res.isConfirmed) this.store.dispatch(StudentActions.deleteStudentById( {studentId: student.id} ));
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
          this.store.dispatch(StudentActions.createStudent( {payload: newStudent} ))    
        }
      });
  }

  ngOnDestroy(): void {
    this.destroyed.next(true);
  }
}
