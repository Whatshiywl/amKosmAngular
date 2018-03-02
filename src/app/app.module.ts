import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';


import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { RegisteredComponent } from './components/registered/registered.component';
import { OrderComponent } from './components/order/order.component';
import { ErrorComponent } from './components/error/error.component';

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
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(appRoutes, {enableTracing: true})
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
