import {BaseModel} from "./base.model";

export class RequirementType extends BaseModel {
    parentId: number;
    system: number;
    code: string;
    color: string;
    seqnum: number;
    type: number;
}