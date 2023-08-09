import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { Inscription } from '../../models/models';

@Component({
  selector: 'app-inscription-table',
  templateUrl: './inscription-table.component.html',
  styleUrls: ['./inscription-table.component.scss']
})
export class InscriptionTableComponent {
  displayedColumns: string[] = ['id', 'courseId', 'course', 'actions'];

  @Input()
  dataSource: Inscription[] = [];

  @Output()
  inscriptionEdit = new EventEmitter<Inscription>();

  @Output()
  inscriptionDelete = new EventEmitter<Inscription>();

  @Input() canEdit: boolean = true;
  @Input() canDelete: boolean = true;
  @Input() canView: boolean = true;

  constructor(){}

  edit(value: Inscription): void{
    this.inscriptionEdit.emit(value);
  }

  delete(value: Inscription): void {
    this.inscriptionDelete.emit(value);
  }
}
