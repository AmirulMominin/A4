import { PropertyType } from "../../../prisma/generated/prisma/enums";

export interface IProperties {
    name: string,
    details: string,
    rent: number,
    location: string,
    type: PropertyType,
    landlordId: string,
    categoryId: string
}


