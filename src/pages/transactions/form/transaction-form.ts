import { Component } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { ITransaction } from '../../../models/payment/ITransaction';
import { TransactionManager } from '../../../providers/data-service/transaction-service';
import { App } from 'ionic-angular/components/app/app';
import { PaymentMethodSelectPage } from '../../payment-method/select/payment-method-select';
import { MyPlaceSelectPage } from '../../myplace/select/myplace-select';
import { TransactionType } from '../../../models/payment/TransactionType';
import { LocalSession } from '../../../providers/session/local-session';



@Component({
    selector: 'transaction-form',
    templateUrl: 'transaction-form.html'
})
export class TransactionFormPage {
    transactionForm : FormGroup;
    transactionTypes = TransactionType;
    selectedPayment: string;
    selectedPayee: string;

    constructor(
        private formBuilder: FormBuilder,
        private transactionManager: TransactionManager,
        private app:App,
        private localSession: LocalSession
    ) {}


    ngOnInit() {
        this.transactionForm = this.formBuilder.group({
            // control - amount
            amount: this.formBuilder.control('', Validators.required),
            // control - currency
            currency: this.formBuilder.control('USD'),
            // control - payment method id
            paymentMethodId: this.formBuilder.control(''),
            // control - place - id
            placeId: this.formBuilder.control(''),
            // control - transaction type
            transactionType: this.formBuilder.control('', Validators.required),
            // control - memo
            memo: this.formBuilder.control('')
        });
        console.log(this.localSession.getSelectedPayment());
    }

    ngOnDestroy() {
        console.log('This view has been destroyed!');
    }

    sendTransaction(transaction : ITransaction) {
        //this.transactionManager.addTransaction(transaction);
        console.log(transaction);
    }

    selectPayment() {
        this.localSession.setSelectedPayment(undefined);
        this.app.getRootNav().push(PaymentMethodSelectPage);
    }
    selectPayee() {
        this.app.getRootNav().push(MyPlaceSelectPage);
    }


}