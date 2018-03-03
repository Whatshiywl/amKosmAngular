import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

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
    private utilService: UtilService,
    private router: Router
  ) { }

  ngOnInit() {
  }

  onSubmit(cpfID, senhaID, passwordID) {
    this.submitted = true;
    let encrypted = this.utilService.encryptFormWithPassword(senhaID, passwordID);
    if(!encrypted) return false;
    this.httpService.postLogin($(`#${cpfID}`).val(), $(`#${passwordID}`).val()).subscribe(res => {
      if(res.err) console.error(res.err);
      else {
        this.router.navigate(['/order']);
      }
    }, err => {
      console.error(err);
    });
  }

}
