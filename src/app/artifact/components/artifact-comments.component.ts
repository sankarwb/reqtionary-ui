import { Component, Input, OnInit } from '@angular/core';

import { GlobalSharedService } from '../../services';
import { Conversation, Artifact } from '../../models';

@Component({
    selector: 'artifact-comments',
    templateUrl: 'artifact-comments.component.html'
})

export class ArtifactCommentsComponent implements OnInit {
    
    @Input() artifact: Artifact;
    conversations: Conversation[];

    constructor(private globalService: GlobalSharedService) {}

    ngOnInit() {
        this.conversations = this.artifact.comments;
    }

    addConversation(text: string): void {
        const newConversation = new Conversation(
            this.globalService.employee.id,
            text,
            'just now'
        );
        this.conversations.push(newConversation);
    }
}