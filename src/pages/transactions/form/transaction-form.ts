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
import { IPlace } from '../../../models/place/IPlace';
import { PlaceManager } from '../../../providers/data-service/place-service';



@Component({
    selector: 'transaction-form',
    templateUrl: 'transaction-form.html'
})
export class TransactionFormPage {
    transactionForm : FormGroup;
    transactionTypes = TransactionType;
    // Payment Methods Fields >>
    paymentMethodsBackup : Array<IPaymentMethod>;
    paymentMethods : Array<IPaymentMethod>;
    paymentMethodSelected : IPaymentMethod;
    // My Places Fields >>
    myPlacesBackup: Array<IPlace>;
    myPlaces: Array<IPlace>;
    myPlaceSelected : IPlace;

    constructor(
        private formBuilder: FormBuilder,
        private transactionManager: TransactionManager,
        private app:App,
        private localSession: LocalSession,
        private paymentMethodManager: PaymentMethodManager,
        private placeManager: PlaceManager,
        private authManager: AuthService,
        private alertController: AlertController,
        private navController: NavController
    ) {}


    ngOnInit() {
        this.paymentMethodsBackup = this.loadPaymentMethods();
        this.paymentMethods = this.paymentMethodsBackup;
        this.myPlacesBackup = this.loadMyPlaces();
        this.myPlaces = this.myPlacesBackup;
        this.transactionForm = this.formBuilder.group({
            // control - amount
            amount: this.formBuilder.control('', Validators.required),
            // control - currency
            currency: this.formBuilder.control('USD'),
            // control - payment method id
            paymentMethod: this.formBuilder.control('', Validators.required),
            // control - place - id
            place: this.formBuilder.control('', Validators.required),
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

    loadMyPlaces() : Array<IPlace> {
        let places : Array<IPlace> = new Array<IPlace>();
        this.placeManager.getPlacesByUser(this.authManager.afAuth.auth.currentUser.uid).subscribe((data : any) => {
            data.forEach((myplace : any) => {
                this.placeManager.getPlaceById(myplace.country, myplace.placeId).subscribe((place : IPlace) => {
                    place.unit = myplace.unit;
                    places.push(place);
                });
            });
        });
        return places;
    }

    sendTransactionVerification(transactionForm: any) {
        let alert = this.alertController.create({
            title: 'Sending Transaction',
            subTitle: 'Please, confirm transaction\'s details',
            // this part force to do some mapping if i wanna display the payment method details and not the actual id.
            message: `Are you sure want to send $${transactionForm.amount } ${transactionForm.currency} to ${transactionForm.place.name}, ${transactionForm.place.unit} 
            using your ${transactionForm.paymentMethod.issuingNetwork} ending with 
            ${transactionForm.paymentMethod.cardNumber.slice(transactionForm.paymentMethod.cardNumber.length - 5, transactionForm.paymentMethod.cardNumber.length -1)}?`,
            buttons: [
                {
                    text: 'Cancel',
                    role: 'cancel',
                    handler: ()=> {} 
                },
                {
                    text: 'Yes',
                    handler: () => {
                        let transaction : ITransaction = {
                            id: null, 
                            referenceNumber: null,
                            userId: null,
                            placeId: transactionForm.place.id,
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

    selectPaymentMethod(payment : IPaymentMethod) {
        this.paymentMethodSelected = payment;
        this.paymentMethods = new Array<IPaymentMethod>(); // empty again
    }

    unselectPaymentMethod() {
        this.paymentMethodSelected = undefined;
        this.paymentMethods = this.paymentMethodsBackup;
    }

    selectPayee(place : IPlace) {
        this.myPlaceSelected = place;
        this.myPlaces = new Array<IPlace>(); // empty again
    }
    unselectPayee() {
        this.myPlaceSelected = undefined;
        this.myPlaces = this.myPlacesBackup;
    }
}