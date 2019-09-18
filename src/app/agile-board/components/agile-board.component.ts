import {Component, OnInit, OnDestroy} from "@angular/core";
import {ActivatedRoute, Router} from "@angular/router";
import {Observable, forkJoin, Subscription} from "rxjs";

import {ArtifactsService, EmployeeService} from "../../shared/services";
import {Artifact, AgileStatus, Application} from "../../models";
import { EventsService } from "../../services";

@Component({
    selector: 'agile-board',
    templateUrl: 'agile-board.component.html'
})
export class AgileBoardComponent implements OnInit, OnDestroy {

    private application: Application;
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
        private employeeService: EmployeeService,
        public router: Router,
        private route: ActivatedRoute
    ) {
        this.application = new Application();
        const paramSubscription = this.route.params.subscribe(params => {
            this.application.id = params.applicationId;
        });
        this.subscriptions.push(paramSubscription);
        const queryparamSubscription = this.route.queryParams.subscribe(queryParams => {
            this.application.name = queryParams.applicationName;
        });
        this.subscriptions.push(queryparamSubscription);
    }

    ngOnInit() {
        this.eventsService.selectedApplication(this.application.name);
        if (!this.employeeService.employees) {
            const subscription = this.employeeService.getEmployeesByApplication(this.application.id)
                    .subscribe(employees => {
                        this.employeeService.employees = employees;
                    });
            this.subscriptions.push(subscription);
        }
    }

    onRequirementTypesLoaded(requirementTypeId: number): void {
        this.requirementTypeId = requirementTypeId;
        // TODO: replace 37 with reqTypeId
        forkJoin(
            this.artifactsService.agileStatuses(this.application.id),
            this.artifactsService.artifacts(this.application.id, this.projectId, 37)
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
        const subscription = this.artifactsService.artifacts(this.application.id, this.projectId, this.requirementTypeId, this.parentArtifactId, this.assignedTo, true).subscribe(artifacts => this.artifacts = artifacts);
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