import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { GlobalSharedService } from '../../services/globalShared.service';
import { AdminSettingsService } from '../../services/admin-settings.service';

import { AdminSettings } from '../../interface/AdminSettings';
import { RoleEmployee } from '../../vo/RoleEmployee';

export class Division {	
	constructor(
		public id: number=0,
		public name: string='',
		public desc: string='',
		public active: number=1,
		public modifiedByID: number=0,
		public roles: RoleEmployee[]=[new RoleEmployee()]
	) {}
}

@Component({
	selector: 'attribute',
	templateUrl: 'division.component.html'
})

export class ManageDivisionComponent implements OnInit,AdminSettings {
	@ViewChild('form', {static: true}) form: FormGroup;
	selectedIndex:number = 0;
	label:string = "Add New";
	columns:any[] = [
		{key:'id',value:'Id',display:false,width:0},
		{key:'name',value:'Name',dataType:'link',display:true,width:15},
		{key:'desc',value:'Description',display:true,width:30},
		{key:'active',value:'Active',dataType:'bool',display:true,width:8},
		{key:'modifiedBy',value:'Modified By',display:true,width:8}
	];

	constructor(public globalService:GlobalSharedService ,private adminService: AdminSettingsService) {}

	ngOnInit() {
		if( ! this.globalService.divisions ) this.updateList();
	}

	onTabChange(evt:any) {
		this.selectedIndex = evt.index;
		if( this.selectedIndex === 0) {
			this.label = "Add New";
			this.newRow();
		} else if(this.selectedIndex === 1) {
			if( this.label.indexOf('Edit') !== -1 && !(this.selectedRow.roles[this.selectedRow.roles.length-1] instanceof RoleEmployee) ) {
				let newRole:RoleEmployee = new RoleEmployee();
				newRole.modifiedByID = this.globalService.user.id;
				this.selectedRow.roles.push(newRole);
			}
			if(this.label.indexOf('Add') === 0)
				this.globalService.adminSettingsActionEmitter.emit(0);
			else
				this.globalService.adminSettingsActionEmitter.emit(1);
		}
		//this.globalService.adminSettingsActionEmitter.emit( (this.selectedIndex === 1) ? (this.label.indexOf('Add') === 0) ? 0 : 1 : 2 );
	}

	selectedRow:any;
	newRow() {		
		this.selectedRow = new Division();
		this.selectedRow.roles.forEach( (row:RoleEmployee) => row.orgId = this.globalService.getRequest().orgId );
	}

	save() {
		if(!this.form.valid) {
			Object.keys(this.form.controls).forEach((field:string) => {
				const control = this.form.controls[field];
				control.markAsTouched({onlySelf: true});
			});
			this.globalService.notification.emit(this.globalService.formValidationMsg);
			return;
		}
		this.adminService.updateDivision(this.selectedRow).subscribe((resp:any) => {
			this.globalService.notification.emit(resp.success);
			this.globalService.adminSettingsActionEmitter.emit(2);
		}, err => this.globalService.notification.emit(err.success));
	}

	updateList() {
		this.selectedIndex = 0;
		this.adminService.getDivisions({orgId:this.globalService.getRequest().orgId}).subscribe(result => this.globalService.divisions = result);
	}
	
	onItemSelected(row:any) {
		this.selectedRow = row;
		this.label = `Edit ${row.name}`;
		this.selectedIndex = 1;
		this.globalService.adminSettingsActionEmitter.emit(1);
	}
}