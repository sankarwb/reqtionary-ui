import { Component,Input } from '@angular/core';

import { AgileStatusValue } from '../vo/AgileStatusValue';
import { RoleEmployee } from '../vo/RoleEmployee';
import { GlobalSharedService } from '../services/globalShared.service';

@Component({
	selector: 'editable-table',
	templateUrl: 'editable-table.component.html'
})

export class EditableTableComponent {
	
	constructor(private globalService:GlobalSharedService) {}
	_rows:any[];
	@Input() title:string = "Roles";
	@Input() set rows(list:any[]) {
		this._rows = list || [];
	}
	get rows(): any[] {
		return this._rows;
	}
	@Input() columns:any[];

	addNew() {
		//let newRole:RoleEmployee = new RoleEmployee();
		//newRole.modifiedByID = this.globalService.user.id;
		this.rows.push( (this.title === 'Roles') ? new RoleEmployee() : new AgileStatusValue() );
	}

	onRoleEmpChange(newVal:any,key:string,row:any) {
		if(newVal !== row[key]) {
			if(!row[`old${key}`]) row[`old${key}`] = row[key];
			row[key] = newVal;
		}
	}

	onAgileStatusChange(newVal:any,key:string,row:any) {
		if(newVal !== row[key]) {
			if(!row[`old${key}`]) row[`old${key}`] = row[key];
			row[key] = newVal;
		}
	}

	onDelete(active:number,row:any) {
		if(!row['oldactive']) row['oldactive'] = row['active'];
		row.active = 1-active;
	}

	getUpdatedRoles() {
		return this.rows.filter( (item:any) => (('oldempId' in item) && item['oldempId'] !== item['empId']) 
											|| (('oldroleId' in item) && item['oldroleId'] !== item['roleId'])
											|| (('oldactive' in item) && item['oldactive'] !== item['active'] ));
		//filtered.forEach( (item:any) => item.modifiedByID = this.globalService.user.id );

		//return filtered;
	}

	getUpdatedAgileStatus() {
		return this.rows.filter( (item:any) => (('oldname' in item) && item['oldname'] !== item['name']) 
											|| (('oldorder' in item) && item['oldorder'] !== item['order'])
											|| (('oldactive' in item) && item['oldactive'] !== item['active'] ));
		//filtered.forEach( (item:any) => item.modifiedByID = this.globalService.user.id );

		//return filtered;
	}
}