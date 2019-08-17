import { Component, OnInit, Input } from '@angular/core';

import { GlobalSharedService } from '../../services/globalShared.service';
import { AdminSettingsService } from '../../services/admin-settings.service';
import { AdminSettings } from '../../interface/AdminSettings';

export class Employee {	
	constructor(
		public id: number=0,
		public vendorId: number=0,
		public titleId: number=0,
		public type: number=0,
		public UID: string='',
		public fName: string='',
		public mName: string='',
		public lName: string='',
		public emailID: string='',
		public photopath: string='',
		public timezone: number=0,
		public userID: string='',
		public password: string='',
		public changePassword: string='',
		public active: string='1',
		public modifiedByID: number=0,
	) {}
}

@Component({
	selector: 'manage-employee',
	templateUrl: 'manage-employee.component.html'
})

export class ManageEmployeeComponent implements OnInit, AdminSettings {
	constructor(private adminService: AdminSettingsService, private globalService: GlobalSharedService) { }
	timeZones:any[];
	selectedIndex:number = 0;
	label:string = "Add New";
	columns:any[] = [
		{key:'id',value:'Id',display:false,width:0},
		{key:'vendorName',value:'Vendor',display:true,width:15},
		{key:'designationName',value:'Designation',display:true,width:15},
		{key:'UID',value:'Number',display:true,width:10},
		{key:'fName',value:'Name',dataType:'empName',display:true,width:20},
		{key:'emailID',value:'Email',display:true,width:10},
		{key:'photopath',value:'Photo',dataType:'image',display:false,width:10},
		{key:'active',value:'Active',dataType:'bool',display:true,width:5},
		{key:'modifiedBy',value:'Modified By',display:true,width:8}
	];
	
	ngOnInit() {
		let req = {orgId: this.globalService.getRequest().orgId};
		if( ! this.globalService.employees ) this.updateList();
		if( ! this.globalService.designations )
			this.adminService.getDesignations(req).subscribe(result => this.globalService.designations = result);
		if( ! this.globalService.vendors )
			this.adminService.getVendors(req).subscribe((result:any[]) => this.globalService.vendors = result);
		if( ! this.timeZones )
			this.adminService.getTimezones(req).subscribe((result:any[]) => this.timeZones = result);
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
		this.selectedRow = new Employee();
	}

	save() {
		this.selectedRow.orgId = this.globalService.getRequest().orgId;
		this.selectedRow.modifiedByID = this.globalService.user.id;
		this.adminService.updateEmployee(this.selectedRow).subscribe((resp:any) => {
			this.globalService.notification.emit(resp.success);
			this.globalService.adminSettingsActionEmitter.emit(2);
		}, err => this.globalService.notification.emit(err.success));
	}

	updateList() {
		this.selectedIndex = 0;
		this.adminService.getEmployees({orgId:this.globalService.getRequest().orgId}).subscribe((result:any[]) => this.globalService.employees = result);
	}
	
	onItemSelected(row:any) {
		this.selectedRow = row;
		this.label = `Edit ${row.fName} ${row.mName}`;
		this.selectedIndex = 1;
		this.globalService.adminSettingsActionEmitter.emit(1);
	}
}
