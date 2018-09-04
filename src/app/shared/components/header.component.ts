import { Component, OnInit } from '@angular/core';
import { EventsService, GlobalSharedService } from '../../services';

@Component({
  selector: 'app-header',
  template: `
    <div style="display: flex; align-items: stretch; height: 75px; font-size: 16px;">
        <div style="display: flex; align-items: center;">
            <a mat-button routerLink=".">
                <strong style="color: var(--theme-color);" [style.fontSize]="(appSelected?40:26)+'px'">
                    {{appSelected?' W ':' WINDBRICKS '}}
                </strong>
            </a>
        </div>
        <div class="header-items-container">
            <a mat-button style="padding-left: 5px;">Home</a>
            <a mat-button style="padding-left: 5px;">Org Chart</a>
            <app-search-box (searchTextChange)="searchChange($event)"></app-search-box>
        </div>
        <div style="display: flex; align-items: center; padding-right: 15px;">
            <label style="padding-right: 10px;">{{globalService.user?.firstName}} {{globalService.user?.lastName}}</label>
            <img src="../../../assets/user_thumbnail.jpg" class="thumbnail">
            <mat-icon style="color: var(--theme-color);">expand_more</mat-icon>
        </div>
    </div>
  `,
  styles: [
      `.header-items-container {
        display: flex;
        align-items: center;
        flex: 1;
        border-bottom-left-radius: 20px;
        box-shadow: -5px 0px 20px rgb(0, 0, 0, 0.05);
        color: var(--theme-color);
      }`,
      `.thumbnail {
        max-width: 36px;
        height: auto;
        margin-right: 10px;
        border-radius: 50%;
        border: 1px solid var(--theme-color);
      }
      `
  ]
})
export class HeaderComponent implements OnInit {
    constructor(
        private eventsService: EventsService,
        private globalService: GlobalSharedService
    ) {}

    private appSelected: string;

    ngOnInit() {
        this.eventsService.appSelectionChange.subscribe((appselected: string) => {
            this.appSelected = appselected;
        });
    }

    searchChange(searchTxt: string): void {
        console.log(searchTxt);
    }
}
