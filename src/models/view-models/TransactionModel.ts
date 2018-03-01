import { ITransaction } from "../payment/ITransaction";
import { IUser } from "../IUser";
import { IPlace } from "../place/IPlace";
import { IPaymentMethod } from "../payment/IPaymentMethod";

export class TransactionModel {
    constructor(
        public transaction : ITransaction,
        public user: IUser,
        public place: IPlace,
        public paymentMethod: IPaymentMethod
    ){}
}