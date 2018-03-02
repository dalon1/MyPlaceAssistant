import { IPlace } from "../place/IPlace";
import { IPaymentMethod } from "../payment/IPaymentMethod";
import { IUser } from "../IUser";

export class SignUpModel {
    constructor(
        public user: IUser,
        public password: string, 
        public place: IPlace, 
        public paymentMethod: IPaymentMethod 
    ) {}
}