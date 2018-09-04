import { Component, Input } from '@angular/core';
import { Project } from '../../models/project.model';

@Component({
    selector: 'home-project',
    template: `
    <div style="display: flex; flex-direction: row-reverse; justify-content: center;">
        <span style="font-size: 16px; font-weight: bold;">39/52</span>
        <div>
            <div style="width: 360px; height: 68px; border-radius: 6px; background: #D2E9F6; box-shadow: 0px 0px 1px 1px rgba(61, 145, 238, 0.15);"></div>
            <div style="position: relative; width: 270px; height: 68px; bottom: 68px; border-radius: 6px; background-image: linear-gradient(to right, #3079EA, #5BCCF7); box-shadow: 0px 0px 1px 1px rgba(32, 100, 245, 0.2)"></div>
        </div>
        <span style="font-size: 16px; font-weight: bold;">{{project.name}}</span>
    </div>
    `
})
export class HomeProjectComponent {
    
    @Input() project: Project;
}