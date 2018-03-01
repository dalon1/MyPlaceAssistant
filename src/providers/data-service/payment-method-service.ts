import { Injectable } from "@angular/core";
import { AngularFirestore } from "angularfire2/firestore";
import { AuthService } from "../auth-service/auth-service";
import { Observable } from "rxjs/Observable";
import { IPaymentMethod } from '../../models/payment/IPaymentMethod';

@Injectable()
export class PaymentMethodManager {
    constructor(
        private angularFireStore: AngularFirestore,
        private authService: AuthService
    ) {}

    getPaymentMethods(userId: string) : Observable<IPaymentMethod[]> { 
        return this.angularFireStore.collection<any>('payment-methods').doc(userId).collection<IPaymentMethod>('payments').valueChanges();; 
    }

    getPaymentMethodById(userId: string, paymentMethodId: string) : Observable<IPaymentMethod> { 
        return this.angularFireStore.doc<IPaymentMethod>(`payment-methods/${userId}/payments/${paymentMethodId}`).valueChanges();
    }
    
    addPaymentMethod(paymentMethod: IPaymentMethod) : string { 
        paymentMethod.id = this.angularFireStore.createId();
        paymentMethod.userId = this.authService.afAuth.auth.currentUser.uid;
        paymentMethod.issuingNetwork = this.getIssuingNetwork(paymentMethod.cardNumber);
        this.angularFireStore.collection('payment-methods').doc(paymentMethod.userId).collection('payments')
        .doc(paymentMethod.id).set(paymentMethod).then(() => console.log('Payment Method Added!')).catch(() => console.log('Payment Method Failed!'));
        return paymentMethod.id; 
    }
    updatePaymentMethod(id : string) : Observable<any> { return null; }
    deletePaymentMethod(id : string ) : void {}

    private getIssuingNetwork(cardNumber: string) : string {
        let firstNum : string = cardNumber.charAt(0);
        switch(firstNum) {
            case "4":
                return 'Visa';
            case "5":
                return 'Mastercard';
            default:
                return 'Undefined';
        }
    }
}