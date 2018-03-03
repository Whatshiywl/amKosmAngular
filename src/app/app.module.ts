import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HttpModule } from '@angular/http';
import { FormsModule }   from '@angular/forms';


import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { RegisteredComponent } from './components/registered/registered.component';
import { OrderComponent } from './components/order/order.component';
import { ErrorComponent } from './components/error/error.component';

import { HttpService } from './services/http.service';
import { SessionService } from './services/session.service';
import { UtilService } from './services/util.service';
import { InvalidCpfDirective } from './directives/invalid-cpf.directive';

const appRoutes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'registered', component: RegisteredComponent },
  { path: 'order', component: OrderComponent },
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: '**', component: ErrorComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SignupComponent,
    RegisteredComponent,
    OrderComponent,
    ErrorComponent,
    InvalidCpfDirective,
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(appRoutes, {enableTracing: true}),
    HttpModule,
    FormsModule
  ],
  providers: [
    HttpService,
    SessionService,
    UtilService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
