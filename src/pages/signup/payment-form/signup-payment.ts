import { Component } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { LocalSession } from "../../../providers/session/local-session";
import { AuthService } from "../../../providers/auth-service/auth-service";
import { NavController, Loading, AlertController, LoadingController, IonicPageModule } from "ionic-angular";
import { TabsPage } from "../../tabs/tabs";
import { PaymentMethodManager } from "../../../providers/data-service/payment-method-service";
import { SignUpModel } from "../../../models/form-models/SignUpModel";
import { IPaymentMethod } from "../../../models/payment/IPaymentMethod";

@Component({
    selector: 'signup-payment',
    templateUrl: 'signup-payment.html'
})
export class SignUpPaymentFormPage {
    paymentMethodForm: FormGroup;
    signUpModel: SignUpModel;
    loading: Loading; 

    constructor(
        private formBuilder: FormBuilder,
        private localSession: LocalSession,
        private authData: AuthService,
        private navController: NavController,
        private alertController: AlertController,
        private loadingController: LoadingController,
        private paymentMethodManager: PaymentMethodManager
    ) {}

    ngOnInit() {
        if (typeof this.localSession.getSignUpModel() != 'undefined') {
            this.signUpModel = this.localSession.getSignUpModel();
        }
        this.paymentMethodForm = this.formBuilder.group({
            // control - payment type
            paymentType: this.formBuilder.control('Card'),
            // control - card number 
            cardNumber: this.formBuilder.control('', Validators.required),
            // control 
            cardHolderName: this.formBuilder.control('', Validators.required),
            // control - expirationDate
            expirationDate: this.formBuilder.control('', Validators.required),
            // control - code
            code: this.formBuilder.control('', Validators.required)
        });
    }

    addPaymentMethod(paymentMethod: IPaymentMethod) {
        this.localSession.setSignUpModel(new SignUpModel(this.signUpModel.user, this.signUpModel.password, this.signUpModel.place, paymentMethod));
        console.log(this.localSession.getSignUpModel());
        this.signUpUserFullInfo(this.localSession.getSignUpModel());
    }

    signUpUserFullInfo(model: SignUpModel) {
        this.authData.signUpUser(model.user, model.password)
        .then((user) => {
            this.paymentMethodManager.addPaymentMethod(model.paymentMethod);
            this.navController.setRoot(TabsPage);
        }, (error) => {
          this.loading.dismiss().then(() => {
            var errorMessage: string = error.message;
            let alert = this.alertController.create({
              message: errorMessage,
              buttons: [
                {
                  text: "Ok",
                  role: 'cancel'
                }
              ]
            });
            alert.present();
          });
        });

      this.loading = this.loadingController.create({
        dismissOnPageChange: true,
      });
      this.loading.present();
    }
}