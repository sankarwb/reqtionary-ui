import {
    Component,
    OnInit,
    OnDestroy
} from "@angular/core";
import {ActivatedRoute, Router} from "@angular/router";

import {
    Observable,
    forkJoin,
    Subscription
} from "rxjs";

import {ArtifactsService} from "../../shared/services";
import {Artifact} from "../../models/artifact.model";
import {AgileStatus} from "../../models/agile-status.model";
import { EventsService } from "src/app/services";

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
    artifacts: Artifact[];
    private subscriptions: Subscription[] = [];

    constructor(
        private eventsService: EventsService,
        private artifactsService: ArtifactsService,
        public router: Router,
        private activatedRoute: ActivatedRoute
    ) {
        const subscription = this.activatedRoute.params.subscribe(routeParams => {
            this.applicationId = routeParams.applicationId;
        });
        this.subscriptions.push(subscription);
    }

    ngOnInit() {
        this.eventsService.selectedApplication('Gadget Value');
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
        const subscription = this.artifactsService.artifacts(this.applicationId, this.projectId, this.requirementTypeId, this.parentArtifactId, this.assignedTo, true).subscribe(artifacts => this.artifacts = artifacts);
        this.subscriptions.push(subscription);
    }

    artifactsByStatus(status: number): Observable<Artifact[]> {
        return new Observable(observer => {
            let artifactsByStatus = this.artifacts.filter(artifact => parseInt(artifact.status) === status);
            observer.next(artifactsByStatus);
            observer.complete();
        })
    }

    ngOnDestroy() {
        while (this.subscriptions.length !== 0) {
            this.subscriptions.pop().unsubscribe();
        }
    }
}