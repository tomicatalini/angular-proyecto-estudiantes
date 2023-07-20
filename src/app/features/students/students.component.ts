import { Component, OnDestroy, OnInit } from '@angular/core';
import { Student } from './models/student';
import { StudentDialogFormComponent } from './student-dialog-form/student-dialog-form.component';
import { MatDialog } from '@angular/material/dialog';
import { DataService } from './services/data.service';
import { Subject, finalize, takeUntil, Observable, map } from 'rxjs';

@Component({
  selector: 'app-students',
  templateUrl: './students.component.html',
  styleUrls: ['./students.component.scss']
})
export class StudentsComponent implements OnInit, OnDestroy{
  dataSource$: Observable<Student[]>;
  public destroyed = new Subject<boolean>();
  
  constructor(
    public dialog: MatDialog,
    private dataService: DataService
  ){    
    this.dataSource$ = this.dataService
      .getStudents()
      .pipe(
        map((students) => students.map( s => ({
          ...s,
          name: s.name.toUpperCase(),
          surname: s.surname.toUpperCase()
        }))));
  }

  ngOnInit(): void {
    this.dataService.loadStudents();
  }

  edit(student: Student): void{
    this.dialog
      .open(StudentDialogFormComponent, {data: student})
      .afterClosed()
      .pipe(
        takeUntil(this.destroyed),
        finalize(() => this.loadStudent())
      )
      .subscribe( (edited: Student) => {
        if(edited){
          this.dataService.updateStudent(edited);
        }
      });
  }

  delete(student: Student): void{
    this.dataService.deleteStudent(student);
    this.dataService.loadStudents();
  }

  createUserDialog(): void{
    this.dialog
      .open(StudentDialogFormComponent)
      .afterClosed()
      .pipe(
        takeUntil(this.destroyed),
        finalize(() => this.loadStudent())
      )
      .subscribe( (newStudent: Student) => {
        if(newStudent){
          this.dataService.createStudent(newStudent);    
        }
      });
  }

  loadStudent(): void{
    this.dataService.loadStudents();
  }

  ngOnDestroy(): void {
    this.destroyed.next(true);
  }
}
