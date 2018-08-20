import { Component, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

import { HomeService } from '../services/home.service';

@Component({
    selector: 'app-home',
    template: `
    <div style="display: flex; flex-direction: row; align-items: center; justify-content: center; height: 100%;">
        Home Module
    </div>
    `
})

export class HomeComponent implements OnDestroy {

    constructor(private homeService: HomeService) {}

    private subscription: Subscription;

    ngOnDestroy() {
        if (this.subscription) {
            this.subscription.unsubscribe();
        }
    }
}
