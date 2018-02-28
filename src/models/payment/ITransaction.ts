import { TransactionType } from "./TransactionType";

export interface ITransaction {
    id: string,
    referenceNumber: string,
    userId: string,
    placeId: string,
    paymentMethodId: string,
    amount: number, 
    currency: string,
    createdAt: Date,
    transactionType: TransactionType,
    memo: string
}