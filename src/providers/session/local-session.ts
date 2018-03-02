import { Injectable } from '@angular/core';
import { TransactionModel } from '../../models/view-models/TransactionModel';
import { SignUpModel } from '../../models/form-models/SignUpModel';


@Injectable()
export class LocalSession {
    private transactionId: string;
    private fileId: string;
    private newsId: string;
    private profileId: string;
    private selectedPayment: string;
    private selectedPayee: string;
    private transactionModel: TransactionModel;
    private signUpModel: SignUpModel; // For the Sign Up Form 

    constructor() {}

    public setSignUpModel(model: SignUpModel) : void {
        this.signUpModel = model;
    }

    public getSignUpModel() : SignUpModel {
        return this.signUpModel;
    }

    public setTransactionModel(model: TransactionModel) : void {
        this.transactionModel = model;
    }

    public getTransactionModel() : TransactionModel {
        return this.transactionModel;
    }

    public setTransactionId(id: string) : void {
        this.transactionId = id;
    }

    public getTransactionId() : string {
        return this.transactionId;
    }

    public setSelectedPayment(id : string) : void {
        this.selectedPayment = id;
    }

    public getSelectedPayment() : string {
        return this.selectedPayment;
    }

    public setSelectedPayee(id : string) : void {
        this.selectedPayee = id;
    }

    public getSelectedPayee() : string {
        return this.selectedPayee;
    }
 
    public setFileId(id : string) : void {
        this.fileId = id;
    }
    public setNewsId(id : string) : void {
        this.newsId = id;
    }
    public setProfileId(id : string) : void {
        this.profileId = id;
    }

    public getFileId() : string{
        return this.fileId;
    }
    public getNewsId() : string {
        return this.newsId;
    }
    public getProfileId() : string {
        return this.profileId;
    }
}