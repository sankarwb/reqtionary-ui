import { Component } from '@angular/core';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';
import { GlobalSharedService } from '../services/globalShared.service';
import {filter} from 'rxjs/operators';

@Component({
    selector: 'user-layout',
    template:`
    <mat-sidenav-container class="sidenav-container">
        <mat-sidenav mode="side" opened="true" class="sideNav">
            <mat-grid-list cols="1" rowHeight="1:1">
                <mat-grid-tile style="opacity: 0.27; text-align: center; cursor: pointer;" [ngStyle]="{'background': (router.url.includes(icon.link))?'#212121':'none'}" *ngFor="let icon of leftNavList" [routerLink]="[icon.link, globalService.currentAppId]">
                    <ul>
                        <li>
                            <button mat-icon-button style="background: white;">
                                <mat-icon>{{icon.icon}}</mat-icon>
                            </button>
                        </li>
                        <li><h6 style="color: white;">{{icon.label}}</h6></li>
                    </ul>
                </mat-grid-tile>
            </mat-grid-list>
        </mat-sidenav>
        <mat-sidenav-content>
            <div class="app-breadcrumb">
                    <ul class="breadcrumb" style="background: transparent; flex: 1;" *ngIf="globalService.currentAppId">
                      <li><a routerLink="/home" routerLinkActive="active" class="active">Home</a></li>
                      <li>{{breadcrumb}}</li>
                      <!-- <li [ngClass]="{active:idx!==globalService.breadcrumb.length-1}" *ngFor="let route of globalService.breadcrumb;let idx=index;">
                          <a *ngIf="idx!==breadcrumb.length-1" [routerLink]="route.url" routerLinkActive="active">{{route.label}}</a>
                          <span *ngIf="idx===breadcrumb.length-1">{{route.label}}</span>
                      </li> -->
                    </ul>
                <!--<ul class="breadcrumb" style="background: none;">
                    <li><a routerLink="/home" routerLinkActive="active" class="active">Home</a></li>
                    <li><a routerLink="/home" routerLinkActive="active" class="active">Applications</a></li>
                    <li><a routerLink="/home" routerLinkActive="active" class="active">Backlog</a></li>
                </ul>-->
            </div>
            <router-outlet></router-outlet>
        </mat-sidenav-content>
    </mat-sidenav-container>
    `,
    styles:[
        `.sidenav-container {
            position: absolute;
            width: 100%;
            height: 91.8%;
          }`,
          `.sideNav{
            width:7%;background-color: #37474f;box-shadow: inset 4px 6px 20px 0 rgba(0, 0, 0, 0.55);overflow:hidden;
          }`,
          `.mat-grid-tile {
            top: 68px;
          }`,
          `.mat-drawer-content.mat-sidenav-content {
              margin-left: 7% !important;
          }`
    ]
})

export class UserLayoutComponent {
    leftNavList: any[] = [
        {
            icon: 'move_to_inbox',
            label: 'BACKLOG',
            link: '/backlog'
        },
        {
            icon: 'view_column',
            label: 'AGILE BOARD',
            link: '/agileboard'
        },
        {
            icon: 'bug_report',
            label: 'DEFECTS',
            link: '/defects'
        },
        {
            icon: 'insert_drive_file',
            label: 'Perm. Doc',
            link: '/permanentdocumentation'
        },
    ];
    breadcrumb:string|null = "";
    constructor(private globalService: GlobalSharedService, private router: Router, private activatedRoute: ActivatedRoute) {
        this.router.events.pipe(filter(event => event instanceof NavigationEnd)).subscribe(event => {      
            let root: ActivatedRoute = this.activatedRoute.root,
                    children: ActivatedRoute[] = this.activatedRoute.children;
            for (let child of children) {
                this.breadcrumb = child.snapshot.data?child.snapshot.data['title']:null;
            }
        });
    }
}