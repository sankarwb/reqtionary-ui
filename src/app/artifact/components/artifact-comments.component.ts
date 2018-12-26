import { Component, Input } from '@angular/core';

import { GlobalSharedService } from '../../services';
import { Conversation } from '../../models';

@Component({
    selector: 'artifact-comments',
    templateUrl: 'artifact-comments.component.html'
})

export class ArtifactCommentsComponent {
    
    conversations: Conversation[] = [{time: '10 hours ago', by: 33, comment: `Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum`, comments: null}];
    @Input()
    set comments(data: string) {
        if (data) {
            this.conversations = JSON.parse(data) || [];
        }
    }
    get comments(): string {
        return JSON.stringify(this.conversations);
    }

    constructor(private globalService: GlobalSharedService) {}

    addConversation(text: string): void {
        let newConversation = new Conversation(
            this.globalService.employee.id,
            text || '',
            'just now'
        );
        this.conversations.push(newConversation);
    }
}