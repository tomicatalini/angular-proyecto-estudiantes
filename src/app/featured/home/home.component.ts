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

  numberStudents: number = 0;

  constructor(
    private studentService: StudentService
  ){}

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    this.destoyed.next(true);
  }

}
