import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { GlobalSharedService } from '../../services/globalShared.service';
import { AdminSettingsService } from '../../services/admin-settings.service';

import { EditableTableComponent } from '../../components/editable-table.component';
import { AdminSettings } from '../../interface/AdminSettings';
import { RoleEmployee } from '../../vo/RoleEmployee';

declare var $: any;
@Component({
	selector: 'edit-organization',
	templateUrl: 'edit-organization.component.html'
})

export class EditOrganizationComponent implements OnInit, AdminSettings {
	@ViewChild('form', {static: true}) form: FormGroup;
	@ViewChild(EditableTableComponent, {static: true}) roleEmpTable: EditableTableComponent;
	selectedRow: any;
	constructor(private adminService: AdminSettingsService, private globalService: GlobalSharedService) { }
	ngOnInit() {
		let req = { orgId: this.globalService.getRequest().orgId };
		this.adminService.getOrgDetails(req).subscribe( (result:any) => {
			this.selectedRow = result;
			if(this.selectedRow.roles && this.selectedRow.roles.length > 0)
				this.selectedRow.roles.push(new RoleEmployee());
			else 
				this.selectedRow.roles = [new RoleEmployee()];
			this.globalService.adminSettingsActionEmitter.emit(1);
		});
	}

	newRow() {		
		
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
		this.selectedRow.roles = this.roleEmpTable.getUpdatedRoles();
		this.selectedRow.modifiedByID = this.globalService.user.id;
		this.adminService.updateOrg(this.selectedRow).subscribe((resp:any) => {
			this.globalService.notification.emit(resp.success);
			this.globalService.adminSettingsActionEmitter.emit(2);
		}, err => this.globalService.notification.emit(err.success));
	}

	updateList() {
		
	}
	
}
