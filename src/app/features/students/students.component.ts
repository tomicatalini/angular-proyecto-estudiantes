import { Component } from '@angular/core';
import Swal from 'sweetalert2';
import { Student } from './models/student';
import { StudentDialogFormComponent } from './student-dialog-form/student-dialog-form.component';
import { MatDialog } from '@angular/material/dialog';

const STUDENTS: Student[] = [{
  id: 1,
  name: 'Tomás',
  surname: 'Catalini',
  birthdate: new Date(1995,2,11),
  email: 'tomascatalini@gmail.com',
  phone: '123456789'
}];

@Component({
  selector: 'app-students',
  templateUrl: './students.component.html',
  styleUrls: ['./students.component.scss']
})
export class StudentsComponent {
  dataSource: Student[] = STUDENTS;

  constructor(public dialog: MatDialog){}

  createUserDialog(): void{
    this.dialog
      .open(StudentDialogFormComponent)
      .afterClosed()
      .subscribe( (data: Student) => {
        if(data){
          data.id = this.dataSource.length + 1;

          this.dataSource = [...this.dataSource, data];          
        }
      });
  }

  edit(data: Student): void {
    this.dialog
      .open(StudentDialogFormComponent, {data: data})
      .afterClosed()
      .subscribe( (edited: Student) => {
        if(edited){
          this.dataSource = this.dataSource.map( s => { return s.id === edited.id ? {...s, ...edited} : s });    
        }
      });
  }

  delete(data: Student): void {
    Swal.fire({
      title: 'Eliminación',
      text: `Esta seguro que quiere eliminar al estudiante: ${data.name} ${data.surname}`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Eliminar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.dataSource = this.dataSource.filter(s => s.id !== data.id);
      }
    });
  }
}
