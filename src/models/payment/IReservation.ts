import { ITransaction } from "./ITransaction";

export interface IReservation extends ITransaction {
    facilityId: string, 
    reservationDate: Date,
    reservationStartTime: Date,
    reservationEndTime: Date,
    numberOfGuests: number
}