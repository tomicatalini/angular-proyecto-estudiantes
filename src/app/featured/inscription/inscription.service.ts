import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, take } from 'rxjs';
import { Inscription } from './models/models';
import { ApiService } from 'src/app/core/services/api.service';
import { CustomNotifierService } from 'src/app/core/services/custom-notifier.service';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class InscriptionService extends ApiService<Inscription>{

  private _inscriptions$ = new BehaviorSubject<Inscription[]>([]);

  constructor(
    private _httpClient: HttpClient,
    private notifierService: CustomNotifierService
  ) { 
    super(_httpClient);
  }
}
