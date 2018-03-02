import { Status } from "./Status";
import { FacilityType } from "./FacilityType";

export interface IFacility {
    id: string,
    placeId: string,
    name: string, 
    cost: number,
    facilityType: FacilityType,
    currentStatus: Status
}