import { Component, OnInit, Input } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { GlobalSharedService } from '../../services/globalShared.service';
import { AdminSettingsService } from '../../services/admin-settings.service';

import { AdminSettings } from '../../interface/AdminSettings';

export class Designation {	
	constructor(
		public id: number=0,
		public name: string='',
		public desc: string='',
		public active: string='1',
		public modifiedByID: number=0
	) {}
}

@Component({
	selector: 'manage-designation',
	templateUrl: 'manage-designation.component.html'
})

export class ManageDesignationComponent implements OnInit, AdminSettings {
	constructor(private adminService: AdminSettingsService, private globalService: GlobalSharedService) { }
	selectedIndex:number = 0;
	label:string = "Add New";
	columns:any[] = [
		{key:'id',value:'Id',display:false,width:0},
		{key:'name',value:'Name',dataType:'link',display:true,width:15},
		{key:'desc',value:'Description',display:true,width:30},
		{key:'active',value:'Active',dataType:'bool',display:true,width:5},
		{key:'modifiedBy',value:'Modified By',display:true,width:5}
	];
	
	ngOnInit() {
		if( ! this.globalService.designations ) this.updateList();
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
		this.selectedRow = new Designation();
	}

	save() {
		this.selectedRow.orgId = this.globalService.getRequest().orgId;
		this.selectedRow.modifiedByID = this.globalService.user.id;
		this.adminService.updateDesignation(this.selectedRow).subscribe((resp:any) => {
			this.globalService.notification.emit(resp.success);
			this.globalService.adminSettingsActionEmitter.emit(2);
		}, err => this.globalService.notification.emit(err.success));
	}

	updateList() {
		this.selectedIndex = 0;
		this.adminService.getDesignations({orgId:this.globalService.getRequest().orgId}).subscribe((result:any[]) => this.globalService.designations = result);
	}
	
	onItemSelected(row:any) {
		this.selectedRow = row;
		this.label = `Edit ${row.name}`;
		this.selectedIndex = 1;
		this.globalService.adminSettingsActionEmitter.emit(1);
	}
}
