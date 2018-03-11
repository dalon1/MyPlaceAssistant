import { Injectable } from "@angular/core";
import { AngularFirestore } from "angularfire2/firestore";
import { AuthService } from "../auth-service/auth-service";
import { Observable } from "rxjs/Observable";
import { IFacility } from "../../models/place/IFacility";

@Injectable()
export class FacilityManager {
    constructor(
        private angularFireStore: AngularFirestore
    ) {}

    getFacilities(placeId: string) : Observable<IFacility[]> { 
        return this.angularFireStore.collection<any>('place-facilities').doc(placeId).collection<IFacility>('facilities').valueChanges();
    }
    getFacilityById(id : string) : Observable<any> { return null; }
    addFacility() : string { return null; }
    updateFacility() : Observable<any> { return null; }
    deleteFacility() : void {}
 }