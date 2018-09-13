import { Component, Input, OnInit, Output, EventEmitter } from "@angular/core";

import { ArtifactsService } from "../services";
import { EmployeeService, GlobalSharedService } from "../../services";
import { HomeService } from "../../home/services/home.service";
import { Release } from "../../models/release.model";
import { Employee } from "../../models/employee.model";
import { Artifact } from "../../models/artifact.model";

@Component({
    selector: 'artifact-filters',
    template: `
    <div class="filters-container">
        <div>
            <span>Assigned To</span>
            <select>
                <option>Show All</option>
                <option *ngFor="let employee of employees;">{{employee.firstName}} {{employee.lastName}}</option>
            </select>
        </div>
        <div>
            <span>Select Program</span>
            <select>
                <option>Show All</option>
            </select>
        </div>
        <div>
            <span>Epic</span>
            <select>
                <option>Show All</option>
                <option *ngFor="let artifact of parentArtifacts;">{{artifact.name}}</option>
            </select>
        </div>
        <div>
            <span>Select Sprint</span>
            <select>
                <option>Show All</option>
            </select>
        </div>
    </div>
    `,
    styles: [
        `.filters-container {
            display: flex; flex-direction: row; flex-wrap: wrap;
        }`,
        `.filters-container div {
            width: 50%;
            text-align: right;
            margin-bottom: 3%;
        }`,
        `.filters-container span {
            width: 50%;
            color: #70757B;
            font-size: 14px;
            font-weight: 400;
            margin-right: 13px;
            text-align: right;
        }`,
        `.filters-container select {
            width: 50%;
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
        private globalService: GlobalSharedService,
        private artifactsService: ArtifactsService,
        private homeService: HomeService,
        private employeeService: EmployeeService
    ) {}

    @Input() 
    private applicationId: number;
    private releases: Release[];
    private employees: Employee[];
    private parentArtifacts: Artifact[];

    @Output() changeAssignedto = new EventEmitter<string>();
    @Output() changeApplication = new EventEmitter<string>();
    @Output() changeProject = new EventEmitter<string>();
    @Output() changeSprint = new EventEmitter<string>();
    @Output() changeLayout = new EventEmitter<string>();

    ngOnInit() {
        const releasesSubscription = this.homeService.getProjectsByApplication(31, this.applicationId)
            .subscribe(releases => {
                this.releases = releases;
            });

        const emploeesSubscription = this.employeeService.getUsersByApplication(this.applicationId)
            .subscribe(employees => {
                this.employees = employees;
            });

        const epicsSubscription = this.artifactsService.parentArtifacts(this.applicationId)
            .subscribe(parentArtifacts => {
                this.parentArtifacts = parentArtifacts;
            });
    }

    onAssignedtoChange(assigedTo: string): void {
        this.changeAssignedto.emit(assigedTo);
    }
    
    onApplicationChange(application: string): void {
        this.changeApplication.emit(application);
    }
    
    onProjectChange(project: string): void {
        this.changeProject.emit(project);
    }
    
    onSprintChange(sprint: string): void {
        this.changeSprint.emit(sprint);
    }
    
    onLayoutChange(layout: string): void {
        this.changeLayout.emit(layout);
    }
    
}
