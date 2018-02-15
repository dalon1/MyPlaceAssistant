import { Injectable } from "@angular/core";
import { AngularFirestore } from "angularfire2/firestore";
import { AuthService } from "../auth-service/auth-service";
import { Observable } from "rxjs/Observable";

@Injectable()
export class FacilityManager {
    constructor(
        private angularFireStore: AngularFirestore
    ) {}

    getFacilities() : Observable<any[]> { return null; }
    getFacilityById(id : string) : Observable<any> { return null; }
    addFacility() : string { return null; }
    updateFacility() : Observable<any> { return null; }
    deleteFacility() : void {}
 }