import {Component, OnInit, Input, ViewChild} from '@angular/core';
import {FileUploaderComponent} from '../../shared/components';
import { Artifact } from '../../models';

@Component({
    selector: 'artifact-attachments',
    templateUrl: 'artifact-attachments.component.html'
})

export class ArtifactAttachmentsComponent implements OnInit {
    
    @ViewChild(FileUploaderComponent, {static: true}) fileUploader: FileUploaderComponent;
    @Input() artifact: Artifact;
    attachments: any[] = [
        {date: 'Aug 27, 2018', size: '1.5 MB', name: 'random attachment1.doc'},
        {date: 'Sept 12, 2017', size: '1200 KB', name: 'random attachment2.doc'},
    ];

    constructor() {}

    ngOnInit() {
        
    }
}