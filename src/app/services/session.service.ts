import { Injectable } from '@angular/core';

import { User } from '../models/User';

@Injectable()
export class SessionService {

  public userExists: {
    success: boolean,
    exists: boolean,
    registered: boolean,
    err?: any
  };

  // private user: User;

  constructor() { }

  getUser(): User {
    return JSON.parse(localStorage.getItem('user'));
  }

  setUser(user) {
    localStorage.setItem('user', JSON.stringify(user));
  }

  getHash() {
    return localStorage.getItem('session');
  }

  setHash(hash: string) {
    localStorage.setItem('session', hash);
  }

}
