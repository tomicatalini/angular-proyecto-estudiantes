import { Injectable } from '@angular/core';
import { Student } from './model/student';
import { BehaviorSubject, Observable, take, map, mergeMap, of, finalize, catchError } from 'rxjs';
import { ApiService } from 'src/app/core/services/api.service';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class StudentService extends ApiService<Student> {

  constructor(
    private _httpClient: HttpClient,
  ) {
    super(_httpClient);
  }
}
