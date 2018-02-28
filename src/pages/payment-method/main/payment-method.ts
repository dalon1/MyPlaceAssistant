import { Component } from "@angular/core";
import { PaymentMethodManager } from "../../../providers/data-service/payment-method-service";
import { ViewController } from "ionic-angular/navigation/view-controller";
import { IPaymentMethod } from "../../../models/payment/IPaymentMethod";
import { AuthService } from "../../../providers/auth-service/auth-service";

@Component({
    selector: 'payment-method-page',
    templateUrl: 'payment-method.html'
})
export class PaymentMethodPage {
    paymentMethods: Array<PaymentMethodModel>;

    constructor(
        private paymentMethodManager: PaymentMethodManager,
        private viewController: ViewController,
        private authManager: AuthService
    ) {}

    ngOnInit() {
        this.paymentMethods = this.loadPaymentMethods();
        console.log(this.paymentMethods);
    }

    dismiss() {
        this.viewController.dismiss();
    }

    loadPaymentMethods() : Array<PaymentMethodModel> {
        let paymentMethods : Array<PaymentMethodModel> = new Array<PaymentMethodModel>();
        this.paymentMethodManager.getPaymentMethods(this.authManager.afAuth.auth.currentUser.uid).subscribe((data: Array<IPaymentMethod>) => {
            data.forEach((paymentMethod: IPaymentMethod) => {
                paymentMethods.push(new PaymentMethodModel(paymentMethod));
            });
        });
        return paymentMethods;
    }
}

class PaymentMethodModel {
    constructor(public paymentMethod : IPaymentMethod) {}
}

