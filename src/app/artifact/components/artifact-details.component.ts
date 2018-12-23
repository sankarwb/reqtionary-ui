import {Component, OnInit, Input} from '@angular/core';

import {Artifact} from '../../models';

@Component({
    selector: 'artifact-details',
    templateUrl: 'artifact-details.component.html',
    styles: [
        `form .flex-box-column {
            margin: 0px 10px 10px 0px;
        }
        `,
        `.flex-box-row label, .flex-box-column label {
            color: #70757B;
            font-size: 10px;
            font-weight: bold;
            padding: 4px 4px 4px 0px;
        }
        `
    ]
})

export class ArtifactDetailsComponent implements OnInit {
    
    @Input() artifact: Artifact;

    constructor() {}

    ngOnInit() {
        
    }
}