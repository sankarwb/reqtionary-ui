import { Component, OnInit } from '@angular/core';
import { EventsService, GlobalSharedService } from '../services';

@Component({
  selector: 'app-header',
  template: `
    <div style="display: flex; align-items: stretch; height: 75px;">
        <div style="display: flex; align-items: center;">
            <a mat-button routerLink=".">
                <strong style="color: #02aecc;" [style.fontSize]="(appSelected?30:20)+'px'"> {{appSelected?'W':'WINDBRICKS'}} </strong>
            </a>
        </div>
        <div class="header-items-container">
            <a>Home</a>
            <a>Org Chart</a>
        </div>
    </div>
  `,
  styles: [
      `.header-items-container {
        display: flex;
        align-items: center;
        flex: 1;
        border-bottom-left-radius: 16px;
        box-shadow: -5px 0px 20px rgb(0, 0, 0, 0.05);
        color: #02aecc;
      }`
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
}
