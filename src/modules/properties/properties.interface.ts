import { PropertiesWhereInput } from "../../../prisma/generated/prisma/models";

export interface IPropertiesQuery extends PropertiesWhereInput{
    searchTerm ? : string
    limit ? : string
    page ? : string
    sortBy ? : string,
    sortOrder ? : string
}