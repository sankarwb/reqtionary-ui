import {Component} from '@angular/core';
import {
    Router,
    NavigationEnd
} from '@angular/router';
import {filter} from 'rxjs/operators';

import {AppRoute} from '../../app-route.enum';
import {GlobalSharedService, EventsService} from '../../services';

@Component({
  selector: 'app-header',
  template: `
    <div style="display: flex; align-items: stretch; height: 75px; font-size: 16px;">
        <div style="display: flex; align-items: center;">
            <a mat-button (click)="routeToHome()">
                <strong style="color: var(--theme-color);font-weight: bold;" [style.fontSize]="(resizeLogo?40:26)+'px'">
                    {{resizeLogo?' W ':' WINDBRICKS '}}
                </strong>
            </a>
        </div>
        <div class="header-items-container">
            <div class="flex-box-row-vertical-center" style="flex: 1;" *ngIf="resizeLogo">
                <span style="width: 1%;"></span>
                <div class="flex-box-column-center" style="margin: 0 4%; width: 48px; height: 48px; border-radius: 4px; box-shadow: 0px 0px 16px rgba(0, 0, 0, 0.12);">
                    <span style="font-size: 22px; font-weight: bold;">{{application.substr(0,1)}}</span>
                </div>
                <span style="font-size: 18px; font-weight: bold; color: #70757B;">{{application}}</span>
                <span style="color: #E5E8E8; margin: 0 2%;"> &bull; </span>
                <a style="font-size: 14px; color: #70757B;">Members</a>
            </div>
            <div class="flex-box-row" style="flex: 1;">
                <app-search-box *ngIf="resizeLogo" (searchTextChange)="searchChange($event)"></app-search-box>
                <a mat-button style="padding-left: 5px;">Home</a>
                <a mat-button style="padding-left: 5px;">Org Chart</a>
                <a mat-button style="padding-left: 5px;" (click)="routeToAdmin()">Admin Settings</a>
                <app-search-box *ngIf="!resizeLogo" (searchTextChange)="searchChange($event)"></app-search-box>
            </div>
            <user-thumbnail [src]="'./../../../assets/user_thumbnail.jpg'" [employee]="globalService.employee"></user-thumbnail>
            <div class="dropdown">
                <span class="dropbtn"><mat-icon style="color: var(--theme-color);">expand_more</mat-icon></span>
                <div class="dropdown-content">
                    <a href="#">Logout</a>
                </div>
            </div>
        </div>
    </div>
  `,
  styles: [
    `.header-items-container {
        display: flex;
        align-items: center;
        width: 100%;
        border-bottom-left-radius: 20px;
        box-shadow: -5px 0px 20px rgb(0, 0, 0, 0.12);
        color: var(--theme-color);
    }`,
    `.dropbtn {
        color: white;
        font-size: 16px;
        border: none;
        cursor: pointer;
    }`,
    `.dropdown {
        position: relative;
        display: inline-block;
    }`,    
    `.dropdown-content {
        display: none;
        position: absolute;
        background-color: #f9f9f9;
        min-width: 80px;
        box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.2);
        padding: 6px 10px;
        right: 10px;
        z-index: 1;
    }`,
    `.dropdown-content a {
        color: var(--theme-color);
        font-size: 14px;
        text-decoration: none;
        display: block;
    }`,
    `.dropdown-content a:hover {
        background-color: #f1f1f1
    }`,
    `.dropdown:hover .dropdown-content {
        display: block;
    }`
  ]
})
export class HeaderComponent {
    resizeLogo: boolean;
    private application: string;

    constructor(
        public globalService: GlobalSharedService,
        private eventsService: EventsService,
        private router: Router
    ) {
        this.router.events.pipe(filter(event => event instanceof NavigationEnd)).subscribe((event: NavigationEnd) => {
            this.resizeLogo = (event.url.split('/').length > 3);
        });

        this.eventsService.applicationSelected.subscribe(application => {
            this.application = application;
        });
    }

    routeToHome(): void {
        this.router.navigate([AppRoute.HOME, this.globalService.employee.id]);
    }

    routeToAdmin(): void {
        this.router.navigateByUrl(AppRoute.ADMIN_SETTINGS);
    }

    searchChange(searchTxt: string): void {
        console.log(searchTxt);
    }
}
