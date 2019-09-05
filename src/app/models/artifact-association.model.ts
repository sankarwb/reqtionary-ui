import { BaseModel } from "./base.model";

export class ArtifactAssociation extends BaseModel {
    color: string;
    status: AssociationStatus
}

export enum AssociationStatus {
    NEW = 'new',
    DELETE = 'delete',
    SAVED = 'saved'
}