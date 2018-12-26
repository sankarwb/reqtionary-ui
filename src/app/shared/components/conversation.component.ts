import {Component, Input, OnInit} from '@angular/core';
import {Conversation} from '../../models';
import { EmployeeService } from '../services';

@Component({
    selector: 'conversation',
    templateUrl: 'conversation.component.html'
})

export class ConversationComponent implements OnInit {

    @Input() conversation: Conversation;
    by: string;
    constructor(private employeeService: EmployeeService) {}

    ngOnInit() {
        this.employeeService.getEmployeeById(this.conversation.by, false).subscribe(employee => {
            this.by = employee.firstName;
        });
    }
}