import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Inscription } from '../../models/models';

@Component({
  selector: 'app-inscription-table',
  templateUrl: './inscription-table.component.html',
  styleUrls: ['./inscription-table.component.scss']
})
export class InscriptionTableComponent {
  displayedColumns: string[] = ['id', 'course', 'actions'];

  @Input()
  dataSource: Inscription[] = [];

  @Output()
  inscriptionEdit = new EventEmitter<Inscription>();

  @Output()
  inscriptionDelete = new EventEmitter<Inscription>();

  @Input() canEdit: boolean = true;
  @Input() canDelete: boolean = true;
  @Input() canView: boolean = true;

  constructor(){
    console.log(this.dataSource);
  }

  edit(value: Inscription): void{
    this.inscriptionEdit.emit(value);
  }

  delete(value: Inscription): void {
    this.inscriptionDelete.emit(value);
  }
}
