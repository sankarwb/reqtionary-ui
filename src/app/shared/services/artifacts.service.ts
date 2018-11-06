import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable, Subscription } from "rxjs";

import { GlobalSharedService } from "../../services";
import {
    requirementTypesByApplication,
    parentArtifactsByApplication,
    agileStatusesByApplication,
    artifacts,
    agileArtifacts
} from '../../endpoints';
import { RequirementType } from "../../models/requirement-type.model";
import { Artifact } from "../../models/artifact.model";
import { AgileStatus } from "../../models/agile-status.model";

@Injectable()
export class ArtifactsService {
    constructor(
        private http: HttpClient,
        private globalService: GlobalSharedService
    ) {}

    subscriptions: Subscription[] = [];

    requirementtypes(applicationId: number): Observable<RequirementType[]> {
        return this.http.get<RequirementType[]>(`${requirementTypesByApplication.replace(':applicationId', applicationId.toString())}`);
    }

    parentArtifacts(applicationId: number): Observable<Artifact[]> {
        return this.http.get<Artifact[]>(`${parentArtifactsByApplication.replace(':applicationId', applicationId.toString())}`);
    }

    agileStatuses(applicationId: number): Observable<AgileStatus[]> {
        return this.http.get<AgileStatus[]>(`${agileStatusesByApplication.replace(':applicationId', applicationId.toString())}`);
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

    unsubscribe() {
        while(this.subscriptions.length !== 0) {
            this.subscriptions.pop().unsubscribe();
        }
    }
}