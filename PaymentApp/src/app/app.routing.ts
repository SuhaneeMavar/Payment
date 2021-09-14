import { NgModule } from '@angular/core';
import { CommonModule, } from '@angular/common';
import { BrowserModule  } from '@angular/platform-browser';
import { Routes, RouterModule } from '@angular/router';

import { PaymentsComponent } from './pages/payments/payments.component';
import { SignupComponent } from './pages/signup/signup.component';
import { LandingComponent } from './pages/landing/landing.component';
import { LoginComponent } from './pages/login/login.component';
import { AllPaymentsComponent } from './pages/all-payments/all-payments.component';
import { PaymentSuccessComponent } from './pages/payment-success/payment-success.component';
import { PaymentUnsuccessComponent } from './pages/payment-unsuccess/payment-unsuccess.component';
import { UserComponent } from './pages/user/user.component';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from './auth.intercepor';
import { ErrorComponent } from './pages/error/error.component';
import { UserGuard } from './guards/user.guard';
import { AdminGuard } from './guards/admin.guard';
import { AuthGuard } from './guards/auth.guard';

const routes: Routes =[
    { path: 'home', component: LandingComponent,canActivate:[AuthGuard] },
    { path: 'user/payments',     component: PaymentsComponent , canActivate:[UserGuard]},
    { path: 'register',           component: SignupComponent , canActivate:[AuthGuard]},
    { path: 'landing',          component: LandingComponent },
    { path: 'login',          component: LoginComponent , canActivate:[AuthGuard]},
    { path: 'admin/payments',          component: AllPaymentsComponent, canActivate:[AdminGuard]},
    { path: 'success',          component: PaymentSuccessComponent },
    { path: 'unsuccess',          component: PaymentUnsuccessComponent },
    { path: 'users/payments',          component: UserComponent },
    { path: 'error',          component: ErrorComponent },
    { path: '', redirectTo: 'home', pathMatch: 'full' }
];

@NgModule({
  imports: [
    CommonModule,
    BrowserModule,
    RouterModule.forRoot(routes,{
      useHash: false
    })
  ],
  providers: [
    {
      provide:HTTP_INTERCEPTORS,
      useClass:AuthInterceptor,
      multi:true
    }],
  exports: [
  ],
})
export class AppRoutingModule { }
