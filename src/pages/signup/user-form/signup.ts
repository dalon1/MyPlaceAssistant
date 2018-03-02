import { Component } from '@angular/core';
import {
  IonicPage,
  NavController,
  LoadingController,
  Loading,
  AlertController,
  App
} from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../../providers/auth-service/auth-service';
import { EmailValidator } from '../../../utils/validators/email';
import { TabsPage } from '../../tabs/tabs';
import { Role } from '../../../models/Role';
import { ICountry } from '../../../models/ICountry';
import { Observable } from 'rxjs/Observable';
import { CountryManager } from '../../../providers/data-service/country-service';
import { LocalSession } from '../../../providers/session/local-session';
import { SignUpModel } from '../../../models/form-models/SignUpModel';
import { IUser } from '../../../models/IUser';
import { SignUpPlaceFormPage } from '../place-form/signup-place';



@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html',
})
export class Signup {
  public signupForm: FormGroup;
  public loading: Loading;
  countries: Observable<ICountry[]>

  constructor(
    public nav: NavController,
    private app: App, 
    public authData: AuthService,
    public formBuilder: FormBuilder, 
    public loadingCtrl: LoadingController,
    public alertCtrl: AlertController,
    private countryManager: CountryManager,
    private localSession: LocalSession  
  ) {}

  ngOnInit() {
    this.countries = this.countryManager.getAllCountries();
    this.signupForm = this.formBuilder.group({
      email: ['', Validators.compose([Validators.required, EmailValidator.isValid])],
      password: ['', Validators.compose([Validators.minLength(6), Validators.required])],
      name: ['', Validators.compose([Validators.minLength(6), Validators.required])],
      country: ['', Validators.required]
    });
  }
  /**
   * If the form is valid it will call the AuthData service to sign the user up password displaying a loading
   *  component while the user waits.
   *
   * If the form is invalid it will just log the form value, feel free to handle that as you like.
   */
  // No Longer applicable!!!!!!!!
  signupUser() {
    if (!this.signupForm.valid) {
      console.log(this.signupForm.value);
    } else {
      this.authData.signUpUser(null, null)
        .then((user) => {
          this.nav.setRoot(TabsPage);
        }, (error) => {
          this.loading.dismiss().then(() => {
            var errorMessage: string = error.message;
            let alert = this.alertCtrl.create({
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

      this.loading = this.loadingCtrl.create({
        dismissOnPageChange: true,
      });
      this.loading.present();
    }
  }

  signUpUserInfo(userForm: any) {
    let user : IUser = {
      id: null,
      name: userForm.name,
      email: userForm.email,
      avatarUrl: null,
      description: null,
      country: userForm.country,
      role: Role.Member 
    }
    // Information is just stored in a local variable, but not yet in firebase.
    this.localSession.setSignUpModel(new SignUpModel(user, userForm.password, null, null));
    console.log(this.localSession.getSignUpModel());
    this.app.getRootNav().push(SignUpPlaceFormPage);
  }
}