import {Component, Input, OnInit} from '@angular/core';
import {Conversation} from '../../models';
import { EmployeeService } from '../services';
import { GlobalSharedService } from '../../services';

@Component({
    selector: 'conversation',
    templateUrl: 'conversation.component.html'
})

export class ConversationComponent implements OnInit {

    showComments = false;
    @Input() conversation: Conversation;
    by: string;
    constructor(
        private employeeService: EmployeeService,
        private globalService: GlobalSharedService
    ) {}

    ngOnInit() {
        this.employeeService.getEmployeeById(this.conversation.by, false).subscribe(employee => {
            this.by = employee.firstName;
        });
    }

    addComment(text: string): void {
        this.showComments = true;
        this.conversation.comments.push(
            new Conversation(
                this.globalService.employee.id,
                text,
                'now'
            ));
    }
}