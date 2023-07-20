import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Student } from '../models/student';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private students: Student[] = [{
    id: 1,
    name: 'Tomás',
    surname: 'Catalini',
    birthdate: new Date(1995,2,11),
    email: 'tomascatalini@gmail.com',
    phone: '123456789'
  }];
  private _students$ = new BehaviorSubject<Student []>([]); 
  private students$: Observable<Student []>;

  constructor() {
    this.students$ = this._students$.asObservable();
  }

  getStudents(): Observable<Student[]>{
    return this.students$;
  }

  createStudent(student: Student): void {
    this.students = [
      ...this.students,
      student
    ];
  }

  loadStudents(): void {
    this._students$.next(this.students);
  }

  updateStudent(student: Student): void {
    this.students = this.students.map(s => {return s.id === student.id ? {...s, ...student} : s});
  }

  deleteStudentById(studentId: number): void {
    console.log('Entro al delete id');

    this.students = this.students.filter(s => s.id !== studentId);
  }

  deleteStudent(student: Student): void {
    this.deleteStudentById(student.id);
  }
}
