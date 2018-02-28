import { Component } from '@angular/core';
import { LocalSession } from '../../../providers/session/local-session';
import { ITransaction } from '../../../models/payment/ITransaction';
import { TransactionManager } from '../../../providers/data-service/transaction-service';
import { AuthService } from '../../../providers/auth-service/auth-service';
import { Observable } from 'rxjs/Observable';

@Component({
    selector: 'transaction-details',
    templateUrl: 'transaction-details.html'
})
export class TransactionDetailsPage {
    //transaction : TransactionDetailsModel;
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
            this.loadSingleTransaction(this.localSession.getTransactionId());
        }
    }

    loadSingleTransaction(id: string) : TransactionDetailsModel {
        this.transactionManager.getTransactionById(this.authService.afAuth.auth.currentUser.uid, id).subscribe((data : ITransaction) => {
            // this is not returning all
            return new TransactionDetailsModel(data);
        });
        return null;
    }
}

class TransactionDetailsModel {
    constructor(public transaction: ITransaction) {}    
}