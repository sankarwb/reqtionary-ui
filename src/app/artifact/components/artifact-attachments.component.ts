import {Component, OnInit, Input, ViewChild} from '@angular/core';
import {FileUploaderComponent} from '../../shared/components';
import { Artifact, Attachment, UploadStatus } from '../../models';
import { FileItem } from 'ng2-file-upload';

@Component({
    selector: 'artifact-attachments',
    templateUrl: 'artifact-attachments.component.html'
})

export class ArtifactAttachmentsComponent {
    
    @ViewChild(FileUploaderComponent, {static: true}) fileUploader: FileUploaderComponent;
    @Input() artifact: Artifact;

    onUploadSuccess(fileList: FileItem[]): void {
        const attachments = fileList.map(item => {
            return new Attachment(
                item.file.name,
                item.file.size,
                (new Date()).toDateString(),
                UploadStatus.SUCCESS
            );
        });
        if (!this.artifact.attachments) {
            this.artifact.attachments = [];
        }
        this.artifact.attachments = [...this.artifact.attachments, ...attachments];
    }
}