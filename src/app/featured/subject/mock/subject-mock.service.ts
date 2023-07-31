import { Injectable } from '@angular/core';
import { Subject } from '../model/models';

@Injectable({
  providedIn: 'root'
})
export class SubjectMockService {

  private subjects: Subject[] = [
    {
      id: 1,
      name: 'Introducción Angular',
      description: 'Clase de introducción de Angular. Presentación de los temas.'
    }
  ]
  
  constructor() { }

  getSubjects() : Subject[] {
    return this.subjects;
  }
}
