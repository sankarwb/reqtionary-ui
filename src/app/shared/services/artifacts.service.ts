import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import {Observable} from "rxjs";

import { GlobalSharedService } from "../../services";
import {
    requirementTypesByApplication,
    attributesByApplication,
    attributesByApplicationAndRequirementType,
    parentArtifactsByApplication,
    agileStatusesByApplication,
    artifacts,
    agileArtifacts,
    artifactById,
    associationsByArtifact,
    actionArtifact
} from '../../endpoints';
import {
    RequirementType,
    Artifact,
    Attribute,
    AgileStatus
} from "../../models";

@Injectable()
export class ArtifactsService {
    constructor(
        private http: HttpClient,
        private globalService: GlobalSharedService
    ) {}

    requirementtypes(applicationId: number): Observable<RequirementType[]> {
        return this.http.get<RequirementType[]>(
            `${requirementTypesByApplication
                .replace(':applicationId', applicationId.toString())}`
        );
    }

    attributes(applicationId: number, requirementTypeId?: number): Observable<Attribute[]> {
        if (requirementTypeId) {
            return this.http.get<Attribute[]>(
                `${attributesByApplicationAndRequirementType
                    .replace(':applicationId',applicationId.toString())
                    .replace(':requirementTypeId', requirementTypeId.toString())}`
            );
        } else {
            return this.http.get<Attribute[]>(
                `${attributesByApplication
                    .replace(':applicationId',applicationId.toString())}`
            );
        }
    }

    parentArtifacts(applicationId: number): Observable<Artifact[]> {
        return this.http.get<Artifact[]>(
            `${parentArtifactsByApplication
                .replace(':applicationId', applicationId.toString())}`
        );
    }

    agileStatuses(applicationId: number): Observable<AgileStatus[]> {
        return this.http.get<AgileStatus[]>(
            `${agileStatusesByApplication
                .replace(':applicationId', applicationId.toString())}`
        );
    }

    artifacts(applicationId: number, projectId: number, requirementTypeId: number, parentArtifactId?: number, assignedTo?: number, agile?: boolean): Observable<Artifact[]> {
        let uri = `${agile ? agileArtifacts : artifacts}/${applicationId}/${projectId}/${requirementTypeId}`;
        if (parentArtifactId) {
            uri += `/${parentArtifactId}`;
        }
        if (assignedTo) {
            uri += `/${assignedTo}`;
        }
        return this.http.get<Artifact[]>(uri);
    }

    artifactById(artifactId: number): Observable<Artifact> {
        return this.http.get<Artifact>(
            `${artifactById
                .replace(':artifactId', artifactId.toString())}`
        );
    }

    actionArtifact(artifact: Artifact): Observable<Artifact> {
        return this.http.post<Artifact>(`${actionArtifact}`, artifact);
    }

    associationByArtifact(artifactId: number): Observable<Artifact[]> {
        return this.http.get<Artifact[]>(
            `${associationsByArtifact
                .replace(':artifactId', artifactId.toString())}`
        );
    }
}