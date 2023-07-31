import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Subject } from '../../model/models';

@Component({
  selector: 'app-subject-table',
  templateUrl: './subject-table.component.html',
  styleUrls: ['./subject-table.component.scss']
})
export class SubjectTableComponent {
  displayedColumns: string[] = ['id', 'name', 'description', 'actions'];

  @Input()
  dataSource: Subject[] = [];

  @Output()
  subjectEdit = new EventEmitter<Subject>();

  @Output()
  subjectDelete = new EventEmitter<Subject>();

  constructor(){}

  edit(value: Subject): void{
    this.subjectEdit.emit(value);
  }

  delete(value: Subject): void {
    this.subjectDelete.emit(value);
  }
}
