import { BaseModel } from "./base.model";
import { Employee } from "./employee.model";
import { Attribute } from "./attribute.model";

export class Artifact extends BaseModel {
    applicationId: number;
    projectId: number;
    UID: string;
    actualPoints: number;
    expectedPoints: number;
    status: string;
    user: Employee;
    attributes: Attribute[];
}