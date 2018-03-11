import { Component } from "@angular/core";
import { ITransaction } from "../../../models/payment/ITransaction";
import { IUser } from "../../../models/IUser";
import { AuthService } from '../../../providers/auth-service/auth-service';
import { IPlace } from "../../../models/place/IPlace";
import { NavController, App } from "ionic-angular";
import { TransactionManager } from "../../../providers/data-service/transaction-service";
import { LocalSession } from "../../../providers/session/local-session";
import { TransactionDetailsPage } from "../details/transaction-details";
import { TransactionFormPage } from "../form/transaction-form";
import { PaymentMethodManager } from "../../../providers/data-service/payment-method-service";
import { IPaymentMethod } from "../../../models/payment/IPaymentMethod";
import { PlaceManager } from "../../../providers/data-service/place-service";

@Component({
    selector: 'transaction-history',
    templateUrl: 'transaction-history.html'
})
export class TransactionHistoryPage {
    transactionHistory: Array<TransactionModel>;

    constructor(
        private app: App,
        private navController: NavController,
        private transactionManager: TransactionManager,
        private paymentMethodManager: PaymentMethodManager,
        private authManager: AuthService,
        private placeManager: PlaceManager,
        private localSession: LocalSession
    ) {}
    
    ngOnInit() {
        this.transactionHistory = this.loadTransactionHistory();
        console.log(this.transactionHistory);
    }

    

    loadTransactionHistory() : Array<TransactionModel> {
        let transactionHistory : Array<TransactionModel> = new Array<TransactionModel>();
        this.transactionManager.getTransactionHistory(this.authManager.afAuth.auth.currentUser.uid).subscribe((data: Array<ITransaction>)=> {
            data.forEach((transaction : ITransaction) => {
                let user: IUser  = null;
                let place = this.placeManager.getPlaceById(transaction.country, transaction.placeId).subscribe((place : IPlace) => {
                    place.unit = transaction.unit;
                    let paymentMethod = this.paymentMethodManager.getPaymentMethodById(this.authManager.afAuth.auth.currentUser.uid, transaction.paymentMethodId).subscribe((paymentMethod: IPaymentMethod) => {
                        transactionHistory.push(new TransactionModel(transaction, user, place, paymentMethod));
                    });
                });
            });
        });
        return transactionHistory;
    }

    getDetails(model: TransactionModel) {
        this.localSession.setTransactionModel(model);
        this.app.getRootNav().push(TransactionDetailsPage);
    }

    addTransaction() {
        this.app.getRootNav().push(TransactionFormPage);
    }
}

class TransactionModel {
    constructor(
        public transaction : ITransaction,
        public user: IUser,
        public place: IPlace,
        public paymentMethod: IPaymentMethod
    ){}
}