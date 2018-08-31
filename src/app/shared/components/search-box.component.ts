import { Component, Output, EventEmitter } from '@angular/core';

@Component({
    selector: 'app-search-box',
    template: `
    <div style="border-radius: 2px; box-shadow: 0px 0px 16px rgba(0, 0, 0, 0.10); padding: 0 5px;">
        <input type="text" class="search-input" placeholder="Type in something to search" (input)="inputChange($event)">
        <mat-icon class="search-icon">search</mat-icon>
    </div>
    `,
    styles: [
        `.search-input {
            width: 220px;
            height: 40px;
            border: 0;
            border-radius: 2px;
        }
        `,
        `.search-input::placeholder {
            opacity: 0.5;
        }
        `,
        `.search-icon {
            position: relative;
            top: 8px;
            right: 5px;
            color: #ccc;
        }
        `
    ]
})
export class SearchBoxComponent {
    constructor() {}

    @Output() searchTextChange = new EventEmitter();

    inputChange(evt: any): void {
        this.searchTextChange.emit(evt.target.value);
    }
}
