import { Component } from "@angular/core";
import { FormGroup, FormBuilder } from "@angular/forms";
import { LocalSession } from "../../../providers/session/local-session";
import { SignUpModel } from "../../../models/form-models/SignUpModel";
import { App } from "ionic-angular";
import { SignUpPaymentFormPage } from "../payment-form/signup-payment";
import { IPlace } from "../../../models/place/IPlace";

@Component({
    selector: 'signup-place',
    templateUrl: 'signup-place.html'
})
export class SignUpPlaceFormPage {
    placeForm: FormGroup;
    signUpModel: SignUpModel;

    constructor(
        private app: App,
        private formBuilder: FormBuilder,
        private localSession: LocalSession,
    ) {}

    ngOnInit() {
        if (typeof this.localSession.getSignUpModel() != 'undefined') {
            this.signUpModel = this.localSession.getSignUpModel();
        }    
    }

    addPlace() {
        let place: IPlace  = {
            id : '1000', 
            name : 'Random',
            location: null
        }
        this.localSession.setSignUpModel(new SignUpModel(this.signUpModel.user, this.signUpModel.password, place, this.signUpModel.paymentMethod));
        console.log(this.localSession.getSignUpModel());
        this.app.getRootNav().push(SignUpPaymentFormPage);
    }
}