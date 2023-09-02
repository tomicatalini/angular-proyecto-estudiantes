import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Course } from './model/model';
import { ApiService } from 'src/app/core/services/api.service';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Inscription } from '../inscription/models/models';

@Injectable({
  providedIn: 'root'
})
export class CourseService extends ApiService<Course> {

  constructor(
    private _httpClient: HttpClient,
  ) {
    super(_httpClient);
  }

  getEnrolledStudents(courseId: number): Observable<Inscription[]> {
    return this._httpClient
      .get<Inscription[]>(environment.baseApiUrl + `/inscriptions?_expand=student&_expand=course&courseId=${courseId}`);
  }
}
