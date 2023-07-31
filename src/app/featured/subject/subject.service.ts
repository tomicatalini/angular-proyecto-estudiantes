import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, map, take } from 'rxjs';
import { Subject } from './model/models';
import { SubjectMockService } from './mock/subject-mock.service';

@Injectable({
  providedIn: 'root'
})
export class SubjectService {

  private _subjects$ = new BehaviorSubject<Subject[]>([]);

  constructor(
    private subjectMockService: SubjectMockService
  ) {}

  getAll(): Observable<Subject[]> {
    return this._subjects$.asObservable();
  }

  getById(subjectId: number): Observable<Subject | undefined> {
    return this._subjects$
      .pipe(
        take(1),
        map((subjects) => {
          return subjects.find(subject => subject.id === subjectId)
        })        
      );
  }

  load(): void{
    this._subjects$.next(this.subjectMockService.getSubjects());
  }

  create(subject: Subject): void {
    this._subjects$
      .pipe(take(1))
      .subscribe(subjects => this._subjects$.next([...subjects, {...subject, id: subjects.length + 1}]));      
  }

  update(newSubject: Subject): void {
    this._subjects$
      .pipe(take(1))
      .subscribe(subjects => {
        this._subjects$.next(
          subjects.map((subject) => {
            return subject.id === newSubject.id ? {...subject, ...newSubject} : subject}
          )
        )});
  }

  deleteById(subjectId: number): void {
    this._subjects$
      .pipe(take(1))
      .subscribe(subjects => this._subjects$.next(
        subjects.filter(subject => subject.id !== subjectId)
      ));
  }
}
