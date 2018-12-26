import {Component, OnInit, OnDestroy} from '@angular/core';
import {ActivatedRoute} from '@angular/router';

import {EventsService} from "../../services";
import {Artifact, Application, Attribute} from '../../models';
import { EmployeeService } from '../../shared/services';
import { Subscription } from 'rxjs';

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
        `
    ]
})

export class ArtifactComponent implements OnInit, OnDestroy {
    
    activeSection: string;
    attributes: Attribute[];
    artifact: Artifact;
    application: Application;
    private subscriptions: Subscription[] = [];

    constructor(
        private eventsService: EventsService,
        private employeeService: EmployeeService,
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
        this.attributes = this.route.snapshot.data['result']['attributes'];
        this.artifact = this.route.snapshot.data['result']['artifact'];
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

    ngOnDestroy() {
        while (this.subscriptions.length !== 0) {
            this.subscriptions.pop().unsubscribe();
        }
    }
}