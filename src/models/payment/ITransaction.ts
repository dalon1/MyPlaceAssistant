import { TransactionType } from "./TransactionType";

export interface ITransaction {
    id: string,
    userId: string,
    placeId: string,
    paymentMethodId: string,
    amount: number, 
    currency: string,
    createdAt: string,
    transactionType: TransactionType,
    memo: string
}