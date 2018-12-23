import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';

import {EventsService} from "../../services";
import {Artifact} from 'src/app/models';

@Component({
    selector: 'artifact',
    templateUrl: 'artifact.component.html',
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

export class ArtifactComponent implements OnInit {
    
    activeSection: string;
    artifact: Artifact;

    constructor(
        private eventsService: EventsService,
        private route: ActivatedRoute
    ) {}

    ngOnInit() {
        this.eventsService.selectedApplication('Gadget Value');
        this.artifact = this.route.snapshot.data['artifact'] || new Artifact();
    }

    onChangeSection(section: string): void {
        this.activeSection = section;
    }
}