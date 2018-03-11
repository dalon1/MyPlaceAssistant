import { Component } from '@angular/core';
import { NavController, NavParams, App } from 'ionic-angular';
import { Observable } from 'rxjs/Observable';
import { LocalSession } from '../../../providers/session/local-session';
import { PlaceManager } from '../../../providers/data-service/place-service';
import { AuthService } from '../../../providers/auth-service/auth-service';
import { IPlace } from '../../../models/place/IPlace';
import { IUser } from '../../../models/IUser';
import { UserManager } from '../../../providers/data-service/user-service';
import { BookingModel } from '../../../models/view-models/BookingModel';
import { IFacility } from '../../../models/place/IFacility';
import { FacilityManager } from '../../../providers/data-service/facility-service';
import { BookingFormPage } from '../form/booking-form';

/**
 * Generated class for the NewsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'booking-page',
  templateUrl: 'booking.html',
})
export class BookingPage {
  myPlacesBackup: Array<MyPlaceModel>;
  myPlaces: Array<MyPlaceModel>;
  myPlaceSelected: MyPlaceModel;
  facilities: Array<FacilityModel>;
  booking: BookingModel;
  
  constructor(
    private app: App,
    private authService: AuthService,
    private placeManager: PlaceManager,
    private userManager: UserManager,
    private facilityManager: FacilityManager,
    private localSession: LocalSession
  ) {
  }

  ngOnInit() {
    this.myPlacesBackup = this.loadMyPlaces();
    this.myPlaces = this.myPlacesBackup;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad NewsPage');
  }

  

  loadMyPlaces() : Array<MyPlaceModel> {
    let places : Array<MyPlaceModel> = new Array<MyPlaceModel>();
    this.placeManager.getPlacesByUser(this.authService.afAuth.auth.currentUser.uid).subscribe((data : Array<any>) => {
        data.forEach((myplace : any) => {
            // Retrieving user
            let user = this.userManager.getProfileById(myplace.userId).subscribe((user : IUser) => {
                // Retrieving place with its unit
                let place = this.placeManager.getPlaceById(myplace.country, myplace.placeId).subscribe((place : IPlace) => {
                    place.unit = myplace.unit;
                    places.push(new MyPlaceModel(user, place));
                });
            });
        });
    });
    return places;
  }

  loadFacilities(placeId: string) : Array<FacilityModel> {
    let facilities : Array<FacilityModel> = new Array<FacilityModel>();
    this.facilityManager.getFacilities(placeId).subscribe((data: Array<IFacility>) => {
      data.forEach((facility : IFacility) => {
        facilities.push(new FacilityModel(facility));
      });
    });
    return facilities;
  }

  selectPlace(model : MyPlaceModel) {
    this.myPlaceSelected = model;
    this.myPlaces = new Array<MyPlaceModel>();
    this.facilities = this.loadFacilities(this.myPlaceSelected.place.id);
  }

  unselectPlace() {
    this.myPlaceSelected = undefined;
    this.myPlaces = this.myPlacesBackup;
    this.facilities = new Array<FacilityModel>();
  }

  selectFacility(model : FacilityModel) {
    if (this.myPlaceSelected !== undefined) {
      let bookingModel : BookingModel = 
      new BookingModel(this.myPlaceSelected.user, this.myPlaceSelected.place, model.facility, null);
      this.localSession.setBookingModel(bookingModel);
      this.app.getRootNav().push(BookingFormPage);
    }
  }

}

class MyPlaceModel {
  constructor(
    public user: IUser, 
    public place : IPlace) {}
}

class FacilityModel {
  constructor(
    public facility : IFacility) {}
}