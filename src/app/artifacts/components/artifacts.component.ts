import { Component, OnInit, OnDestroy } from "@angular/core";
import { ActivatedRoute } from "@angular/router";

import { ArtifactsService } from "../services";
import { HomeService } from "../../home/services/home.service";

@Component({
    selector: 'artifacts',
    templateUrl: 'artifacts.component.html'
})
export class ArtifactsComponent implements OnInit, OnDestroy {
    constructor(
        private activatedRoute: ActivatedRoute,
        private homeService: HomeService,
        private artifactsService: ArtifactsService
    ) {
        this.activatedRoute.params.subscribe(params => {
            this.homeService.getUser(params.userId);
        });
        const subscription = this.activatedRoute.params.subscribe(routeParams => this.applicationId = routeParams.applicationId);
        this.artifactsService.subscriptions.push(subscription);
    }

    private applicationId: number;

    ngOnInit() {
        
    }

    onAssignedtoChange(assignedTo: string): void {

    }

    onApplicationChange(application: string): void {
        
    }
    
    onProjectChange(project: string): void {
        
    }
    
    onSprintChange(sprint: string): void {
        
    }
    
    onLayoutChange(layout: string): void {
        
    }

    ngOnDestroy() {

    }
}