import { Component } from '@angular/core';
import { BookingModel } from '../../../models/view-models/BookingModel';
import { LocalSession } from '../../../providers/session/local-session';
import { IReservation } from '../../../models/payment/IReservation';

@Component({
    selector: 'booking-form',
    templateUrl: 'booking-form.html'
})
export class BookingFormPage {
    booking: BookingModel;
    reservation: IReservation;

    constructor(
        private localSession: LocalSession
    ) {}

    ngOnInit() {
        if (typeof this.localSession.getBookingModel() !== 'undefined') {
            this.booking = this.localSession.getBookingModel();
        }
    }

    bookFacility() {
        
    }
}