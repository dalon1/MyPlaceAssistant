import { Component } from "@angular/core";
import { PaymentMethodManager } from "../../providers/data-service/payment-method-service";
import { ViewController } from "ionic-angular/navigation/view-controller";

@Component({
    selector: 'payment-method-page',
    templateUrl: 'payment-method.html'
})
export class PaymentMethodPage {
    constructor(
        private paymentMethodManager: PaymentMethodManager,
        private viewController: ViewController
    ) {}

    ngOnInit() {

    }

    dismiss() {
        this.viewController.dismiss();
    }
}