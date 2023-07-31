import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, take, map } from 'rxjs';
import { User } from './models/models';
import { UserMockService } from './mock/user-mock.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private _users$ = new BehaviorSubject<User[]>([]);

  constructor(
    private userMockService: UserMockService
  ) {}

  getAll(): Observable<User[]> {
    return this._users$.asObservable();
  }

  getById(userId: number): Observable<User | undefined> {
    return this._users$
      .pipe(
        take(1),
        map((users) => {
          return users.find(user => user.id === userId)
        })        
      );
  }

  load(): void{
    this._users$.next(this.userMockService.getUsers());
  }

  create(user: User): void {
    this._users$
      .pipe(take(1))
      .subscribe(users => this._users$.next([...users, {...user, id: users.length + 1}]));      
  }

  update(newUser: User): void {
    this._users$
      .pipe(take(1))
      .subscribe(users => {
        this._users$.next(
          users.map((user) => {
            return user.id === newUser.id ? {...user, ...newUser} : user}
          )
        )});
  }

  deleteById(userId: number): void {
    this._users$
      .pipe(take(1))
      .subscribe(users => this._users$.next(
        users.filter(user => user.id !== userId)
      ));
  }
}
