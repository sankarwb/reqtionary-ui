import { BaseModel } from "./base.model";
import { Employee } from "./employee.model";
import { ArtifactAttribute } from "./artifact-attribute.model";

export class Artifact extends BaseModel {
    applicationId: number;
    projectId: number;
    requirementTypeId: number;
    parentId: number;
    UID: string;
    actualPoints: number;
    expectedPoints: number;
    status: string;
    comments: string;
    user: Employee;
    attributes: ArtifactAttribute[];
}