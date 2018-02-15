import { Injectable } from "@angular/core";
import { AngularFirestore } from "angularfire2/firestore";
import { AuthService } from "../auth-service/auth-service";
import { Observable } from "rxjs/Observable";

@Injectable()
export class BuildingManager {
    constructor(
        private angularFireStore: AngularFirestore
    ) {}

    getBuildings() : Observable<any[]> { return null; }
    getBuildingById(id : string) : Observable<any> { return null; }
    addBuilding() : string { return null; }
    updateBuilding() : Observable<any> { return null; }
    deleteBuilding() : void {}
 }