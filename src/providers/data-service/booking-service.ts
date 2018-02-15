import { Injectable } from "@angular/core";
import { AngularFirestore } from "angularfire2/firestore";
import { AuthService } from "../auth-service/auth-service";
import { Observable } from "rxjs/Observable";

@Injectable()
export class BookingManager {
    constructor(
        private angularFireStore: AngularFirestore,
        private authService: AuthService
    ) {}

    getBookings() : Observable<any[]> { return null; }

    getBookingById(id : string) : Observable<any> { return null; }

    addBooking() : string { return null; }

    cancelBooking(id : string) : void {}

    updateBooking(id : string) : Observable<any> { return null; } 
}