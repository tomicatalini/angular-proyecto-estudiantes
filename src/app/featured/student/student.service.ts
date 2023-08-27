import { Injectable } from '@angular/core';
import { Student } from './model/student';
import { BehaviorSubject, Observable, take, map, mergeMap, of, finalize, catchError } from 'rxjs';
import { ApiService } from 'src/app/core/services/api.service';
import { CustomNotifierService } from '../../core/services/custom-notifier.service';
import { HttpClient } from '@angular/common/http';
import { Inscription } from '../inscription/models/models';
import { environment } from 'src/environments/environment';
import { Course } from '../course/model/model';

@Injectable({
  providedIn: 'root'
})
export class StudentService extends ApiService<Student> {

  constructor(
    private _httpClient: HttpClient,
    private notifierService: CustomNotifierService
  ) {
    super(_httpClient);
  }

  getTotal(): Observable<number> {
    return this.getAll('students').pipe(
      take(1),
      map((students) => students.length));
  }

  getAllStudentCourses(studentId: number):  Observable<Course[]>{
    return this._httpClient
      .get<Inscription[]>(environment.baseApiUrl + `/inscriptions?_expand=student&_expand=course&studentId=${studentId}`)
      .pipe(
        map((inscriptions) => inscriptions.map(inscription => inscription.course!))
      )
  }
}
