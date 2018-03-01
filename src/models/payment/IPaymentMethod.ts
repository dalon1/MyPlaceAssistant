export interface IPaymentMethod {
    id: string,
    userId: string,
    paymentType: string,
    cardNumber: string,
    cardHolderName: string,
    expirationDate: string,
    code: string,
    issuingNetwork: string
}