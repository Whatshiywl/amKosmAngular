import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, URLSearchParams, ResponseContentType } from '@angular/http';

import { OrderRequest } from '../models/OrderRequest';
import { LoginRequest } from '../models/LoginRequest';
import { SignupRequest } from '../models/SignupRequest';

import 'rxjs/add/operator/map';

@Injectable()
export class HttpService {

  constructor(
    private http: Http
  ) { }

  getSession(cpf, session) {
    return this.http.get(`http://localhost:9999/api/v1/session?cpf=${cpf}&session=${session}`).map(res => res.json());
  }

  getAddress(cpf, session) {
    return this.http.get(`http://localhost:9999/api/v1/address?cpf=${cpf}&session=${session}`).map(res => res.json());
  }

  resubmitConfirmSignUpEmail(cpf) {
    return this.http.post(`http://localhost:9999/api/v1/sign-up-resubmit`, {cpf: cpf}).map(res => res.json());
  }

  postOrder(cpf, request: OrderRequest) {
    return this.http.post(`http://localhost:9999/api/v1/order`, request.products).map(res => res.json());
  }

  postLogin(request: LoginRequest) {
    return this.http.post(`http://localhost:9999/api/v1/login`, request).map(res => res.json());
  }

  postUser(request: SignupRequest) {
    return this.http.post(`http://localhost:9999/api/v1/user`, request).map(res => res.json());
  }

  getUserExists(cpf) {
    return this.http.get(`http://localhost:9999/api/v1/user-exists?cpf=${cpf}`).map(res => res.json());
  }

}
