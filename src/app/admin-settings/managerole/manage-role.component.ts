import { Component, OnInit, Input } from '@angular/core';

import { GlobalSharedService } from '../../services/globalShared.service';
import { AdminSettingsService } from '../../services/admin-settings.service';

import { AdminSettings } from '../../interface/AdminSettings';

export class Role {	
	constructor(
		public id: number=0,
		public name: string='',
		public desc: string='',
		public type: string='',
		public active: string='1',
		public modifiedByID: number=0
	) {}
}

@Component({
	selector: 'manage-role',
	templateUrl: 'manage-role.component.html'
})

export class ManageRoleComponent implements OnInit, AdminSettings {
	constructor(private adminService: AdminSettingsService, private globalService: GlobalSharedService) { }
	selectedIndex:number = 0;
	label:string = "Add New";
	types:string[] = ['Organization','Division','Application Group','Application','Project'];
	columns:any[] = [
		{key:'name',value:'Name',dataType:'link',display:true,width:15},
		{key:'type',value:'Type',display:true,width:8},
		{key:'desc',value:'Description',display:true,width:30},
		{key:'active',value:'Active',dataType:'bool',display:true,width:5},
		{key:'modifiedBy',value:'Modified By',display:true,width:7}
	];

	ngOnInit() {
		if( ! this.globalService.roles ) this.updateList();
	}
	
	onTabChange(evt:any) {
		this.selectedIndex = evt.index;
		if( this.selectedIndex === 0) {
			this.label = "Add New";
			this.newRow();
		} else if(this.selectedIndex === 1) {
			if(this.label.indexOf('Add') === 0)
				this.globalService.adminSettingsActionEmitter.emit(0);
			else
				this.globalService.adminSettingsActionEmitter.emit(1);
		}
	}

	selectedRow:any;
	newRow() {		
		this.selectedRow = new Role();
	}

	save() {
		this.selectedRow.orgId = this.globalService.getRequest().orgId;
		this.selectedRow.modifiedByID = this.globalService.user.id;
		this.adminService.updateRole(this.selectedRow).subscribe((resp:any) => {
			this.globalService.notification.emit(resp.success);
			this.globalService.adminSettingsActionEmitter.emit(2);
		}, err => this.globalService.notification.emit(err.success));
	}

	updateList() {
		this.selectedIndex = 0;
		this.adminService.getAllRoles({orgId:this.globalService.getRequest().orgId}).subscribe((result:any[]) => this.globalService.roles = result);
	}
	
	onItemSelected(row:any) {
		this.selectedRow = row;
		this.label = `Edit ${row.name}`;
		this.selectedIndex = 1;
		this.globalService.adminSettingsActionEmitter.emit(1);
	}
}
