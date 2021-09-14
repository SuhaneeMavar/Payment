import { Component, OnInit } from '@angular/core';
import { PaymentService } from 'src/app/services/payment.service';
import { StripeService } from 'ngx-stripe';
import { StripeCardElementOptions, StripeElementsOptions } from '@stripe/stripe-js';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/models/user';
import { Router } from '@angular/router';
import { Payment } from 'src/app/models/payment';
@Component({
    selector: 'app-profile',
    templateUrl: './payments.component.html',
    styleUrls: ['./payments.component.scss']
})

export class PaymentsComponent implements OnInit {

    user: User = new User()

    payment: Payment = new Payment()
    showTable: boolean = true

    amount: number = null

    showForm: boolean = false

    disabled: boolean = false

    payments: Payment[] = new Array()

    cardOptions: StripeCardElementOptions = {
        hidePostalCode: true,
        style: {
            base: {
                iconColor: '#666EE8',
                color: '#31325F',
                fontWeight: '300',
                fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
                fontSize: '14px',
                '::placeholder': {
                    color: '#CFD7E0',
                },
            },
        },
    };

    elementsOptions: StripeElementsOptions = {
        locale: 'nl',
    };
    constructor(private router: Router, private userService: UserService, private paymentService: PaymentService, private stripeService: StripeService) { }

    ngOnInit() {
        this.getUser()
    }

    getPaymentIntent(card) {
        if (this.amount == null) {
            alert("Please enter amount..")
        }
        else {
            this.disabled = true
            console.log(card.element);

            this.payment.amount = this.amount
            this.payment.method = 'Card'
            this.payment.user = this.user
            this.paymentService.getPaymentIntent(this.payment).subscribe(data => {
                this.stripeService
                    .confirmCardPayment(data.clientSecret, {
                        payment_method: {
                            card: card.element,
                            billing_details: {
                                name: this.user.userName.toString(),
                            },
                        },
                    })
                    .subscribe((result) => {
                        if (result.error) {
                            this.payment.amount = this.amount
                            this.payment.method = 'Card'
                            this.payment.user = this.user
                            this.payment.status = 'Failed'
                            this.paymentService.createPayment(this.payment).subscribe(data => {
                                this.show()
                                this.disabled = false
                                this.router.navigate(['/unsuccess'])
                            }, error => {
                                console.log(error);
                                this.router.navigate(['/error'])
                            })
                        }
                        else {
                            this.payment.status = 'Successful'
                            this.payment.method = 'Card'
                            this.paymentService.createPayment(this.payment).subscribe(data => {
                                this.show()
                                alert('Payment done successfully..')
                                this.disabled = false
                                this.router.navigate(['/success'])
                            }, error => {
                                console.log(error);
                                this.router.navigate(['/error'])
                            })
                        }

                    });
            }, error => {
                this.payment.amount = this.amount
                this.payment.method = 'Card'
                this.payment.user = this.user
                this.payment.status = 'Failed'
                this.paymentService.createPayment(this.payment).subscribe(data => {
                    this.show()
                    console.log(error);
                    this.disabled = false
                    this.router.navigate(['/unsuccess'])
                }, error => {
                    console.log(error);
                    this.router.navigate(['/error'])
                })

            })
        }

    }

    show() {
        this.showForm = !this.showForm
        this.amount = null
    }

    getUser() {
        this.userService.getAuthenticatedUser().subscribe(data => {
            this.user = data
            this.getPayments()
        })
    }

    getPayments() {
        this.paymentService.getPaymentsByUser(this.user._id).subscribe(data => {
            this.payments = data
            if (this.payments.length == 0)
                this.showTable = false
            else
                this.showTable = true
        })
    }
}
