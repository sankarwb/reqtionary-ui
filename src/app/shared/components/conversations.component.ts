import {Component, Input} from '@angular/core';

@Component({
    selector: 'conversations',
    template: '<conversation *ngFor="let conversation of conversations;" [conversation]="conversation"></conversation>'
})

export class ConversationsComponent {

    @Input() conversations: any[];
    constructor() {}
}