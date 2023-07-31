import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, pipe, take, map } from 'rxjs';
import { Course } from './model/model';
import { CourseMockService } from './mock/course-mock.service';

@Injectable({
  providedIn: 'root'
})
export class CourseService {

  private _courses$ = new BehaviorSubject<Course[]>([]);

  constructor(
    private courseMockService: CourseMockService
  ) {}

  getAll(): Observable<Course[]> {
    return this._courses$.asObservable();
  }

  getById(courseId: number): Observable<Course | undefined> {
    return this._courses$
      .pipe(
        take(1),
        map((courses) => {
          return courses.find(c => c.id === courseId)
        })        
      );
  }

  load(): void{
    this._courses$.next(this.courseMockService.getCourses());
  }

  create(course: Course): void {
    this._courses$
      .pipe(take(1))
      .subscribe(courses => this._courses$.next([...courses, {...course, id: courses.length + 1}]));      
  }

  update(newCourse: Course): void {
    this._courses$
      .pipe(take(1))
      .subscribe(courses => {
        this._courses$.next(
          courses.map((course) => {
            return course.id === newCourse.id ? {...course, ...newCourse} : course}
          )
        )});
  }

  deleteById(courseId: number): void {
    this._courses$
      .pipe(take(1))
      .subscribe(courses => this._courses$.next(
        courses.filter(course => course.id !== courseId)
      ));
  }
}
