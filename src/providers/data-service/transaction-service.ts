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
        return this.angularFireStore.doc<ITransaction>(`transaction-history/${userId}/transactions/${transactionId}`).valueChanges();
        /*return this.angularFireStore.collection<any>('transaction-history').m,,gr.ehjkfjkwdhsVIPhu
        return this.angularFireStore.collection<any>('transaction-history').doc(userId)
        .collection<ITransaction>('transactions').doc(transactionId).valueChanges();*/
    }

    addTransaction(transaction: ITransaction) : string { 
        transaction.createdAt = new Date();
        transaction.userId = this.authService.afAuth.auth.currentUser.uid;
        transaction.id = this.angularFireStore.createId();
        transaction.referenceNumber = transaction.id;
        this.angularFireStore.collection('transaction-history').doc(transaction.userId).collection('transactions')
        .doc(transaction.id).set(transaction).then(() => console.log('Transaction Uploaded!')).catch(()=> console.log('Transaction Failed!'));
        return transaction.id; 
    }
    cancelTransaction(transactionId: string) : void {}

}