import { Component, OnInit } from '@angular/core';
import { HttpService } from '../../services/http.service';
import { SessionService } from '../../services/session.service';

@Component({
  selector: 'app-registered',
  templateUrl: './registered.component.html',
  styleUrls: ['./registered.component.css']
})
export class RegisteredComponent implements OnInit {
  email = "hello"

  constructor(
    private httpService: HttpService,
    private sessionService: SessionService
  ) { }

  ngOnInit() {
  }

  resubmitEmail() {
    let user = this.sessionService.getUser();
    if(!user) return;
    this.httpService.resubmitConfirmSignUpEmail(this.sessionService.getUser().getCpf()).subscribe(res => {
      console.log(res);
      if(res.err) console.error(res.err);
    });
  }

}
