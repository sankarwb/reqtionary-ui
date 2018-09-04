import { Component, Input } from '@angular/core';

@Component({
    selector: 'recent-activity',
    template: `
    <div style="display: flex; flex-direction: column; max-height: 350px;">
        <div style="height: 100px; margin-bottom: 10px; line-height: 16px; border-radius: 6px; box-shadow: 0px 0px 14px 0px rgba(0, 0, 0, 0.1); display: flex; flex-direction: column; justify-content: center;" *ngFor="let activity of activities;">
            <span style="font-size: 14px; padding: 4px;"> {{activity}} </span>
        </div>
    </div>
    `
})
export class RecentActivityComponent {

    @Input() activities: string[] = [
        'Vamsi changed the status of DE 12 on 20th, Sept.',
        'Vamsi changed the status of DE 12 on 20th, Sept.',
        'Vamsi changed the status of DE 12 on 20th, Sept. Vamsi changed the status of DE 12 on 20th, Sept.',
        'Vamsi changed the status of DE 12 on 20th, Sept. Vamsi changed the status of DE 12 on 20th, Sept. Vamsi changed the status of DE 12 on 20th, Sept.',
        'Vamsi changed the status of DE 12 on 20th, Sept. Vamsi changed the status of DE 12 on 20th, Sept.',
        'Vamsi changed the status of DE 12 on 20th, Sept.',
        'Vamsi changed the status of DE 12 on 20th, Sept. Vamsi changed the status of DE 12 on 20th, Sept.',
        'Vamsi changed the status of DE 12 on 20th, Sept. Vamsi changed the status of DE 12 on 20th, Sept. Vamsi changed the status of DE 12 on 20th, Sept.'
    ];
}