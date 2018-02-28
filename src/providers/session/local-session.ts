import { Injectable } from '@angular/core';


@Injectable()
export class LocalSession {
    private transactionId: string;
    private fileId: string;
    private newsId: string;
    private profileId: string;
    private selectedPayment: string;
    private selectedPayee: string;

    constructor() {}

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