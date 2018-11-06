import {Component} from '@angular/core';

@Component({
    selector: 'spinner',
    template: `
    <div style="position: absolute; left: 50%; top: 50%;">
        <mat-progress-spinner
            color="primary"
            mode="indeterminate"
            value="100">
        </mat-progress-spinner>
    </div>
    `
})

export class SpinnerComponent {

    constructor() {}

}
