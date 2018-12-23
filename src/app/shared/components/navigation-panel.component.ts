import {Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import {Router} from '@angular/router';
import {GlobalSharedService} from '../../services';

@Component({
    selector: 'navigation-panel',
    template: `
    <div class="flex-box-column" *ngIf="type==='artifactslist'"
        style="width: 85px; height: 100%; margin-right: 1%; border-top-right-radius: 20px; box-shadow: 5px 0px 20px rgb(0, 0, 0, 0.12); color: var(--theme-color);">
        <div style="height: 110px;"></div>
        <div class="flex-box-column-center" [ngClass]="{'navigation-icons-gradient-background': router.url.includes('agile')}"
            (click)="navigate('agile')"
            style="margin-top: 2%; margin-bottom: 20px; height: 80px; border-radius: 4px; cursor: pointer;">
            <mat-icon [style.color]="router.url.includes('agile')?'#FFFFFF':'var(--theme-color)'">view_week</mat-icon>
            <span style="font-size: 12px;" [style.color]="router.url.includes('agile')?'#FFFFFF':'var(--theme-color)'">Agile Board</span>
        </div>
        <div class="flex-box-column-center" [ngClass]="{'navigation-icons-gradient-background': router.url.includes('defects')}"
            (click)="navigate('defects')"
            style="margin-bottom: 20px; height: 80px; border-radius: 4px; cursor: pointer;">
            <mat-icon [style.color]="router.url.includes('defects')?'#FFFFFF':'var(--theme-color)'">bug_report</mat-icon>
            <span style="font-size: 12px;" [style.color]="router.url.includes('defects')?'#FFFFFF':'var(--theme-color)'">Defects</span>
        </div>
        <div class="flex-box-column-center" [ngClass]="{'navigation-icons-gradient-background': router.url.includes('backlog')}"
            (click)="navigate('backlog')"    
            style="margin-bottom: 20px; height: 80px; border-radius: 4px; cursor: pointer;">
            <mat-icon [style.color]="router.url.includes('backlog')?'#FFFFFF':'var(--theme-color)'">view_list</mat-icon>
            <span style="font-size: 12px;" [style.color]="router.url.includes('backlog')?'#FFFFFF':'var(--theme-color)'">Backlog</span>
        </div>
        <div class="flex-box-column-center" [ngClass]="{'navigation-icons-gradient-background': router.url.includes('perm.doc')}"
            (click)="navigate('perm.doc')"
            style="margin-bottom: 20px; height: 80px; border-radius: 4px; cursor: pointer;">
            <mat-icon [style.color]="router.url.includes('perm.doc')?'#FFFFFF':'var(--theme-color)'">dns</mat-icon>
            <span style="font-size: 12px;" [style.color]="router.url.includes('perm.doc')?'#FFFFFF':'var(--theme-color)'">Perm. Doc</span>
        </div>
        <div style="height: 65px;"></div>
    </div>
    <div class="flex-box-column" *ngIf="type==='artifact'"
        style="width: 85px; height: 100%; margin-right: 1%; border-top-right-radius: 20px; box-shadow: 5px 0px 20px rgb(0, 0, 0, 0.12); color: var(--theme-color);">
        <div style="height: 60px;"></div>
        <div class="flex-box-column-center" [ngClass]="{'navigation-icons-gradient-background': activeSection.includes('details')}"
            (click)="setActiveSection('details')"
            style="margin-top: 2%; margin-bottom: 20px; height: 80px; border-radius: 4px; cursor: pointer;">
            <mat-icon [style.color]="activeSection.includes('details')?'#FFFFFF':'#4DB2F3'">view_week</mat-icon>
            <span style="font-size: 12px;" [style.color]="activeSection.includes('details')?'#FFFFFF':'#4DB2F3'">Details</span>
        </div>
        <div class="flex-box-column-center" [ngClass]="{'navigation-icons-gradient-background': activeSection.includes('comments')}"
            (click)="setActiveSection('comments')"
            style="margin-bottom: 20px; height: 80px; border-radius: 4px; cursor: pointer;">
            <mat-icon [style.color]="activeSection.includes('comments')?'#FFFFFF':'#4DB2F3'">comment</mat-icon>
            <span style="font-size: 12px;" [style.color]="activeSection.includes('comments')?'#FFFFFF':'#4DB2F3'">Comments</span>
        </div>
        <div class="flex-box-column-center" [ngClass]="{'navigation-icons-gradient-background': activeSection.includes('associations')}"
            (click)="setActiveSection('associations')"    
            style="margin-bottom: 20px; height: 80px; border-radius: 4px; cursor: pointer;">
            <mat-icon [style.color]="activeSection.includes('associations')?'#FFFFFF':'#4DB2F3'">link</mat-icon>
            <span style="font-size: 12px;" [style.color]="activeSection.includes('associations')?'#FFFFFF':'#4DB2F3'">Associations</span>
        </div>
        <div class="flex-box-column-center" [ngClass]="{'navigation-icons-gradient-background': activeSection.includes('attachments')}"
            (click)="setActiveSection('attachments')"
            style="margin-bottom: 20px; height: 80px; border-radius: 4px; cursor: pointer;">
            <mat-icon [style.color]="activeSection.includes('attachments')?'#FFFFFF':'#4DB2F3'">attachment</mat-icon>
            <span style="font-size: 12px;" [style.color]="activeSection.includes('attachments')?'#FFFFFF':'#4DB2F3'">Attachments</span>
        </div>
        <div class="flex-box-column-center" [ngClass]="{'navigation-icons-gradient-background': activeSection.includes('history')}"
            (click)="setActiveSection('history')"
            style="margin-bottom: 20px; height: 80px; border-radius: 4px; cursor: pointer;">
            <mat-icon [style.color]="activeSection.includes('history')?'#FFFFFF':'#4DB2F3'">history</mat-icon>
            <span style="font-size: 12px;" [style.color]="activeSection.includes('history')?'#FFFFFF':'#4DB2F3'">History</span>
        </div>
    </div>
    `
})
export class NavigationPanelComponent implements OnInit {

    activeSection: string;
    @Input() type: string;
    @Output() changeSection = new EventEmitter<string>();
    constructor(
        private globalService: GlobalSharedService,
        public router: Router
    ) {}

    ngOnInit() {
        this.activeSection = 'details';
        this.changeSection.emit('details');
    }

    navigate(uri: string): void {
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

    setActiveSection(section: string): void {
        this.activeSection = section;
        this.changeSection.emit(section);
    }
}