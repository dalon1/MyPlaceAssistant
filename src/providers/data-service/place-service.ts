import { Injectable } from "@angular/core";
import { AngularFirestore } from "angularfire2/firestore";
import { AuthService } from "../auth-service/auth-service";
import { Observable } from "rxjs/Observable";
import { IPlace } from "../../models/place/IPlace";
import { IUser } from "../../models/IUser";

@Injectable()
export class PlaceManager {
    constructor(
        private angularFireStore: AngularFirestore
    ) {}

    getPlaces(country : string) : Observable<IPlace[]> { 
        return this.angularFireStore.collection<any>('places').doc(country).collection<IPlace>('places').valueChanges();; 
    }

    getPlaceById(country: string, placeId : string) : Observable<IPlace> { 
        return this.angularFireStore.doc<IPlace>(`places/${country.toUpperCase()}/places/${placeId}`).valueChanges();
    }

    getPlacesByUser(userId: string) : Observable<any[]> { 
        return this.angularFireStore.collection<IUser>('users').doc(userId).collection<any>('my-places').valueChanges();
    }
    
    addPlace() : string { return null; }

    addPlaceToUser(userId: string, place: IPlace) : void {
        this.angularFireStore.collection('users').doc(userId).collection('my-places')
        .doc(this.angularFireStore.createId()).set({
            placeId: place.id,
            userId: userId,
            unit: place.unit,
            country: place.country // Important to get place Firestore Path
        }).then(() => console.log("Place added to user")).catch((error) => console.log("error submitting place to user"));
    }

    updatePlace() : Observable<any> { return null; }
    deletePlace() : void {}
 }