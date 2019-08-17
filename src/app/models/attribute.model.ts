import { BaseModel } from "./base.model";

export class Attribute extends BaseModel {
    appObjectAttributeId: number;
    type: string;
    system: number;
    value: string;
    values: string[];
}