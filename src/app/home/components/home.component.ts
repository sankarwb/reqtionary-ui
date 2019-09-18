import {
    Component,
    OnDestroy,
    ViewChildren,
    QueryList
} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Observable} from 'rxjs';

import {GlobalSharedService} from '../../services/global-shared.service';
import {HomeApplicationComponent} from './home-application.component';
import {Application} from '../../models/application.model';

@Component({
    selector: 'app-home',
    template: `
    <div style="display: flex; flex-direction: column;">
        <div class="welcome-container">
            <span style="font-size: 32px;">Hello, {{globalService.employee?.firstName}} {{globalService.employee?.lastName}}</span>
            <p style="font-size: 16px;">you are involved with (<span style="color: var(--theme-color);">{{getProjectsCount()|async}}</span>) projects. Here you can track how is going with all your projects.</p>
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

    @ViewChildren(HomeApplicationComponent) applicationComponents: QueryList<HomeApplicationComponent>;
    applications: Application[];

    constructor(
        private activatedRoute: ActivatedRoute,
        public globalService: GlobalSharedService
    ) {
        this.applications = this.activatedRoute.snapshot.data['applications'];
    }

    getProjectsCount(): Observable<number> {
        return new Observable(observer => {
            let count = 0;
            if (this.applicationComponents && this.applicationComponents.length) {
                this.applicationComponents.forEach(component => {
                    component.releases.forEach(release => {
                        count += release.projects.length;
                    });
                });
            }
            observer.next(count);
            observer.complete();
        });
    }

    ngOnDestroy() {
        
    }
}
