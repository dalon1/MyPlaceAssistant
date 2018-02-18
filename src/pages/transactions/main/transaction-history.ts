import { Component } from "@angular/core";
import { ITransaction } from "../../../models/payment/ITransaction";
import { IUser } from "../../../models/IUser";
import { AuthService } from '../../../providers/auth-service/auth-service';
import { IPlace } from "../../../models/place/IPlace";
import { NavController } from "ionic-angular/navigation/nav-controller";
import { TransactionManager } from "../../../providers/data-service/transaction-service";
import { LocalSession } from "../../../providers/session/local-session";

@Component({
    selector: 'transaction-history',
    templateUrl: 'transaction-history.html'
})
export class TransactionHistoryPage {
    transactionHistory: Array<TransactionModel>;

    constructor(
        private navController: NavController,
        private transactionManager: TransactionManager,
        private authManager: AuthService,
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
                let place: IPlace = null;
                transactionHistory.push(new TransactionModel(transaction, user, place));
            });
        });
        return transactionHistory;
    }
}

class TransactionModel {
    constructor(
        public transaction : ITransaction,
        public user: IUser,
        public place: IPlace
    ){}
}