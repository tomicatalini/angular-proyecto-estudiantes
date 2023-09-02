import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Student } from '../../model/student';

@Component({
  selector: 'app-student-table',
  templateUrl: './student-table.component.html',
  styleUrls: ['./student-table.component.scss']
})
export class StudentTableComponent {
  // displayedColumns: string[] = ['name', 'surname', 'email', 'birthdate', 'phone', 'actions'];
  displayedColumns: string[] = ['completeName', 'email', 'birthdate', 'registerDate', 'actions'];

  @Input()
  dataSource: Student[] = [];

  @Output()
  studentEdit = new EventEmitter<Student>();

  @Output()
  studentDelete = new EventEmitter();

  constructor(){}

  edit(value: Student): void{
    this.studentEdit.emit(value);
  }

  delete(value: Student): void {
    this.studentDelete.emit(value);
  }
}
