import { Component, OnInit, Input } from '@angular/core';

import { GlobalSharedService } from '../../services/globalShared.service';
import { AdminSettingsService } from '../../services/admin-settings.service';

import { AdminSettings } from '../../interface/AdminSettings';

export class Status {	
	constructor(
		public id: number=0,
		public type: string='',
		public desc: string='',
		public color: string='',
		public modifiedByID: number=0
	) {}
}

@Component({
	selector: 'manage-status',
	templateUrl: 'manage-status.component.html'
})

export class ManageStatusComponent implements OnInit, AdminSettings {
	constructor(private adminService: AdminSettingsService, public globalService: GlobalSharedService) { }
	selectedIndex:number = 0;
	label:string = "Add New";
	columns:any[] = [
		{key:'type',value:'Type',dataType:'link',display:true,width:15},
		{key:'desc',value:'Description',display:true,width:30},
		{key:'color',value:'Color',dataType:'color',displayTextKey:'type',display:true,width:5},
		{key:'modifiedBy',value:'Modified By',display:true,width:5}
	];
	ngOnInit() {
		if( ! this.globalService.status ) this.updateList();
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
		this.selectedRow = new Status();
	}

	save() {
		this.selectedRow.orgId = this.globalService.getRequest().orgId;
		this.selectedRow.modifiedByID = this.globalService.user.id;
		this.adminService.updateStatus(this.selectedRow).subscribe((resp:any) => {
			this.globalService.notification.emit(resp.success);
			this.globalService.adminSettingsActionEmitter.emit(2);
		}, err => this.globalService.notification.emit(err.success));
	}

	updateList() {
		this.selectedIndex = 0;
		this.adminService.getStatus({orgId:this.globalService.getRequest().orgId}).subscribe((result:any[]) => this.globalService.status = result);
	}
	
	onItemSelected(row:any) {
		this.selectedRow = row;
		this.label = `Edit ${row.name}`;
		this.selectedIndex = 1;
		this.globalService.adminSettingsActionEmitter.emit(1);
	}
}
