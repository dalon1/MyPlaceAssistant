import { Component } from "@angular/core";
import { PaymentMethodManager } from "../../../providers/data-service/payment-method-service";
import { NavController, App } from 'ionic-angular';
import { ViewController } from "ionic-angular/navigation/view-controller";
import { IPaymentMethod } from "../../../models/payment/IPaymentMethod";
import { AuthService } from "../../../providers/auth-service/auth-service";
import { PaymentMethodFormPage } from '../form/payment-method-form';

@Component({
    selector: 'payment-method-page',
    templateUrl: 'payment-method.html'
})
export class PaymentMethodPage {
    paymentMethodModels: Array<PaymentMethodModel>;

    constructor(
        private paymentMethodManager: PaymentMethodManager,
        private viewController: ViewController,
        private authManager: AuthService,
        private app: App
    ) {}

    ngOnInit() {
        this.paymentMethodModels = this.loadPaymentMethods();
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

    addPaymentMethod() {
        this.app.getRootNav().push(PaymentMethodFormPage);
    }
}

class PaymentMethodModel {
    constructor(public paymentMethod : IPaymentMethod) {}
}

