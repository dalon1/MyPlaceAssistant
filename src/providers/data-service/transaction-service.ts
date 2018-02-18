import { Injectable } from "@angular/core";
import { AngularFirestore } from "angularfire2/firestore";
import { AuthService } from "../auth-service/auth-service";
import { Observable } from "rxjs/Observable";

@Injectable()
export class TransactionManager {
    constructor(
        private angularFireStore: AngularFirestore,
        private authService: AuthService
    ) {}

    getTransactionHistory(userId: string ) : Observable<any[]> {
        return this.angularFireStore.collection<any>('transaction-history').valueChanges();
    }

    getTransactionById(userId: string, transactionId: string) : Observable<any> { 
        return this.angularFireStore.collection<any>('transaction-history').doc(transactionId).valueChanges();
    }
    addTransaction(transaction: any) : string { return null; }
    cancelTransaction(transactionId: string) : void {}

}