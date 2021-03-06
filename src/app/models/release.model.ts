import { BaseModel } from "./base.model";
import { Project } from "./project.model";

export class Release extends BaseModel {
    type: number;
    projects: Project[];
}