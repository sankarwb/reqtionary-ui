import {
    Component,
    Input,
    OnInit,
    Output,
    EventEmitter,
    ViewChild
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

@Component({
    selector: 'artifact-filters',
    template: `
    <div class="flex-box-row">
        <div class="flex-box-column-justify-center filters-container" style="width: 60%;">
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
        <div class="flex-box-column-justify-center filters-container" style="width: 40%;">
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
                <button mat-button [matMenuTriggerFor]="releasesMenu">{{selectedStrint.name}}</button>
            </div>
            <div style="text-align: center;">
                <mat-button-toggle-group #group="matButtonToggleGroup">
                    <mat-button-toggle value="card">
                        <mat-icon>apps</mat-icon>
                    </mat-button-toggle>
                    <mat-button-toggle value="list">
                        <mat-icon>list</mat-icon>
                    </mat-button-toggle>
                </mat-button-toggle-group>
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
        }`,
        `.filters-container select {
            width: 65%;
            border-radius: 6px;
            padding: 4px;
            margin: 0;
            border: 1px solid #CDD0D4;
            color: #95989C;
            font-size: 14px;
            outline: none;
            cursor: pointer;
        }`,
        `.filters-container select:focus {
            
        }`
    ]
})
export class ArtifactFiltersComponent implements OnInit {
    constructor(
        private employeeService: EmployeeService,
        private projectsService: ProjectsService,
        private artifactsService: ArtifactsService
    ) {
        this.selectedStrint = new Project();
        this.selectedStrint.name = 'Select Strint';
    }

    @ViewChild('group') btnsToggleGroup: MatButtonToggleGroup;
    @Input() 
    private applicationId: number;
    private selectedStrint: Project;
    private releases: Release[];
    private employees: Employee[];
    private parentArtifacts: Artifact[];

    @Output() changeAssignedto = new EventEmitter<number>();
    @Output() changeEpic = new EventEmitter<number>();
    @Output() changeSprint = new EventEmitter<number>();
    @Output() changeLayout = new EventEmitter<string>();

    ngOnInit() {
        this.btnsToggleGroup.value = 'card';
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

        const emploeesSubscription = this.employeeService.getEmployeesByApplication(this.applicationId)
            .subscribe(employees => {
                this.employees = employees;
            });

        const epicsSubscription = this.artifactsService.parentArtifacts(this.applicationId)
            .subscribe(parentArtifacts => {
                this.parentArtifacts = parentArtifacts;
            });
    }

    onAssignedtoChange(evt: {[key: string]: any}): void {
        this.changeAssignedto.emit(evt.target.value);
    }
    
    onEpicChange(evt: {[key: string]: any}): void {
        this.changeEpic.emit(evt.target.value);
    }

    onSprintChange(sprint: Project): void {
        this.selectedStrint = sprint;
        this.changeSprint.emit(sprint.id);
    }
    
    onLayoutChange(layout: string): void {
        this.changeLayout.emit(layout);
    }
    
}
