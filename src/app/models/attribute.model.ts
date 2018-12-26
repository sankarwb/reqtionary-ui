import { BaseModel } from "./base.model";

export class Attribute extends BaseModel {
    type: string;
    system: number;
    value: string;
    values: string[];
}