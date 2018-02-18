import { Injectable } from "@angular/core";
import { AngularFirestore } from "angularfire2/firestore";
import { AuthService } from "../auth-service/auth-service";
import { Observable } from "rxjs/Observable";
import { ITransaction } from "../../models/payment/ITransaction";

@Injectable()
export class TransactionManager {
    constructor(
        private angularFireStore: AngularFirestore,
        private authService: AuthService
    ) {}

    getTransactionHistory(userId: string ) : Observable<ITransaction[]> {
        return this.angularFireStore.collection<any>('transaction-history').doc(userId).collection<ITransaction>('transactions').valueChanges();
    }

    getTransactionById(userId: string, transactionId: string) : Observable<ITransaction> { 
        //return this.angularFireStore.collection<any>('transaction-history').doc(userId).collection<ITransaction>('transactions').doc<ITransaction>(transactionId).valueChanges();
        return null;
    }
    addTransaction(transaction: any) : string { return null; }
    cancelTransaction(transactionId: string) : void {}

}