import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable, Subscription } from "rxjs";

import { GlobalSharedService } from "../../services";
import {
    requirementTypesByApplication,
    parentArtifactsByApplication,
    agileStatusesByApplication,
    artifacts
} from '../../endpoints';
import { RequirementType } from "../../models/requirement-type.model";
import { Artifact } from "../../models/artifact.model";
import { AgileStatus } from "../../models/agile-status.model";

@Injectable()
export class AgileBoardService {
    constructor(
        private http: HttpClient,
        private globalService: GlobalSharedService
    ) {}

    subscriptions: Subscription[] = [];

    unsubscribe() {
        while(this.subscriptions.length !== 0) {
            this.subscriptions.pop().unsubscribe();
        }
    }
}