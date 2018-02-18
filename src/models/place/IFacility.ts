import { Status } from "./Status";

export interface IFacility {
    id: string,
    buildingId: string,
    name: string, 
    cost: number,
    currentStatus: Status
}