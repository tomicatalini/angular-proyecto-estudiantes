import { Injectable } from '@angular/core';
import { User } from '../models/models';

@Injectable({
  providedIn: 'root'
})
export class UserMockService {

  private users: User[] = [
    {
      id: 1,
      name: 'Tomas',
      surname: 'Catalini',
      email: 'tomi@gmail.com',
      password: '12345',
      token: 'asdsads',
      role: 'administrador'
    }
  ]
  
  constructor() { }

  getUsers() : User[] {
    return this.users;
  }
}
