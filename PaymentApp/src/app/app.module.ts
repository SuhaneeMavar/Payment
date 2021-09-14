import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { RouterModule } from '@angular/router';
import { AppRoutingModule } from './app.routing';

import { AppComponent } from './app.component';
import { SignupComponent } from './pages/signup/signup.component';
import { LandingComponent } from './pages/landing/landing.component';
import { PaymentsComponent } from './pages/payments/payments.component';

import { NavbarComponent } from './shared/navbar/navbar.component';
import { FooterComponent } from './shared/footer/footer.component';


import { LoginComponent } from './pages/login/login.component';
import { AllPaymentsComponent } from './pages/all-payments/all-payments.component';
import { PaymentSuccessComponent } from './pages/payment-success/payment-success.component';
import { PaymentUnsuccessComponent } from './pages/payment-unsuccess/payment-unsuccess.component';
import { UserComponent } from './pages/user/user.component';
import { HttpClientModule } from '@angular/common/http';

import { NgxStripeModule } from 'ngx-stripe';
import { ErrorComponent } from './pages/error/error.component';

@NgModule({
  declarations: [
    AppComponent,
    SignupComponent,
    LandingComponent,
    PaymentsComponent,
    NavbarComponent,
    FooterComponent,
    LoginComponent,
    AllPaymentsComponent,
    PaymentSuccessComponent,
    PaymentUnsuccessComponent,
    UserComponent,
    ErrorComponent
  ],
  imports: [
    BrowserModule,
    NgbModule,
    FormsModule,
    RouterModule,
    AppRoutingModule,
    HttpClientModule,
    NgxStripeModule.forRoot('pk_test_51JYsKDSIKYH1gEB5c3R3KRiXeSqZlbm268AopOZwJTrNPht0RzAZxbcmKKDm9l3lDbQlZz5Rfkzdx8Q6faGSv53W00NLlvO4sl'),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
