import { Injectable } from '@angular/core';

import User from '../models/User';

@Injectable()
export class SessionService {

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
