import {Component} from '@angular/core';
import {Router} from '@angular/router';
import { GlobalSharedService } from 'src/app/services';

@Component({
    selector: 'navigation-panel',
    template: `
    <div class="flex-box-column" style="width: 85px; height: 100%; margin-right: 1%; border-top-right-radius: 20px; box-shadow: 5px 0px 20px rgb(0, 0, 0, 0.12); color: var(--theme-color);">
        <div style="height: 110px;"></div>
        <div class="flex-box-column-center" [ngClass]="{'navigation-icons-gradient-background': router.url.includes('agile')}"
            (click)="route('agile')"
            style="margin-top: 2%; margin-bottom: 20px; height: 80px; border-radius: 4px; cursor: pointer;">
            <mat-icon [style.color]="router.url.includes('agile')?'#FFFFFF':'var(--theme-color)'">view_week</mat-icon>
            <span style="font-size: 12px;" [style.color]="router.url.includes('agile')?'#FFFFFF':'var(--theme-color)'">Agile Board</span>
        </div>
        <div class="flex-box-column-center" [ngClass]="{'navigation-icons-gradient-background': router.url.includes('defects')}"
            (click)="route('defects')"
            style="margin-bottom: 20px; height: 80px; border-radius: 4px; cursor: pointer;">
            <mat-icon [style.color]="router.url.includes('defects')?'#FFFFFF':'var(--theme-color)'">bug_report</mat-icon>
            <span style="font-size: 12px;" [style.color]="router.url.includes('defects')?'#FFFFFF':'var(--theme-color)'">Defects</span>
        </div>
        <div class="flex-box-column-center" [ngClass]="{'navigation-icons-gradient-background': router.url.includes('backlog')}"
            (click)="route('backlog')"    
            style="margin-bottom: 20px; height: 80px; border-radius: 4px; cursor: pointer;">
            <mat-icon [style.color]="router.url.includes('backlog')?'#FFFFFF':'var(--theme-color)'">view_list</mat-icon>
            <span style="font-size: 12px;" [style.color]="router.url.includes('backlog')?'#FFFFFF':'var(--theme-color)'">Backlog</span>
        </div>
        <div class="flex-box-column-center" [ngClass]="{'navigation-icons-gradient-background': router.url.includes('perm.doc')}"
            (click)="route('perm.doc')"
            style="margin-bottom: 20px; height: 80px; border-radius: 4px; cursor: pointer;">
            <mat-icon [style.color]="router.url.includes('perm.doc')?'#FFFFFF':'var(--theme-color)'">dns</mat-icon>
            <span style="font-size: 12px;" [style.color]="router.url.includes('perm.doc')?'#FFFFFF':'var(--theme-color)'">Perm. Doc</span>
        </div>
        <div style="height: 65px;"></div>
    </div>
    `
})
export class NavigationPanelComponent {
    constructor(
        private globalService: GlobalSharedService,
        public router: Router) {}

    route(uri: string): void {
        let url = `/home/${this.globalService.employee.id}/${uri}/${this.globalService.currentApplicationId}`;
        switch (uri) {
            case 'defects':
                url += `/${this.globalService.currentDefectsProjectId}`;
                break;
            case 'backlog':
                url += `/${this.globalService.currentBacklogProjectId}`;
                break;
            case 'perm.doc':
                url += `/${this.globalService.currentPermDocProjectId}`;
                break;
        }
        this.router.navigateByUrl(url);
    }
}