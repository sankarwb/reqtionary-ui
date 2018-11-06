import {
    Component,
    Input
} from '@angular/core';

import {Artifact} from '../../models/artifact.model';

@Component({
    selector: 'agile-artifact-card',
    template: `
    <div style="display: flex; flex-direction: column; width: 100%; height: 200px; border-radius: 4px; box-shadow: 3px 0px 16px rgba(0, 0, 0, 0.12);">
        <div style="width: 100%; height: 10%;">
            <span>{{artifact.UID}}</span>
        </div>
        <div style="width: 100%; height: 75%; border: 1px solid grey;">{{artifact.name}}</div>
        <div style="width: 100%; height: 10%;">
            <span>{{artifact.actualPoints}}</span>
        </div>
    </div>
    `
})
export class AgileArtifactCardComponent {

    @Input() artifact: Artifact;

    constructor() {}
    
}