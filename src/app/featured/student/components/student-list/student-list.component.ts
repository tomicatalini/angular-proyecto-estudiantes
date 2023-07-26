import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Student } from '../../model/student';

@Component({
  selector: 'app-student-list',
  templateUrl: './student-list.component.html',
  styleUrls: ['./student-list.component.scss']
})
export class StudentListComponent {
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
