import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, map, take } from 'rxjs';
import { Course } from './model/model';
import { ApiService } from 'src/app/core/services/api.service';
import { CustomNotifierService } from 'src/app/core/services/custom-notifier.service';
import { HttpClient } from '@angular/common/http';
import { Student } from '../student/model/student';
import { environment } from 'src/environments/environment';
import { Inscription } from '../inscription/models/models';

@Injectable({
  providedIn: 'root'
})
export class CourseService extends ApiService<Course> {

  constructor(
    private _httpClient: HttpClient,
    private notifierService: CustomNotifierService
  ) {
    super(_httpClient);
  }

  getEnrolledStudents(courseId: number): Observable<Student[]> {
    return this._httpClient
      .get<Inscription[]>(environment.baseApiUrl + `/inscriptions?_expand=student&courseId=${courseId}`)
      .pipe(
        map((inscriptions) => inscriptions.map(inscription => inscription.student!))
      );
  }
}
