import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Subject, map, startWith, take, takeUntil } from 'rxjs';
import { Student } from 'src/app/featured/student/model/student';
import { StudentService } from 'src/app/featured/student/student.service';
import { StudentModalInscription } from '../../models/models';

@Component({
  selector: 'app-student-inscription-dialog-form',
  templateUrl: './student-inscription-dialog-form.component.html',
  styleUrls: ['./student-inscription-dialog-form.component.scss']
})
export class StudentInscriptionDialogFormComponent implements OnInit, OnDestroy {

  isDetroyed = new Subject<boolean>();

  control = new FormControl<any | null>(null);
  enrolledStudents$ = new Subject<Student[]>();

  constructor(
    private dialogRef: MatDialogRef<StudentInscriptionDialogFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: StudentModalInscription,
    private studentService: StudentService
  ) {
    this.studentService
      .getAll('students')
      .pipe(
        take(1),
        map(students => students.filter(s => !this.data.enrolledStudentsIds?.includes(s.id)))
      )
      .subscribe(enrolledStudents => this.enrolledStudents$.next(enrolledStudents));
  }

  ngOnDestroy(): void {
    this.isDetroyed.next(true);
  }

  ngOnInit(): void {
    this.control.valueChanges.pipe(
      takeUntil(this.isDetroyed),
      startWith(''),
      map(value => {
        let obs$ = this.studentService.getAll('students');

        if(value){
          let filter = {key: 'id', value};
          
          obs$ = this.studentService.getAll('students', filter);
        }
        
        obs$.pipe(
          take(1),
          map(students => {
            return students.filter(s => !this.data.enrolledStudentsIds?.includes(s.id))
          })
        )
        .subscribe(enrolledStudents => this.enrolledStudents$.next(enrolledStudents));
      }),
    ).subscribe();
  }

  displayFn(seleccionado: Student): string {
    console.log(seleccionado)
    return seleccionado ? (seleccionado.id + ' | ' + seleccionado.name) : '';
  }

  close(){
    if(this.control.valid){
      this.dialogRef.close(this.control.value);
    }
  }

  cancel(){
    this.dialogRef.close();
  }
}
