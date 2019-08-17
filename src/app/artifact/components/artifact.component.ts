import {Component, OnInit, OnDestroy, ViewChild} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import { Subscription } from 'rxjs';

import {EventsService, GlobalSharedService} from "../../services";
import {Artifact, Application, Attribute} from '../../models';
import { EmployeeService, ArtifactsService } from '../../shared/services';
import { ArtifactDetailsComponent } from './artifact-details.component';

@Component({
    selector: 'artifact',
    templateUrl: 'artifact.component.html',
    styles: [
        `form .flex-box-column {
            margin: 0px 10px 10px 0px;
        }
        `,
        `.flex-box-row label, .flex-box-column label {
            color: #70757B;
            font-size: 10px;
            font-weight: bold;
            padding: 4px 4px 4px 0px;
        }
        `,
        `.save-btn {
            color: #C3D6FC; font-size: 12px; border: 1px solid #BCD1FC; border-radius: 20px; background-color: #F8F9FB; padding: 10px 14px;
        }`
    ]
})

export class ArtifactComponent implements OnInit, OnDestroy {
    @ViewChild(ArtifactDetailsComponent, {static: true}) detailsComponent: ArtifactDetailsComponent;
    activeSection: string;
    attributes: Attribute[];
    artifact: Artifact;
    parentArtifacts: Artifact[];
    application: Application;
    private subscriptions: Subscription[] = [];

    constructor(
        private eventsService: EventsService,
        private employeeService: EmployeeService,
        private artifactService: ArtifactsService,
        private globalService: GlobalSharedService,
        private route: ActivatedRoute
    ) {
        this.application = new Application();
        this.application.id = this.route.snapshot.params.applicationId;
        this.application.name = this.route.snapshot.queryParams.applicationName;
    }

    ngOnInit() {
        this.eventsService.selectedApplication(this.application.name);
        this.attributes = this.route.snapshot.data['result']['attributes'];
        this.artifact = this.route.snapshot.data['result']['artifact'];
        this.parentArtifacts = this.route.snapshot.data['result']['parentArtifacts'];
        if (!this.employeeService.employees) {
            const subscription = this.employeeService.getEmployeesByApplication(this.application.id)
                    .subscribe(employees => {
                        this.employeeService.employees = employees;
                    });
            this.subscriptions.push(subscription);
        }
    }

    onChangeSection(section: string): void {
        this.activeSection = section;
    }

    actionArtifact() {
        this.artifact.user = this.globalService.employee;
        if (!this.artifact.id) {
            this.artifact.orgId = this.globalService.employee.orgId;
            this.artifact.projectId = this.route.snapshot.params.projectId;
            this.artifact.applicationId = this.route.snapshot.params.applicationId;
            this.artifact.requirementTypeId = this.route.snapshot.params.requirementTypeId;
        }
        if (!!this.detailsComponent) {
            this.detailsComponent.attributeComponent.getAttributeSelections();
        }
        this.subscriptions.push(this.artifactService.actionArtifact(this.artifact).subscribe(result => {
            this.artifact = result;
        }));
    }

    ngOnDestroy() {
        while (this.subscriptions.length !== 0) {
            this.subscriptions.pop().unsubscribe();
        }
    }
}