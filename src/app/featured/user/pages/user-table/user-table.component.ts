import { Component, Input, Output, EventEmitter } from '@angular/core';
import { User } from '../../models/models';

@Component({
  selector: 'app-user-table',
  templateUrl: './user-table.component.html',
  styleUrls: ['./user-table.component.scss']
})
export class UserTableComponent {
  displayedColumns: string[] = ['id', 'name', 'surname', 'email', 'role','actions'];

  @Input()
  dataSource: User[] = [];

  @Output()
  userEdit = new EventEmitter<User>();

  @Output()
  userDelete = new EventEmitter<User>();

  constructor(){}

  edit(value: User): void{
    this.userEdit.emit(value);
  }

  delete(value: User): void {
    this.userDelete.emit(value);
  }
}
