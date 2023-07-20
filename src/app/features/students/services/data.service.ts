import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { Student } from '../models/student';

const STUDENTS: Student[] = [{
  id: 1,
  name: 'Tomás',
  surname: 'Catalini',
  birthdate: new Date(1995,2,11),
  email: 'tomascatalini@gmail.com',
  phone: '123456789'
}];

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private students: Student[] = [];
  private _students$ = new Subject<Student []>(); 
  private student$: Observable<Student []> = this._students$.asObservable();

  constructor() {
    this.student$.subscribe(data => console.log(data));
  }

  getStudents(): Observable<Student[]>{
    console.log('Entro al getStudents');
    return this.student$;
  }

  createStudent(student: Student): void {
    console.log('Entro al create');
    this.students = [
      ...this.students,
      student
    ];
  }

  loadStudents(): void {
    console.log('Entro al load');

    this._students$.next(this.students);
  }

  updateStudent(student: Student): void {
    console.log('Entro al update');

    this.students.map(s => {return s.id === student.id ? {...s, ...student} : s});
  }

  deleteStudentById(studentId: number): void {
    console.log('Entro al delete id');

    this.students = this.students.filter(s => s.id !== studentId);
  }

  deleteStudent(student: Student): void {
    this.deleteStudentById(student.id);
  }
}
