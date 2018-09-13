import { Component, Input, OnInit, OnDestroy } from '@angular/core';

import { HomeService } from '../services/home.service';
import { Application } from '../../models/application.model';
import { GlobalSharedService } from '../../services';
import { Release } from '../../models/release.model';
import { Router } from '@angular/router';

@Component({
    selector: 'home-application',
    template: `
    <div style="display: flex; flex-direction: column; margin-left: 1%; margin-top: 1%;">
        <div class="spacing-horizontal-flexbox">
            <div class="spacing-horizontal-flexbox" style="flex: 1;">
                <div class="letter-box"><span>{{application.name.substr(0,1).toUpperCase()}}</span></div>
                <span style="font-size: 26px; color: var(--heading-text-color);">{{application.name}}</span>
                <span style="color: #CDD0D4; font-size: 20px;">&#46;</span>
                <a>members</a>
            </div>
            <div style="spacing-horizontal-flexbox">
                <a (click)="routeToArtifacts('agile')">Agile Board</a>
                <a (click)="routeToArtifacts('defects')">Defects</a>
                <a (click)="routeToArtifacts('backlog')">Backlog</a>
                <a (click)="routeToArtifacts('perm.doc')">Permanent Documentation</a>
            </div>
        </div>
        <span *ngFor="let release of releases;">
            <div style="display: flex; flex-direction: row; margin-top: 3%;">
                <div style="width: 99%; border-top: 1px solid #E5E8E8; display:">
                    <span style="position: relative; top: -10px; background: #ffffff; padding: 6px;">{{release.name}}</span>
                    <span style="position: relative; top: -25px; left: 23%; background: #ffffff; padding: 6px;">
                        <input type="radio" id="activeRadio" name="projectsGroup{{release.id}}" checked>
                        <label for="activeRadio">Active</label>
                    </span>
                    <span style="position: relative; top: -25px; left: 23%; background: #ffffff; padding: 6px;">
                        <input type="radio" id="completedRadio" name="projectsGroup{{release.id}}">
                        <label for="completedRadio">Completed</label>
                    </span>
                    <span style="position: relative; top: -10px; left: 40%; background: #ffffff; padding: 6px;">My Recent Activity</span>
                </div>
            </div>
            <div style="display: flex; flex-direction: row;">
                <div style="display: flex; flex-direction: column; width: 116%; margin-top: 1%;">
                    <home-project *ngFor="let project of release.projects" [project]="project"></home-project>
                </div>
                <recent-activity></recent-activity>
            </div>
        </span>
    </div>
    `,
    styles: [
        `.letter-box {
            display: flex; flex-direction: column; align-items: center; justify-content: center;
            width: 60px; height: 60px; border-radius: 6px;
            background: #F74750;
            font-size: 24px;
            font-weight: bold;
            color: #FFFFFF;
        }`, 
        `.spacing-horizontal-flexbox {
            display: flex; flex-direction: row; align-items: center;
        }`,
        `.spacing-horizontal-flexbox a {
            margin: 0px 15px;
            font-weight: bold;
            font-size: 16px;
        }`,
        `.spacing-horizontal-flexbox > span {
            margin-left: 15px;
        }`,
        `input[type='radio'] {
            display: none;
        }`,
        `input[type='radio'] + label {
            font-size: 16px;
            font-weight: bold;
            cursor: pointer;
            color: #CDD0D4;
        }`,
        `input[type='radio']:checked + label {
            color: var(--theme-color);
        }`
    ]
})

export class HomeApplicationComponent implements OnInit, OnDestroy {

    constructor(
        private homeService: HomeService,
        private globalService: GlobalSharedService,
        private router: Router
    ) {}

    @Input() application: Application;
    private releases: Release[];

    ngOnInit() {
        const subscription = this.homeService.getProjectsByApplication(this.globalService.user.id, this.application.id)
                                .subscribe(releases => this.releases = releases);
        this.homeService.subscriptions.push(subscription);
    }

    routeToArtifacts(route: string): void {
        this.router.navigateByUrl(`/home/${this.globalService.user.id}/${route}/${this.application.id}`);
    }

    ngOnDestroy() {

    }
}
