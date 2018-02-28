import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { LocalSession } from '../../../providers/session/local-session';

@Component({
    selector: 'payment-method-select',
    templateUrl: 'payment-method-select.html'
})
export class PaymentMethodSelectPage {
    constructor(
        private navController: NavController,
        private localSession: LocalSession
    ) {}
    
    selectPayment() {
        this.localSession.setSelectedPayment('test 1010');
        this.navController.pop();
    }
}