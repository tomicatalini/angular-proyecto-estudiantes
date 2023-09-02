import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Course } from 'src/app/featured/course/model/model';
import { Observable, Subject, concatMap, forkJoin, map, of, startWith, take, takeUntil, tap } from 'rxjs';
import { InscriptionService } from '../../inscription.service';
import { CourseService } from 'src/app/featured/course/course.service';
import { InscriptionModalData } from '../../models/models';
import { Student } from 'src/app/featured/student/model/student';
import { Store } from '@ngrx/store';
import { selectStudents } from 'src/app/featured/student/store/student.selectors';
import { selectCourses } from 'src/app/featured/course/store/course.selectors';
import { CourseActions } from 'src/app/featured/course/store/course.actions';
import { StudentActions } from 'src/app/featured/student/store/student.actions';
import { selectEnrolledStudents } from '../../store/inscription.selectors';
import { InscriptionActions } from '../../store/inscription.actions';
import { KeyValue } from '@angular/common';

@Component({
  selector: 'app-inscription-dialog-form',
  templateUrl: './inscription-dialog-form.component.html',
  styleUrls: ['./inscription-dialog-form.component.scss']
})
export class InscriptionDialogFormComponent implements OnInit {

  isDetroyed = new Subject<boolean>();

  idControl = new FormControl<number | null>(null);

  // courses$: Observable<Course[] | null>;
  // students$: Observable<Student[] | null>;
  array$: Observable<any>;
  

  //NO FUNCA PORQUE ESTOY QUERIENDO MOSTRAR TODOS LOS ESTUDIANTES INSCRIPTOS EN EL CURSO
  //POR LO QUE SIEMPRE ME VA A TRAER LOS QUE ESTAN INSCRIPTOS

  //SOLUCION: Buscar aquellos estudiantes que NO esten inscriptos en el curso.. A todos los estudiantes restarles los del curso

  constructor(
    private dialogRef: MatDialogRef<InscriptionDialogFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: InscriptionModalData,
    private store: Store
  ) {
    
    this.array$ = this.store.select(selectEnrolledStudents).pipe(
      take(1),
      map((students) => { console.log(data.students, students); return students.filter(student => !data.students!.includes(student))})
    );
  }

  ngOnInit(): void {
    this.store.dispatch(InscriptionActions.loadEnrolledStudentsByFilter({id: this.data.id}));
    this.idControl.valueChanges.pipe(
      startWith(''),
      tap(value => {
        if(value){
          let filter = null;
  
          if(Number.isNaN(Number(value))){
            filter = {key: 'name', value};
          } else {
            filter = {key: 'id', value};
          }
  
          this.store.dispatch(InscriptionActions.loadEnrolledStudentsByFilter({id: this.data.id, filter}));
        }
      }),
    ).subscribe();
  }

  displayFn(seleccionado: Course): string {
    return seleccionado ? seleccionado.name : '';
  }

  close(){
    if(this.idControl.valid){
      this.dialogRef.close(this.idControl.value);
    }
  }
}
