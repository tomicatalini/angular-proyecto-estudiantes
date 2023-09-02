import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { Inscription } from '../../models/models';

@Component({
  selector: 'app-inscription-table',
  templateUrl: './inscription-table.component.html',
  styleUrls: ['./inscription-table.component.scss']
})
export class InscriptionTableComponent implements OnInit{
  displayedColumns: string[] = [];

  @Input()
  dataSource: Inscription[] = [];

  @Output()
  inscriptionEdit = new EventEmitter<Inscription>();

  @Output()
  inscriptionDelete = new EventEmitter<Inscription>();

  @Input() canEdit: boolean = true;
  @Input() canDelete: boolean = true;
  @Input() canView: boolean = true;
  @Input() view: string = 'all';

  constructor(){}

  ngOnInit(): void {
    if(this.view === 'student') {
      this.displayedColumns = ['id','studentId', 'studentName', 'studentEmail', 'actions'];
    } else if(this.view === 'course') {
      this.displayedColumns = ['id','courseId', 'course', 'actions'];
    } else {
      this.displayedColumns = ['id','courseId', 'course', 'studentId', 'studentName', 'studentEmail', 'actions'];
    }
  }

  edit(value: Inscription): void{
    this.inscriptionEdit.emit(value);
  }

  delete(value: Inscription): void {
    this.inscriptionDelete.emit(value);
  }
}
