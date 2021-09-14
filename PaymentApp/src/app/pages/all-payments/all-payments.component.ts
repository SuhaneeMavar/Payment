import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Payment } from 'src/app/models/payment';
import { PaymentService } from 'src/app/services/payment.service';

@Component({
  selector: 'app-all-payments',
  templateUrl: './all-payments.component.html',
  styleUrls: ['./all-payments.component.css']
})
export class AllPaymentsComponent implements OnInit {

  payments: Payment[] = new Array()

  constructor(private router: Router, private paymentService: PaymentService) { }

  ngOnInit(): void {
    this.getAllPayments()
  }

  getAllPayments() {
    this.paymentService.getAllPayments().subscribe(data => {
      this.payments = data
    }, error => {
      console.log(error);
      this.router.navigate(['/error'])
    })
  }
}
