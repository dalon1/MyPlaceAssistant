import { Component } from '@angular/core';
import { PlaceManager } from '../../../providers/data-service/place-service';
import { IUser } from '../../../models/IUser';
import { IPlace } from '../../../models/place/IPlace';
import { AuthService } from '../../../providers/auth-service/auth-service';
import { UserManager } from '../../../providers/data-service/user-service';

@Component({
    selector: 'myplace-page',
    templateUrl: 'myplace.html'
})
export class MyPlacePage {
    myPlaceModels : Array<MyPlaceModel>;

    constructor(
        private placeManager : PlaceManager,
        private authService : AuthService,
        private userManager: UserManager 
    ) {}

    ngOnInit() {
        this.myPlaceModels = this.loadMyPlaces();
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
}

class MyPlaceModel {
    constructor(public user : IUser, public place : IPlace) {}
}