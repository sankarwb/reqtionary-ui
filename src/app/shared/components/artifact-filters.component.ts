import {
    Component,
    Input,
    OnInit,
    Output,
    EventEmitter,
    ViewChild,
    OnDestroy
} from "@angular/core";
import {MatButtonToggleGroup} from "@angular/material";

import {
    ArtifactsService,
    EmployeeService,
    ProjectsService
} from "../services";
import {
    Release,
    Employee,
    Artifact,
    Project
} from "../../models";
import { Subscription } from "rxjs";

@Component({
    selector: 'artifact-filters',
    template: `
    <div [ngClass]="{'flex-box-row':agileLayout, 'flex-box-row-reverse':!agileLayout}">
        <div class="flex-box-column-justify-center filters-container custom-select" style="width: 60%;" *ngIf="agileLayout">
            <div>
                <span>Assigned To</span>
                <select (change)="onAssignedtoChange($event)">
                    <option>Show All</option>
                    <option *ngFor="let employee of employees;" [value]="employee.id">{{employee.firstName}} {{employee.lastName}}</option>
                </select>
            </div>
            <div>
                <span>Epic</span>
                <select (change)="onEpicChange($event)">
                    <option>Show All</option>
                    <option *ngFor="let artifact of parentArtifacts;" [value]="artifact.id">{{artifact.name}}</option>
                </select>
            </div>
        </div>
        <div class="flex-box-column-justify-center filters-container" style="width: 40%;" *ngIf="agileLayout">
            <div>
                <span>Sprint</span>
                <mat-menu #releasesMenu="matMenu" width="200" yPosition="below">
                    <ng-container *ngFor="let release of releases;">
                        <button mat-menu-item [matMenuTriggerFor]="projectsMenu">{{release.name}}</button>
                        <mat-menu #projectsMenu="matMenu">
                            <button mat-menu-item *ngFor="let project of release.projects;" (click)="onSprintChange(project)">{{project.name}}</button>
                        </mat-menu>
                    </ng-container>
                </mat-menu>
                <button mat-button [matMenuTriggerFor]="releasesMenu">{{selectedSprint.name}}</button>
            </div>
            <div style="text-align: center;">
                <mat-button-toggle-group #group="matButtonToggleGroup" value='card'>
                    <mat-button-toggle value="card">
                        <mat-icon>apps</mat-icon>
                    </mat-button-toggle>
                    <mat-button-toggle value="list">
                        <mat-icon>list</mat-icon>
                    </mat-button-toggle>
                </mat-button-toggle-group>
            </div>
        </div>
        <div class="flex-box-column filters-container" style="width: 100%; align-items: flex-end;" *ngIf="!agileLayout">
            <div class="flex-box-row-center" style="width: 20%; margin-bottom: 1%; margin-right: 2%; border: 1px solid #BCD1FC; border-radius: 30px; background-color: #F8F9FB;">
                <mat-icon>import_export</mat-icon>
                <span style="margin: 0;">Export</span>
            </div>
            <div>
                <span>Move to</span>
                <mat-menu #releasesMenu="matMenu" width="200" yPosition="below">
                    <ng-container *ngFor="let release of releases;">
                        <button mat-menu-item [matMenuTriggerFor]="projectsMenu">{{release.name}}</button>
                        <mat-menu #projectsMenu="matMenu">
                            <button mat-menu-item *ngFor="let project of release.projects;" (click)="onSprintChange(project)">{{project.name}}</button>
                        </mat-menu>
                    </ng-container>
                </mat-menu>
                <button mat-button [matMenuTriggerFor]="releasesMenu">{{selectedSprint.name}}</button>
            </div>
        </div>
    </div>
    `,
    styles: [
        `.filters-container div {
            text-align: right;
            margin-bottom: 3%;
        }`,
        `.filters-container span {
            width: 30%;
            color: #70757B;
            font-size: 14px;
            font-weight: 400;
            margin-right: 13px;
            text-align: right;
        }`
    ]
})
export class ArtifactFiltersComponent implements OnInit, OnDestroy {
    
    @ViewChild('group') btnsToggleGroup: MatButtonToggleGroup;
    @Input() agileLayout: boolean;
    @Input() applicationId: number;
    private selectedSprint: Project;
    private releases: Release[];
    private get employees(): Employee[] {
        return this.employeeService.employees;
    }
    private parentArtifacts: Artifact[];
    private subscriptions: Subscription[] = [];

    @Output() changeAssignedto = new EventEmitter<number>();
    @Output() changeEpic = new EventEmitter<number>();
    @Output() changeSprint = new EventEmitter<number>();
    @Output() changeLayout = new EventEmitter<string>();
    
    constructor(
        private employeeService: EmployeeService,
        private projectsService: ProjectsService,
        private artifactsService: ArtifactsService
    ) {
        this.selectedSprint = new Project();
        this.selectedSprint.name = 'Select Sprint';
    }

    ngOnInit() {
        if (this.agileLayout) {
            //this.btnsToggleGroup.value = 'card';
            
            const epicsSubscription = this.artifactsService.parentArtifacts(this.applicationId)
                .subscribe(parentArtifacts => {
                    this.parentArtifacts = parentArtifacts;
                });
            this.subscriptions.push(epicsSubscription);
        }
        const releasesSubscription = this.projectsService.getProjectsByApplication(this.applicationId)
                .subscribe(releases => {
                    this.releases = releases;
                    if (this.releases.length) {
                        const projects = this.releases[this.releases.length-1].projects;
                        if (projects.length) {
                            const sprint = projects[projects.length-1];
                            this.onSprintChange(sprint);
                        }
                    }
                });
        this.subscriptions.push(releasesSubscription);
    }

    onAssignedtoChange(evt: {[key: string]: any}): void {
        this.changeAssignedto.emit(evt.target.value);
    }
    
    onEpicChange(evt: {[key: string]: any}): void {
        this.changeEpic.emit(evt.target.value);
    }

    onSprintChange(sprint: Project): void {
        this.selectedSprint = sprint;
        this.changeSprint.emit(sprint.id);
    }
    
    onLayoutChange(layout: string): void {
        this.changeLayout.emit(layout);
    }
    
    ngOnDestroy() {
        while(this.subscriptions.length !== 0) {
            this.subscriptions.pop().unsubscribe();
        }
    }
}
