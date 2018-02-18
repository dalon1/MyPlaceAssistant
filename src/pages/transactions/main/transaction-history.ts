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

    }

    loadTransactionHistory() : Array<TransactionModel> {
        let transactionHistory : Array<TransactionModel> = new Array<TransactionModel>();
        this.transactionManager.getTransactionHistory(null).subscribe((data: Array<ITransaction>)=> {

        });
        return null;
    }
}

class TransactionModel {
    constructor(
        public transaction : ITransaction,
        public user: IUser,
        public place: IPlace
    ){}
}