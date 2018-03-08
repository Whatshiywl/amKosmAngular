import { Injectable } from '@angular/core';

import User from '../models/User';

@Injectable()
export class SessionService {

  public userExists: {
    success: boolean,
    exists: boolean,
    registered: boolean,
    err?: any
  };

  private user: User;
  private sessionHash: string;

  constructor() { }

  getUser() {
    return this.user;
  }

  getHash() {
    return this.sessionHash;
  }

}
