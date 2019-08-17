import {Component, OnInit, OnDestroy} from "@angular/core";
import {ActivatedRoute, Router} from "@angular/router";
import {Subscription} from "rxjs";

import {AppRoute} from '../../app-route.enum';
import {ArtifactsService, EmployeeService} from "../../shared/services";
import {EventsService, GlobalSharedService} from "../../services";
import {Artifact, Application} from "../../models";
import {DataGridColumn} from "../../shared/models/data-grid-column.model";

@Component({
    selector: 'artifacts-list',
    templateUrl: 'artifacts-list.component.html'
})
export class ArtifactsListComponent implements OnInit, OnDestroy {
    
    defaultColumns = [
        new DataGridColumn('UID','UID','text', 80, true),
        new DataGridColumn('name','Name','text', 200),
        new DataGridColumn('status','Status','text', 80)
    ];
    columns = [];
    private application: Application;
    private projectId: number;
    private requirementTypeId: number;
    artifacts: Artifact[];
    selectedArtifactIds: number[];
    private subscriptions: Subscription[] = [];
    
    constructor(
        private globalService: GlobalSharedService,
        private eventsService: EventsService,
        private artifactsService: ArtifactsService,
        private employeeService: EmployeeService,
        private route: ActivatedRoute,
        private router: Router
    ) {
        this.application = new Application();
        const paramSubscription = this.route.params.subscribe(params => {
            this.application.id = params.applicationId;
            this.projectId = params.projectId;
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

    onRequirementTypeChange(requirementTypeId: number): void {
        this.requirementTypeId = requirementTypeId;
        const subscription = this.artifactsService.attributes(this.application.id, this.requirementTypeId).subscribe(attributes => {
            this.columns = [...this.defaultColumns, ...attributes.map(attribute => new DataGridColumn(attribute.id.toString(), attribute.name, attribute.type, 100))];
            this.getArtifacts();
        });
        this.subscriptions.push(subscription);
    }

    onSprintChange(sprintId: number): void {
        this.moveTo();
    }

    getSelectedItems(selectedArtifacts: number[]): void {
        this.selectedArtifactIds = selectedArtifacts;
    }

    getArtifacts(): void {
        const artifactSubscription = this.artifactsService.artifacts(this.application.id, this.projectId, this.requirementTypeId).subscribe(artifacts => this.artifacts = artifacts);
        this.subscriptions.push(artifactSubscription);
    }

    moveTo(): void {
        if (this.selectedArtifactIds && this.selectedArtifactIds.length) {
            // TODO: Service call to move selected artifacts to selected project
        }
    }

    onGridLinkClick(data: any): void {
        this.router.navigate([AppRoute.HOME, this.globalService.employee.id, AppRoute.ARTIFACT, this.application.id, this.projectId, this.requirementTypeId, 'edit', data], {queryParams: {applicationName: this.application.name}});
    }

    ngOnDestroy() {
        while (this.subscriptions.length !== 0) {
            this.subscriptions.pop().unsubscribe();
        }
    }
}