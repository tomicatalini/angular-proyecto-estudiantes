import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, take } from 'rxjs';
import { Inscription } from './models/models';
import { ApiService } from 'src/app/core/services/api.service';
import { CustomNotifierService } from 'src/app/core/services/custom-notifier.service';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { KeyValue } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class InscriptionService extends ApiService<Inscription>{

  constructor(
    private _httpClient: HttpClient,
    private notifierService: CustomNotifierService
  ) { 
    super(_httpClient);
  }

  getAllByStudentId(studentId: number): Observable<Inscription[]> {
    return this._httpClient.get<Inscription[]>(environment.baseApiUrl + `/inscriptions?_expand=student&_expand=course&studentId=${studentId}`);
  }

  getAllByCourseId(courseId: number, filter?: KeyValue<string, number | string>): Observable<Inscription[]> {
    const url = environment.baseApiUrl + `/inscriptions?_expand=student&_expand=course&courseId=${courseId}`;

    if(filter){
      return this._httpClient.get<Inscription[]>(url, {
        params: {
          [filter.key]: filter.value
        }
      });
    }
    return this._httpClient.get<Inscription[]>(url);
  }
}
