import { IPlace } from "../place/IPlace";
import { IUser } from "../IUser";
import { IReservation } from "../payment/IReservation";
import { IFacility } from "../place/IFacility";

export class BookingModel {
    constructor(
       public user: IUser,
       public place: IPlace,
       public facility: IFacility, 
       public reservation: IReservation
    ) {}
}