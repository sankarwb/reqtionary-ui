import {Component, OnInit} from '@angular/core';

import {Artifact} from 'src/app/models';

@Component({
    selector: 'artifact-attachments',
    template: `
    <div>attachments</div>
    `
})

export class ArtifactAttachmentsComponent implements OnInit {
    
    artifact: Artifact;

    constructor() {}

    ngOnInit() {
        
    }
}