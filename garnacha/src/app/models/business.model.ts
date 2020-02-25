import { BaseDto } from './base-dto.model';


export interface Business extends BaseDto{
    name: string,
    price: number,
    slug: string,
    categories? : Array<string>,
    photos?: Array<string>,
}
