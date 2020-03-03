import { BaseDto } from './base-dto.model';

export interface List extends BaseDto{
    active: boolean,
    field?: string,
    icon: string,
    name: string,
    order?: string,
    position?: number,
    type : string,
    value?: string,
    limit?: number,
    lat?: number,
    lng?: number,
}
