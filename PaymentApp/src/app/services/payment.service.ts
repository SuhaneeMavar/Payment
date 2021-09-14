import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { retry } from 'rxjs/operators';
import { BASE_URL } from 'src/environments/environment';
import { Payment } from '../models/payment';
@Injectable({
  providedIn: 'root'
})
export class PaymentService {

  constructor(private http: HttpClient) { }


  getPaymentIntent(data): Observable<any> {
    let headers = {
      "headers": new HttpHeaders({
        "Content-Type": "application/json"
      })
    }
    return this.http.post<any>(`${BASE_URL}payments/create-payment-intent`, JSON.stringify(data), headers).pipe(retry(3))
  }

  getAllPayments(): Observable<Payment[]> {
    return this.http.get<Payment[]>(`${BASE_URL}payments`).pipe(retry(3))
  }

  getPaymentsByUser(userId): Observable<Payment[]> {
    return this.http.get<Payment[]>(`${BASE_URL}payments/search?userId=${userId}`).pipe(retry(3))
  }

  createPayment(payment: Payment) {
    let headers = {
      "headers": new HttpHeaders({
        "Content-Type": "application/json"
      })
    }
    return this.http.post<any>(`${BASE_URL}payments`, JSON.stringify(payment), headers).pipe(retry(3))
  }
}
