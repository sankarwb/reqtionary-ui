import {Component, Input, OnInit} from '@angular/core';

import {Artifact} from '../../models';
import { ArtifactsService } from '../../shared/services';

@Component({
    selector: 'artifact-history',
    templateUrl: 'artifact-history.component.html',
    styleUrls: ['artifact-history.component.css']
})

export class ArtifactHistoryComponent implements OnInit {
    
    @Input()
    artifact: Artifact;
    versions:any[];
    titles:any[];

    constructor(private artifactSetvice: ArtifactsService) {}

    ngOnInit() {
        this.artifactSetvice.historyById(this.artifact.id).subscribe(response => {
            this.titles = response.titles;
            this.versions = response.history;
        });
    }
}