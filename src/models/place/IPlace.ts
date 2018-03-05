import { ILocation } from "../general/ILocation";

export interface IPlace {
    id: string,
    name: string,
    adminId: string,
    address1: string,
    address2: string,
    city: string, 
    province: string,
    country: string,
    postalCode: string,
    location: ILocation,
    unit: string // only for user schema
}