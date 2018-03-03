import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, URLSearchParams, ResponseContentType } from '@angular/http';

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

  postOrder(orderParms) {
    return this.http.post(`http://localhost:9999/api/v1/order`, orderParms).map(res => res.json());
  }

  postLogin(cpf, password) {
    return this.http.post(`http://localhost:9999/api/v1/login`, {cpf: cpf, password: password}).map(res => res.json());
  }

}
