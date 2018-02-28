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
    
    addPaymentMethod() : string { return null; }
    updatePaymentMethod(id : string) : Observable<any> { return null; }
    deletePaymentMethod(id : string ) : void {}
}