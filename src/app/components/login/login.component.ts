import { Component, OnInit } from '@angular/core';

import { HttpService } from '../../services/http.service';
import { UtilService } from '../../services/util.service';

import { LoginRequest } from '../../models/LoginRequest';

import * as $ from 'jquery';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  model = new LoginRequest("", "");

  submitted = false;

  constructor(
    private httpService: HttpService,
    private utilService: UtilService
  ) { }

  ngOnInit() {
  }

  onSubmit(cpfID, senhaID, passwordID) {
    this.submitted = true;
    console.log('SUBMIT1');
    let encrypted = this.utilService.encryptFormWithPassword(senhaID, passwordID);
    if(!encrypted) return false;
    this.httpService.postLogin($(`#${cpfID}`).val(), $(`#${passwordID}`).val()).subscribe(res => {
      console.log(res);
    }, err => {
      console.error(err);
    });
    console.log('SUBMIT2');
    // event.preventDefault();
    // return false;
  }

}
