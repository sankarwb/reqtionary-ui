import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable, Subscription } from "rxjs";

import { GlobalSharedService } from "../../services";
import {
    requirementtypesByApplication,
    parentArtifactsByApplication
} from '../../endpoints';
import { RequirementType } from "../../models/Requirement-type.model";
import { Artifact } from "../../models/artifact.model";

@Injectable()
export class ArtifactsService {
    constructor(
        private http: HttpClient,
        private globalService: GlobalSharedService
    ) {}

    subscriptions: Subscription[] = [];

    requirementtypes(applicationId: number): Observable<RequirementType[]> {
        return this.http.get<RequirementType[]>(`${requirementtypesByApplication}${applicationId}`);
    }

    parentArtifacts(applicationId: number): Observable<Artifact[]> {
        return this.http.get<Artifact[]>(`${parentArtifactsByApplication}${applicationId}`);
    }
    unsubscribe() {
        while(this.subscriptions.length !== 0) {
            this.subscriptions.pop().unsubscribe();
        }
    }
}