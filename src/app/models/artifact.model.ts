import { BaseModel } from "./base.model";
import { Employee } from "./employee.model";
import { ArtifactAttribute } from "./artifact-attribute.model";
import { ArtifactAssociation } from "./artifact-association.model";
import { Attachment } from "./attachment.model";
import { Conversation } from "./conversation.model";

export class Artifact extends BaseModel {
    applicationId: number;
    projectId: number;
    requirementTypeId: number;
    parentId: number;
    UID: string;
    actualPoints: number;
    expectedPoints: number;
    status: string;
    comments: Conversation[];
    user: Employee;
    attributes: ArtifactAttribute[];
    associations: ArtifactAssociation[];
    attachments: Attachment[];
}