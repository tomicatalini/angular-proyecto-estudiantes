import { Student } from '../model/student';

export class StudentMockService {
  
  private _students: Student[] = [{
    id: 1,
    name: 'Tomás',
    surname: 'Catalini',
    birthdate: new Date(1995,2,11),
    registerDate: new Date(),
    email: 'tomascatalini@gmail.com',
  }];

  constructor() { }

  getStudents(): Student[] {
    return this._students;
  }
}
