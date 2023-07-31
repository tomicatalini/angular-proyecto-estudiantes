import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Course } from '../../model/model';

@Component({
  selector: 'app-course-table',
  templateUrl: './course-table.component.html',
  styleUrls: ['./course-table.component.scss']
})
export class CourseTableComponent {
  displayedColumns: string[] = ['id', 'name', 'startDate', 'endDate', 'actions'];

  @Input()
  dataSource: Course[] = [];

  @Output()
  courseEdit = new EventEmitter<Course>();

  @Output()
  courseDelete = new EventEmitter<Course>();

  constructor(){}

  edit(value: Course): void{
    this.courseEdit.emit(value);
  }

  delete(value: Course): void {
    this.courseDelete.emit(value);
  }
}
