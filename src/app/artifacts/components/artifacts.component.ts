import { Component, OnInit, OnDestroy } from "@angular/core";
import { ActivatedRoute } from "@angular/router";

import { ArtifactsService } from "../../shared/services";
import { Artifact } from "../../models/artifact.model";
import { AgileStatus } from "../../models/agile-status.model";
import { Observable } from "rxjs";

@Component({
    selector: 'artifacts',
    templateUrl: 'artifacts.component.html'
})
export class ArtifactsComponent implements OnInit, OnDestroy {
    constructor(
        private activatedRoute: ActivatedRoute,
        private artifactsService: ArtifactsService
    ) {
        const subscription = this.activatedRoute.params.subscribe(routeParams => {
            this.applicationId = routeParams.applicationId;
            this.artifactsService.agileStatuses(this.applicationId).subscribe(agileStatuses => this.agileStatuses = agileStatuses);
        });
        this.artifactsService.subscriptions.push(subscription);
    }

    private applicationId: number;
    private projectId: number;
    private parentArtifactId: number;
    private assignedTo: number;
    private agileStatuses: AgileStatus[];
    private artifacts: Artifact[];

    ngOnInit() {
        
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
        this.artifactsService.artifacts(this.applicationId, this.projectId, this.parentArtifactId, this.assignedTo).subscribe(artifacts => this.artifacts = artifacts);
    }

    artifactsByStatus(status: string): Observable<Artifact[]> {
        return Observable.create(observer => {
            let artifactsByStatus = this.artifacts.filter(artifact => artifact.status === status);
            observer.next(artifactsByStatus);
            observer.complete();
        })
    }

    ngOnDestroy() {

    }
}