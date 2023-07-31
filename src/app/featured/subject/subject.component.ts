import { Component } from '@angular/core';
import { Observable, Subject as SubjectRxjs, takeUntil } from 'rxjs';
import { Subject } from './model/models';
import { MatDialog } from '@angular/material/dialog';
import { SubjectService } from './subject.service';
import { SubjectDialogFormComponent } from './pages/subject-dialog-form/subject-dialog-form.component';

@Component({
  selector: 'app-subject',
  templateUrl: './subject.component.html',
  styleUrls: []
})
export class SubjectComponent {
  dataSource$: Observable<Subject[]>;
  public destroyed = new SubjectRxjs<boolean>();
  
  constructor(
    public dialog: MatDialog,
    private subjectService: SubjectService
  ){    
    this.dataSource$ = this.subjectService.getAll();
  }

  ngOnInit(): void {
    this.subjectService.load();
  }

  edit(subject: Subject): void{
    this.dialog
      .open(SubjectDialogFormComponent, {data: subject})
      .afterClosed()
      .pipe(
        takeUntil(this.destroyed)
      )
      .subscribe( (edited: Subject) => {
        console.log(edited);
        if(edited){
          this.subjectService.update(edited);
        }
      });
  }

  delete(subject: Subject): void{
    this.subjectService.deleteById(subject.id);
  }

  createSubjectDialog(): void{
    this.dialog
      .open(SubjectDialogFormComponent)
      .afterClosed()
      .pipe(
        takeUntil(this.destroyed)
      )
      .subscribe( (newSubject: Subject) => {
        if(newSubject){
          this.subjectService.create(newSubject);    
        }
      });
  }

  ngOnDestroy(): void {
    this.destroyed.next(true);
  }
}
