import { Injectable } from '@angular/core';
import { Course } from '../model/model';

@Injectable({
  providedIn: 'root'
})
export class CourseMockService {
  
  private courses: Course[] = [
    {
      id: 1,
      name: 'Angular',
      startDate: new Date(2023,2,1),
      endDate: new Date(2023,4,25)
    }
  ]
  
  constructor() { }

  getCourses() : Course[] {
    return this.courses;
  }
}
