import { Status } from "./Status";
import { FacilityType } from "./FacilityType";

export interface IFacility {
    id: string,
    placeId: string,
    name: string, 
    cost: number,
    currency: string,
    facilityType: FacilityType,
    bookType: string,
    status: Status
}