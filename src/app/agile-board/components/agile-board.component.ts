import {
    Component,
    OnInit,
    OnDestroy
} from "@angular/core";
import {ActivatedRoute} from "@angular/router";
import {
    Observable,
    forkJoin
} from "rxjs";

import {ArtifactsService} from "../../shared/services";
import {Artifact} from "../../models/artifact.model";
import {AgileStatus} from "../../models/agile-status.model";

@Component({
    selector: 'agile-board',
    templateUrl: 'agile-board.component.html'
})
export class AgileBoardComponent implements OnInit, OnDestroy {

    private applicationId: number;
    private projectId: number;
    private requirementTypeId: number;
    private parentArtifactId: number;
    private assignedTo: number;
    private agileStatuses: AgileStatus[];
    private artifacts: Artifact[];

    constructor(
        private activatedRoute: ActivatedRoute,
        private artifactsService: ArtifactsService
    ) {
        const subscription = this.activatedRoute.params.subscribe(routeParams => {
            this.applicationId = routeParams.applicationId;
        });
        this.artifactsService.subscriptions.push(subscription);
    }

    ngOnInit() {
        
    }

    onRequirementTypesLoaded(requirementTypeId: number): void {
        this.requirementTypeId = requirementTypeId;
        forkJoin(
            this.artifactsService.agileStatuses(this.applicationId),
            this.artifactsService.artifacts(this.applicationId, this.projectId, 37)
        ).subscribe(results => {
            this.agileStatuses = results[0];
            this.artifacts = results[1];
        })
    }

    onRequirementTypeChange(requirementTypeId: number): void {
        this.requirementTypeId = requirementTypeId;
        this.getArtifacts();
    }

    onAssignedtoChange(assignedTo: number): void {
        this.assignedTo = assignedTo;
        this.getArtifacts();
    }

    onEpicChange(epicId: number): void {
        this.parentArtifactId = epicId;
        this.getArtifacts();
    }

    onSprintChange(sprintId: number): void {
        this.projectId = sprintId;
        this.getArtifacts();
    }
    
    onLayoutChange(layout: string): void {
        
    }

    getArtifacts() {
        this.artifactsService.artifacts(this.applicationId, this.projectId, this.requirementTypeId, this.parentArtifactId, this.assignedTo, true).subscribe(artifacts => this.artifacts = artifacts);
    }

    artifactsByStatus(status: number): Observable<Artifact[]> {
        return new Observable(observer => {
            let artifactsByStatus = this.artifacts.filter(artifact => parseInt(artifact.status) === status);
            observer.next(artifactsByStatus);
            observer.complete();
        })
    }

    ngOnDestroy() {

    }
}