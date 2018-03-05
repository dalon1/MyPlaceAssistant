import { Injectable } from "@angular/core";
import { AngularFirestore } from "angularfire2/firestore";
import { AuthService } from "../auth-service/auth-service";
import { Observable } from "rxjs/Observable";
import { IPlace } from "../../models/place/IPlace";

@Injectable()
export class PlaceManager {
    constructor(
        private angularFireStore: AngularFirestore
    ) {}

    getPlaces(country : string) : Observable<IPlace[]> { 
        return this.angularFireStore.collection<any>('places').doc(country).collection<IPlace>('places').valueChanges();; 
    }
    getPlaceById(id : string) : Observable<IPlace> { return null; }

    getPlacesByUser(userId: string) : Observable<IPlace[]> { return null }
    addPlace() : string { return null; }

    addPlaceToUser(userId: string, place: IPlace) : void {
        this.angularFireStore.collection('users').doc(userId).collection('my-places')
        .doc(this.angularFireStore.createId()).set({
            placeId: place.id,
            userId: userId,
            unit: place.unit
        }).then(() => console.log("Place added to user")).catch((error) => console.log("error submitting place to user"));
    }

    updatePlace() : Observable<any> { return null; }
    deletePlace() : void {}
 }