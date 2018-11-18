import {Component, Input} from '@angular/core';
import {Employee} from '../../models/employee.model';

@Component({
    selector: 'user-thumbnail',
    template: `
    <div style="display: flex; align-items: center;">
        <label style="padding-right: 10px;">{{employee?.firstName}} {{employee?.lastName}}</label>
        <img [src]="src" [ngClass]="{'user-thumbnail': !small, 'user-thumbnail-small': small}">
    </div>
    `
})
export class UserThumbnailComponent {
    
    @Input() src: string;
    @Input() small: boolean;
    @Input() employee: Employee;
    constructor() {}
}