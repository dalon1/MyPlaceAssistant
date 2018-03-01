import { Component } from '@angular/core';
import { LocalSession } from '../../../providers/session/local-session';
import { ITransaction } from '../../../models/payment/ITransaction';
import { TransactionManager } from '../../../providers/data-service/transaction-service';
import { AuthService } from '../../../providers/auth-service/auth-service';
import { Observable } from 'rxjs/Observable';
import { IPlace } from '../../../models/place/IPlace';
import { IUser } from '../../../models/IUser';
import { IPaymentMethod } from '../../../models/payment/IPaymentMethod';
import { TransactionModel } from '../../../models/view-models/TransactionModel';

@Component({
    selector: 'transaction-details',
    templateUrl: 'transaction-details.html'
})
export class TransactionDetailsPage {
    transactionModel: TransactionModel;
    constructor(
        private localSession: LocalSession,
        private transactionManager: TransactionManager,
        private authService: AuthService
    ) {}

    ngOnInit() {
        if (typeof this.localSession.getTransactionModel() != 'undefined') {
            console.log(this.localSession.getTransactionModel());
            this.transactionModel = this.localSession.getTransactionModel();
        }
    }
}
