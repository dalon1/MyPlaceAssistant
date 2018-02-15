import { Injectable } from "@angular/core";
import { AngularFirestore } from "angularfire2/firestore";
import { AuthService } from "../auth-service/auth-service";
import { Observable } from "rxjs/Observable";

@Injectable()
export class PaymentMethodManager {
    constructor(
        private angularFireStore: AngularFirestore,
        private authService: AuthService
    ) {}

    getPaymentMethods() : Observable<any[]> { return null; }
    getPaymentMethodById(id : string) : Observable<any> { return null; }
    addPaymentMethod() : string { return null; }
    updatePaymentMethod(id : string) : Observable<any> { return null; }
    deletePaymentMethod(id : string ) : void {}
}