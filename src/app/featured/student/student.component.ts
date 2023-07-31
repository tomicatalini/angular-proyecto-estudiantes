import { Component } from '@angular/core';
import { Observable, Subject, map, takeUntil } from 'rxjs';
import { Student } from './model/student';
import { MatDialog } from '@angular/material/dialog';
import { StudentService } from './student.service';
import { StudentDialogFormComponent } from './components/student-dialog-form/student-dialog-form.component';

@Component({
  selector: 'app-student',
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.scss']
})
export class StudentComponent {
  dataSource$: Observable<Student[]>;
  public destroyed = new Subject<boolean>();
  
  constructor(
    public dialog: MatDialog,
    private studentService: StudentService
  ){    
    this.dataSource$ = this.studentService
      .getStudents()
      .pipe(
        map((students) => students.map( s => ({
          ...s,
          name: s.name.toUpperCase(),
          surname: s.surname.toUpperCase()
        }))));
  }

  ngOnInit(): void {
    this.studentService.loadStudents();
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
          this.studentService.updateStudent(edited);
        }
      });
  }

  delete(student: Student): void{
    this.studentService.deleteStudentById(student.id);
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
          this.studentService.createStudent(newStudent);    
        }
      });
  }

  loadStudent(): void{
    this.studentService.loadStudents();
  }

  ngOnDestroy(): void {
    this.destroyed.next(true);
  }
}
