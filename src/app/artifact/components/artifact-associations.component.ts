import {Component, OnInit} from '@angular/core';

import {Artifact} from 'src/app/models';

@Component({
    selector: 'artifact-associations',
    template: `
    <div>associations</div>
    `
})

export class ArtifactAssociationsComponent implements OnInit {
    
    artifact: Artifact;

    constructor() {}

    ngOnInit() {
        
    }
}