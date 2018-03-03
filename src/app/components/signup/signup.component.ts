import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { HttpService } from '../../services/http.service';
import { UtilService } from '../../services/util.service';

import { SignupRequest } from '../../models/SignupRequest';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  model = new SignupRequest("", "", "", "");

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
    this.httpService.postUser(this.model.name, this.model.cpf, this.model.email, this.model.password).subscribe(res => {
      if(res.err) console.error(res.err);
      else {
        this.router.navigate(['/registered']);
      }
    }, err => {
      console.error(err);
    });
  }

}
