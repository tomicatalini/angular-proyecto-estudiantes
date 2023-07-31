import { Component, OnDestroy, OnInit } from '@angular/core';
import { StudentService } from '../student/student.service';
import { Observable, Subject, takeUntil } from 'rxjs';
import { Student } from '../student/model/student';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {
  private destoyed = new Subject<boolean>();

  private _students$: Observable<Student[] | null>;

  numberStudents: number = 0;

  constructor(
    private studentService: StudentService
  ){
    this._students$ = this.studentService.getStudents();
  }

  ngOnInit(): void {
    this.studentService.loadStudents();
    this._students$.pipe(takeUntil(this.destoyed)).subscribe( students => {this.numberStudents = students?.length!});
  }

  ngOnDestroy(): void {
    this.destoyed.next(true);
  }

}
