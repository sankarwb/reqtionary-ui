import { BaseModel } from "./base.model";
import { Employee } from "./employee.model";

export class Artifact extends BaseModel {
    applicationId: number;
    projectId: number;
    UID: string;
    actualPoints: number;
    expectedPoints: number;
    status: string;
    user: Employee;
}