import {Component, OnInit, OnDestroy} from "@angular/core";
import {ActivatedRoute, Router} from "@angular/router";
import {Subscription} from "rxjs";

import {AppRoute} from '../../app-route.enum';
import {ArtifactsService} from "../../shared/services";
import {EventsService, GlobalSharedService} from "../../services";
import {Artifact} from "../../models/artifact.model";
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
    private applicationId: number;
    private projectId: number;
    private requirementTypeId: number;
    artifacts: Artifact[];
    selectedArtifactIds: number[];
    private subscriptions: Subscription[] = [];
    
    constructor(
        private globalService: GlobalSharedService,
        private eventsService: EventsService,
        private artifactsService: ArtifactsService,
        private activatedRoute: ActivatedRoute,
        private router: Router
    ) {
        const subscription = this.activatedRoute.params.subscribe(routeParams => {
            this.applicationId = routeParams.applicationId;
            this.projectId = routeParams.projectId;
        });
        this.subscriptions.push(subscription);
    }

    ngOnInit() {
        this.eventsService.selectedApplication('Gadget Value');
    }

    onRequirementTypeChange(requirementTypeId: number): void {
        this.requirementTypeId = requirementTypeId;
        const subscription = this.artifactsService.attributes(this.applicationId, this.requirementTypeId).subscribe(attributes => {
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
        const artifactSubscription = this.artifactsService.artifacts(this.applicationId, this.projectId, this.requirementTypeId).subscribe(artifacts => this.artifacts = artifacts);
        this.subscriptions.push(artifactSubscription);
    }

    moveTo(): void {
        if (this.selectedArtifactIds && this.selectedArtifactIds.length) {
            // TODO: Service call to move selected artifacts to selected project
        }
    }

    onGridLinkClick(data: any): void {
        this.router.navigate([AppRoute.home, this.globalService.employee.id, AppRoute.artifact, this.applicationId, 'edit', data]);
    }

    ngOnDestroy() {
        while (this.subscriptions.length !== 0) {
            this.subscriptions.pop().unsubscribe();
        }
    }
}