import { Component } from '@angular/core';
import { LocalSession } from '../../../providers/session/local-session';
import { ITransaction } from '../../../models/payment/ITransaction';
import { TransactionManager } from '../../../providers/data-service/transaction-service';
import { AuthService } from '../../../providers/auth-service/auth-service';
import { Observable } from 'rxjs/Observable';
import { IPlace } from '../../../models/place/IPlace';
import { IUser } from '../../../models/IUser';
import { IPaymentMethod } from '../../../models/payment/IPaymentMethod';

@Component({
    selector: 'transaction-details',
    templateUrl: 'transaction-details.html'
})
export class TransactionDetailsPage {
    transaction1 : TransactionDetailsModel;
    transaction2: ITransaction;
    transaction: Observable<ITransaction>;
    constructor(
        private localSession: LocalSession,
        private transactionManager: TransactionManager,
        private authService: AuthService
    ) {}

    ngOnInit() {
        if (typeof this.localSession.getTransactionId() != 'undefined') {
            console.log(this.localSession.getTransactionId());
            this.transaction = this.transactionManager.getTransactionById(this.authService.afAuth.auth.currentUser.uid, this.localSession.getTransactionId());
            this.transaction1 = this.loadSingleTransaction(this.localSession.getTransactionId())[0];
            console.log(this.transaction1);
            console.log(this.transaction2);
        }
    }

    loadSingleTransaction(id: string) : TransactionDetailsModel[] {
        let transactions : Array<TransactionDetailsModel> = new Array<TransactionDetailsModel>();
        let data = this.transactionManager.getTransactionById(this.authService.afAuth.auth.currentUser.uid, id).subscribe((data : ITransaction) => {
            // this is not returning all
            this.transaction2 = data;
            console.log(data);
            transactions.push(new TransactionDetailsModel(data, null, null, null));
        });
        return transactions;
    }
}

class TransactionDetailsModel {
    constructor(
        public transaction: ITransaction,
        public user: IUser,
        public paymentMethod: IPaymentMethod,
        public place: IPlace
    ) {}    
}