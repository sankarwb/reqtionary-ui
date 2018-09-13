import { Component, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { HomeService } from '../services/home.service';
import { Application } from '../../models/application.model';

@Component({
    selector: 'app-home',
    template: `
    <div style="display: flex; flex-direction: column;">
        <div class="welcome-container">
            <span style="font-size: 32px;">Hello, {{homeService.globalService.user?.firstName}} {{homeService.globalService.user?.lastName}}</span>
            <p style="font-size: 16px;">you are involved with (4) projects. Here you can track how is going with all your projects.</p>
        </div>
        <home-application *ngFor="let application of applications;" [application]="application"></home-application>
    </div>
    `,
    styles: [
        `.welcome-container {
            display: flex; flex-direction: column; margin-top: 1%; margin-left: 1%;
            color: var(--descriptive-text-color);
            border-bottom: 1px solid var(--border-line-color);
        }`
    ]
})

export class HomeComponent implements OnDestroy {

    constructor(
        private activatedRoute: ActivatedRoute,
        private homeService: HomeService
    ) {
        this.activatedRoute.params.subscribe(params => {
            this.homeService.getUser(params.userId);
            const subscription = this.homeService.getApplicationsByUser(params.userId)
                                    .subscribe(applications => this.applications = applications);
            this.homeService.subscriptions.push(subscription);
        });
    }

    private applications: Application[];

    ngOnDestroy() {
        this.homeService.unsubscribe();
    }
}
