import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NavController, AlertController } from 'ionic-angular';
import { LocalSession } from '../../../providers/session/local-session';
import { IPaymentMethod } from '../../../models/payment/IPaymentMethod';
import { PaymentMethodManager } from '../../../providers/data-service/payment-method-service';

@Component({
    selector: 'payment-method-form',
    templateUrl: 'payment-method-form.html'
})
export class PaymentMethodFormPage {
    
    paymentMethodForm: FormGroup;
    
    constructor(
        private formBuilder: FormBuilder,
        private localSession: LocalSession,
        private navController: NavController,
        private paymentMethodManager: PaymentMethodManager,
        private alertController: AlertController
    ) {}

    ngOnInit() {
        this.paymentMethodForm = this.formBuilder.group({
            // control - payment type
            paymentType: this.formBuilder.control('Card'),
            // control - card number 
            cardNumber: this.formBuilder.control('', Validators.required),
            // control 
            cardHolderName: this.formBuilder.control('', Validators.required),
            // control - expirationDate
            expirationDate: this.formBuilder.control('', Validators.required),
            // control - code
            code: this.formBuilder.control('', Validators.required)
        });
    }

    addPaymentMethodVerification() {
        let alert = this.alertController.create({
            title: 'New Payment Method',
            subTitle: 'Adding payment method of type CARD',
            message: 'Feature will be implemented in the upcoming software releases.',
            buttons: ['Ok']
        })
        alert.present();
    }

    addPaymentMethod(paymentMethod: IPaymentMethod) {
        console.log(paymentMethod);
        this.paymentMethodManager.addPaymentMethod(paymentMethod);
        this.navController.pop();
    }
}
