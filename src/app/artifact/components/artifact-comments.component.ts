import {Component, OnInit} from '@angular/core';

import {Artifact} from 'src/app/models';

@Component({
    selector: 'artifact-comments',
    template: `
    <div>comments</div>
    `
})

export class ArtifactCommentsComponent implements OnInit {
    
    artifact: Artifact;

    constructor() {}

    ngOnInit() {
        
    }
}