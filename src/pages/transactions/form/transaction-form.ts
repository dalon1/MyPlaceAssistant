import { Component } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { ITransaction } from '../../../models/payment/ITransaction';
import { TransactionManager } from '../../../providers/data-service/transaction-service';
import { App } from 'ionic-angular/components/app/app';
import { PaymentMethodSelectPage } from '../../payment-method/select/payment-method-select';
import { MyPlaceSelectPage } from '../../myplace/select/myplace-select';
import { TransactionType } from '../../../models/payment/TransactionType';
import { LocalSession } from '../../../providers/session/local-session';
import { IPaymentMethod } from '../../../models/payment/IPaymentMethod';
import { PaymentMethodManager } from '../../../providers/data-service/payment-method-service';
import { AuthService } from '../../../providers/auth-service/auth-service';
import { AlertController, NavController } from 'ionic-angular';



@Component({
    selector: 'transaction-form',
    templateUrl: 'transaction-form.html'
})
export class TransactionFormPage {
    transactionForm : FormGroup;
    transactionTypes = TransactionType;
    paymentMethods : Array<IPaymentMethod>;
    selectedPayment: string;
    selectedPayee: string;

    constructor(
        private formBuilder: FormBuilder,
        private transactionManager: TransactionManager,
        private app:App,
        private localSession: LocalSession,
        private paymentMethodManager: PaymentMethodManager,
        private authManager: AuthService,
        private alertController: AlertController,
        private navController: NavController
    ) {}


    ngOnInit() {
        this.paymentMethods = this.loadPaymentMethods();
        this.transactionForm = this.formBuilder.group({
            // control - amount
            amount: this.formBuilder.control('', Validators.required),
            // control - currency
            currency: this.formBuilder.control('USD'),
            // control - payment method id
            paymentMethod: this.formBuilder.control('', Validators.required),
            // control - place - id
            placeId: this.formBuilder.control(''),
            // control - transaction type
            transactionType: this.formBuilder.control('', Validators.required),
            // control - memo
            memo: this.formBuilder.control('')
        });
    }

    ngOnDestroy() {
        console.log('This view has been destroyed!');
    }

    loadPaymentMethods() : Array<IPaymentMethod> {
        let paymentMethods : Array<IPaymentMethod> = new Array<IPaymentMethod>();
        this.paymentMethodManager.getPaymentMethods(this.authManager.afAuth.auth.currentUser.uid).subscribe((data: Array<IPaymentMethod>) => {
            data.forEach((paymentMethod: IPaymentMethod) => {
                paymentMethods.push(paymentMethod);
            });
        });
        return paymentMethods;
    }

    sendTransactionVerification(transactionForm: any) {
        let alert = this.alertController.create({
            title: 'Sending Transaction',
            subTitle: 'Please, confirm transaction\'s details',
            // this part force to do some mapping if i wanna display the payment method details and not the actual id.
            message: `Are you sure want to send $${transactionForm.amount } ${transactionForm.currency} to ${transactionForm.placeId} 
            using your ${transactionForm.paymentMethod.issuingNetwork} ending with ${transactionForm.paymentMethod.cardNumber}?`,
            buttons: [
                {
                    text: 'Yes',
                    role: 'cancel',
                    handler: () => {
                        let transaction : ITransaction = {
                            id: null, 
                            referenceNumber: null,
                            userId: null,
                            placeId: null,
                            createdAt: null,
                            amount: transactionForm.amount as number,
                            currency: transactionForm.currency,
                            transactionType: transactionForm.transactionType,
                            // This part is the reason to do the mapping before sending it to firebase (Same will happen with place ID) >>
                            paymentMethodId: transactionForm.paymentMethod.id,
                            memo: transactionForm.memo
                        };
                        this.sendTransaction(transaction as ITransaction);
                    }
                },
                {
                    text: 'Cancel',
                    role: 'cancel',
                    handler: ()=> {} 
                }
            ]
        })
        alert.present();
    }

    sendTransaction(transaction : ITransaction) {
        this.transactionManager.addTransaction(transaction);
        console.log(transaction);
        this.navController.pop();
    }

    selectPayment() {
        this.localSession.setSelectedPayment(undefined);
        this.app.getRootNav().push(PaymentMethodSelectPage);
    }
    selectPayee() {
        this.app.getRootNav().push(MyPlaceSelectPage);
    }


}