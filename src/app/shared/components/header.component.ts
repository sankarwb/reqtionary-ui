import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';

import { GlobalSharedService } from '../../services';

@Component({
  selector: 'app-header',
  template: `
    <div style="display: flex; align-items: stretch; height: 75px; font-size: 16px;">
        <div style="display: flex; align-items: center;">
            <a mat-button routerLink="/home/31">
                <strong style="color: var(--theme-color);font-weight: bold;" [style.fontSize]="(resizeLogo?40:26)+'px'">
                    {{resizeLogo?' W ':' WINDBRICKS '}}
                </strong>
            </a>
        </div>
        <div class="header-items-container">
            <div style="display: flex; flex-direction: row; flex: 1;">
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
    </div>
  `,
  styles: [
      `.header-items-container {
        display: flex;
        align-items: center;
        width: 100%;
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
        private router: Router,
        private globalService: GlobalSharedService
    ) {
        this.router.events.pipe(filter(event => event instanceof NavigationEnd)).subscribe((event: NavigationEnd) => {
            this.resizeLogo = (event.url.split('/').length > 3);
        });
    }

    private resizeLogo: boolean;

    ngOnInit() {
        
    }

    searchChange(searchTxt: string): void {
        console.log(searchTxt);
    }
}
