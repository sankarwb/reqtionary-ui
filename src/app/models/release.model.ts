import { Project } from "./project.model";

export class Release {
    id: number;
    name: string;
    description: string;
    projects: Project[];
}