import { Component, Input } from '@angular/core';
import { Project } from '../../models/project.model';

@Component({
    selector: 'home-project',
    template: `
    <div class="home-project-container">
        <div style="font-size: 16px; font-weight: bold; width: 40%;">{{project.name}}</div>
        <div style="width: 50%; display: inline-block;">
            <div [style.width]="defaultWidth+'px'" style="height: 60px; border-radius: 6px; background: #D2E9F6; box-shadow: 0px 0px 1px 1px rgba(61, 145, 238, 0.15);"></div>
            <div [style.width]="width+'px'" style="position: relative; height: 60px; bottom: 60px; border-radius: 6px; background-image: linear-gradient(to right, #3079EA, #5BCCF7); box-shadow: 0px 0px 1px 1px rgba(32, 100, 245, 0.2)"></div>
        </div>
        <!--<div class="progress-gradient"></div>-->
        <div style="font-size: 16px; font-weight: bold; width: 10%; text-align: center;">{{project.actual}}/{{project.expected}}</div>
    </div>
    `,
    styles: [
        `.home-project-container {
            width: 100%; display: flex; flex-direction: row;
        }`,
        `.progress-gradient {
            width: 50%;
            height: 60px;
            border-radius: 6px;
            background-image: linear-gradient(to right, #3079EA 0%, #5BCCF7 0%, #D2E9F6 1%);
            box-shadow: 0px 0px 1px 1px rgba(32, 100, 245, 0.2);
        }`
    ]
})
export class HomeProjectComponent {
    
    @Input() project: Project;
    defaultWidth = 318;

    get width(): number {
        if (!this.project.actual && !this.project.expected) {
            return 0;
        } else if (this.project.actual >= this.project.expected) {
            return this.defaultWidth;
        } else {
            return ((this.defaultWidth*(this.project.actual/this.project.expected*100))/100);
        }
    }
}