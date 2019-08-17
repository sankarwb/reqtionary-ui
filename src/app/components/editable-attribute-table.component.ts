import { Component,Input,Output,EventEmitter } from '@angular/core';
import { FormControl } from '@angular/forms';
import 'rxjs/add/operator/startWith';
import 'rxjs/add/operator/map';

import { RoleEmployee } from '../vo/RoleEmployee';
import { GlobalSharedService } from '../services/globalShared.service';

@Component({
	selector: 'editable-attribute-table',
	templateUrl: 'editable-attribute-table.component.html'
})

export class EditableTableComponent {
	
	constructor(private globalService:GlobalSharedService) {}
	_rows:any[];
	@Input() set rows(list:any[]) {
		this._rows = list || [];
	}
	get rows(): any[] {
		return this._rows;
	}
	@Input() columns:any[];

	addNew() {
		let newRole:RoleEmployee = new RoleEmployee();
		newRole.modifiedByID = this.globalService.user.id;
		this.rows.push( newRole );
	}

	onModelChange(newVal:any,key:string,row:any) {
		if(newVal !== row[key]) row[key] = newVal;
	}
}