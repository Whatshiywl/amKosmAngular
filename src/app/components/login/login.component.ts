import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { HttpService } from '../../services/http.service';
import { UtilService } from '../../services/util.service';

import { LoginRequest } from '../../models/LoginRequest';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  model = new LoginRequest("", "");

  constructor(
    private httpService: HttpService,
    private utilService: UtilService,
    private router: Router
  ) { }

  ngOnInit() {
  }

  onSubmit() {
    let encrypted = this.utilService.encryptFormWithPassword("senha", "password");
    if(!encrypted) return false;
    this.httpService.postLogin(this.model.cpf, this.model.password).subscribe(res => {
      if(res.err) console.error(res.err);
      else {
        // this.router.navigate(['/order']);
      }
    }, err => {
      console.error(err);
    });
  }

}
