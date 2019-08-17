import {Component, Input, OnInit, OnDestroy} from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';
import {Subscription} from 'rxjs';

import {Artifact} from '../../models/artifact.model';
import {AppRoute} from '../../app-route.enum';
import {GlobalSharedService} from '../../services';

@Component({
    selector: 'agile-artifact-card',
    template: `
    <div class="flex-box-column" style="width: 98%; max-height: 235px; margin: 3px 0; border-radius: 4px; box-shadow: 0px 0px 14px rgba(0, 0, 0, 0.12);">
        <div class="flex-box-row-vertical-center" style="width: 100%; height: 15%;">
            <span style="flex: 1; font-size: 12px; font-weight: bold; margin-left: 2%;" [style.color]="artifact.color">{{artifact.UID}}</span>
            <mat-icon style="margin-right: 2%;" (click)="onEditClick()">edit</mat-icon>
        </div>
        <div style="width: 100%; height: 70%; color: #70757B; font-size: 12px; padding: 4px; border-top: 1px solid var(--border-line-color); border-bottom: 1px solid var(--border-line-color);">{{artifact.name}}</div>
        <div class="flex-box-row-vertical-center" style="width: 100%; height: 15%;">
            <span style="color: #70757B; flex: 1; font-size: 12px; margin-left: 2%;">{{artifact.actualPoints}}</span>
            <user-thumbnail [src]="'./../../../assets/user_thumbnail.jpg'" [small]="true"></user-thumbnail>
        </div>
    </div>
    `,
    styles: [
        ``
    ]
})
export class AgileArtifactCardComponent implements OnInit, OnDestroy {

    @Input() artifact: Artifact;
    private applicationId: number;
    private subscriptions: Subscription[] = [];

    constructor(
        private globalService: GlobalSharedService,
        private route: ActivatedRoute,
        private router: Router
    ) {}
    
    ngOnInit() {
        const subscription = this.route.params.subscribe(routeParams => {
            this.applicationId = routeParams.applicationId;
        });
        this.subscriptions.push(subscription);
    }

    onEditClick(): void {
        this.router.navigate([AppRoute.HOME, this.globalService.employee.id, AppRoute.ARTIFACT, this.applicationId, 'edit', this.artifact.id]);
    }

    ngOnDestroy() {
        while (this.subscriptions.length !== 0) {
            this.subscriptions.pop().unsubscribe();
        }
    }
}