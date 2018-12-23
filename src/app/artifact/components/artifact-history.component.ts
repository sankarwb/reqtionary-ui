import {Component, OnInit} from '@angular/core';

import {Artifact} from 'src/app/models';

@Component({
    selector: 'artifact-history',
    template: `
    <div>History</div>
    `
})

export class ArtifactHistoryComponent implements OnInit {
    
    artifact: Artifact;

    constructor() {}

    ngOnInit() {
        
    }
}