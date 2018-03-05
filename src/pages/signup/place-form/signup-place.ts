import { Component } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { LocalSession } from "../../../providers/session/local-session";
import { SignUpModel } from "../../../models/form-models/SignUpModel";
import { App } from "ionic-angular";
import { SignUpPaymentFormPage } from "../payment-form/signup-payment";
import { IPlace } from "../../../models/place/IPlace";
import { PlaceManager } from "../../../providers/data-service/place-service";

@Component({
    selector: 'signup-place',
    templateUrl: 'signup-place.html'
})
export class SignUpPlaceFormPage {
    placeForm: FormGroup;
    signUpModel: SignUpModel;
    backUpCall: Array<PlaceModel>
    placeModels: Array<PlaceModel>;
    placeSelected: PlaceModel;

    constructor(
        private app: App,
        private formBuilder: FormBuilder,
        private localSession: LocalSession,
        private placeManager: PlaceManager
    ) {}

    ngOnInit() {
        if (typeof this.localSession.getSignUpModel() != 'undefined') {
            this.signUpModel = this.localSession.getSignUpModel();
            this.backUpCall = this.loadPlaces(this.signUpModel.user.country.toUpperCase());
            this.placeModels = this.backUpCall;
        }
        this.placeForm = this.formBuilder.group({
            id: this.formBuilder.control('', Validators.required),
            unit: this.formBuilder.control('', Validators.required)
        });   
    }

    loadPlaces(country : string) : Array<PlaceModel> {
        let placesByCountry : Array<PlaceModel> = new Array<PlaceModel>();
        this.placeManager.getPlaces(country).subscribe((data: Array<IPlace>) => {
            data.forEach((place: IPlace) => {
                console.log(place);
                placesByCountry.push(new PlaceModel(place));
            });
        });
        return placesByCountry;
    }

    addPlace(place : IPlace) {   
        this.localSession.setSignUpModel(new SignUpModel(this.signUpModel.user, this.signUpModel.password, place, this.signUpModel.paymentMethod));
        console.log(this.localSession.getSignUpModel());
        this.app.getRootNav().push(SignUpPaymentFormPage);
    }

    selectPlace(model: PlaceModel) {
        this.placeSelected = model;
        this.placeModels = new Array<PlaceModel>(); // empty again
        // setting up the id in the input form.
        //(<HTMLInputElement>document.getElementById('inputPlaceId')).value = model.place.id;
    }

    unselectPlace() {
        this.placeSelected = undefined;
        this.placeModels = this.backUpCall
        console.log(this.placeSelected);
        console.log(this.placeModels);
    }
}

class PlaceModel {
    constructor(public place : IPlace) {}
}