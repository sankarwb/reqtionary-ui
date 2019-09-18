import { Component, OnInit, Input, ViewChild, ViewChildren, QueryList } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { forkJoin } from 'rxjs';

import { EditableTableComponent } from '../../components/editable-table.component';

import { GlobalSharedService } from '../../services/globalShared.service';
import { AdminSettingsService } from '../../services/admin-settings.service';
import { RequirementTypeService } from '../../services/requirement-type.service';

import { AdminSettings } from '../../interface/AdminSettings';
import { AgileStatusValue } from '../../vo/AgileStatusValue';
import { RoleEmployee } from '../../vo/RoleEmployee';



export class Application {
	constructor(
		public id: number=0,
		public divId: number=0,
		public appGrpId: number=0,
		public name: string='',
		public desc: string='',
		public active: number=1,
		public comments: string='',
		public modifiedByID: number=0,
		public roles: RoleEmployee[]=[new RoleEmployee()],
		public types: any[]=[],
		public agileStatusValues: any[]=[new AgileStatusValue()]
	) {}
}

@Component({
	selector: 'manage-application',
	templateUrl: 'application.component.html'
})

export class ManageApplicationComponent implements OnInit,AdminSettings {
	@ViewChild('form', {static: true}) form: FormGroup;
	@ViewChildren(EditableTableComponent) editableTables: QueryList<EditableTableComponent>;
	requirementTypes = [];
	selectedIndex:number = 0;
	label:string = "Add New";
	columns:any[] = [
		{key:'id',value:'Id',display:false,width:0},
		{key:'divId',value:'Division',dataType:'field',display:false,width:20},
		{key:'divName',value:'Division',display:true,width:20},
		{key:'appGrpName',value:'Application Group',display:true,width:20},
		{key:'appGrpId',value:'Application Group',dataType:'field',display:false,width:20},
		{key:'name',value:'Application Name',dataType:'link',display:true,width:15},
		{key:'desc',value:'Description',display:false,width:30},
		{key:'active',value:'Active',dataType:'bool',display:true,width:8},
		{key:'modifiedBy',value:'Modified By',display:false,width:8}
	];

	constructor(public globalService:GlobalSharedService,private adminService: AdminSettingsService,private reqTypeService: RequirementTypeService) {}

	ngOnInit() {
		if( ! this.globalService.divisions )
		this.adminService.getDivisions({orgId:this.globalService.getRequest().orgId}).subscribe(result => this.globalService.divisions = result);
		if( ! this.globalService.appGroups )
		this.adminService.getAppGroups({orgId:this.globalService.getRequest().orgId}).subscribe(result => this.globalService.appGroups = result);
		if( ! this.globalService.requirementTypes ) {
			this.adminService.getRequirementTypes({orgId:this.globalService.getRequest().orgId}).subscribe(result => {
				this.globalService.requirementTypes = result;
				this.requirementTypes = [...result];
			});
		} else
			this.requirementTypes = [...this.globalService.requirementTypes];
		if( ! this.globalService.applications ) this.updateList();
	}

	onTabChange(evt:any) {
		this.selectedIndex = evt.index;
		if( this.selectedIndex === 0 ) {
			this.label = "Add New";
			this.newRow();
		} else if( this.selectedIndex === 1 ) {
			if( this.label.indexOf('Edit') !== -1 && !(this.selectedRow.roles[this.selectedRow.roles.length-1] instanceof RoleEmployee) ) {
				let newRole:RoleEmployee = new RoleEmployee();
				this.selectedRow.roles.push(newRole);
			}
			if( this.label.indexOf('Edit') !== -1 && !(this.selectedRow.agileStatusValues[this.selectedRow.agileStatusValues.length-1] instanceof AgileStatusValue) ) {
				let newAgileStatus:AgileStatusValue = new AgileStatusValue();
				this.selectedRow.agileStatusValues.push(newAgileStatus);
			}
			this.globalService.adminSettingsActionEmitter.emit( (this.label.indexOf('Add') === 0) ? 0 : 1 );
		} else
			this.globalService.adminSettingsActionEmitter.emit(1);
		if( this.selectedIndex !== 0 && this.selectedRow.id === 0) {
			this.adminService.getRequirementTypes({orgId:this.globalService.getRequest().orgId}).subscribe(result => {
				this.globalService.requirementTypes = result;
				this.requirementTypes = [...result];
			});
		}
	}

	selectedRow: any;
	newRow() {		
		this.selectedRow = new Application();
		//this.selectedRow.roles.forEach( (row:RoleEmployee) => row.orgId = this.globalService.getRequest().orgId );
	}

	save() {
		if(!this.form.valid || this.selectedRow.divId === 0 || this.selectedRow.appGrpId === 0 || this.selectedRow.agileStatusValues.length === 1) {
			Object.keys(this.form.controls).forEach((field:string) => {
				const control = this.form.controls[field];
				control.markAsTouched({onlySelf: true});
			});
			this.globalService.notification.emit(this.globalService.formValidationMsg);
			return;
		}
		this.selectedRow.orgId = this.globalService.getRequest().orgId;
		this.selectedRow.modifiedByID = this.globalService.user.id;
		this.selectedRow.types = this.selections;
		this.editableTables.forEach( (table:EditableTableComponent, idx:number) => {
			if(idx === 0) this.selectedRow.roles = table.getUpdatedRoles();
			if(idx === 1) this.selectedRow.agileStatusValues = table.getUpdatedAgileStatus();
		})
		// filter and remove new empty rows
		if( this.selectedRow.roles && this.selectedRow.roles.length > 0) {
			this.selectedRow.roles = this.selectedRow.roles.slice().filter((roleEmp:any) => roleEmp.roleId !== 0 && roleEmp.empId !== 0);
		}
		// filter and remove new empty rows
		if( this.selectedRow.agileStatusValues && this.selectedRow.agileStatusValues.length > 0) {
			this.selectedRow.agileStatusValues = this.selectedRow.agileStatusValues.slice().filter((agileStatus:any) => agileStatus.name !== "" && agileStatus.order !== 0);
		}
		console.log(this.selectedRow);
		this.adminService.updateApp(this.selectedRow).subscribe((resp:any) => {
			this.globalService.notification.emit(resp.success);
			this.globalService.adminSettingsActionEmitter.emit(2);
		});
	}

	updateList() {
		this.selectedIndex = 0;
		this.adminService.getApplications({orgId:this.globalService.getRequest().orgId}).subscribe(result => this.globalService.applications = result);
	}
	
	onItemSelected(row:any) {
		this.selectedRow = row;
		this.selectedIndex = 1;
		this.label = `Edit ${row.name}`;
		let req = { orgId: this.globalService.getRequest().orgId, appId: this.selectedRow.id };
		forkJoin<any[],any[]>(this.adminService.getRequirementTypes(req), this.reqTypeService.getAppObjectAttributes(req))
		.subscribe(result => {
			this.requirementTypes = result[0];
			if(result[1] && !result[1].hasOwnProperty('error'))
				this.processObjectAttributes(result[1]);
		});
		this.selections = [];
		this.globalService.adminSettingsActionEmitter.emit(1);
	}

	fileterAttributes(attrs:any[]):any[] {
		return attrs.filter( (item:any) => item.system === 0 );
	}
	// method to process the existing selected to include into this.requirementTypes, so that the selected get selected on screen
	processObjectAttributes(appObjAttrs:any[]) {
		this.requirementTypes.forEach(reqType => {
			let filtered = appObjAttrs.filter((appObjAttr:any) => appObjAttr.id === reqType.id);
			if( filtered && filtered.length > 0 ) {
				reqType.appObjAttrId = filtered[0].appObjAttrId;
				reqType.checked = (filtered[0].active && filtered[0].active !== 0) || filtered[0].attributes.filter((attr:any) => attr.active === 1).length > 0;
				reqType.disabled = filtered[0].attributes.filter((attr:any) => attr.artifactAttrId !== null).length > 0;
				reqType.attributes.forEach((attr:any) => {
					let filteredAttr:any[] = filtered[0].attributes.filter((attr1:any) => attr1.id === attr.id);
					if( filteredAttr && filteredAttr.length > 0) {
						attr.checked = (filteredAttr[0].active === 1);
						attr.disabled = (filteredAttr[0].artifactAttrId !== null);
						attr.appObjAttrId = filteredAttr[0].appObjAttrId;
					}
				});
			}
		});
	}

	selections:any[];
	onSelect(evt:any,sType:string,reqType:any,attr:any) {
		if( evt.checked ) {
			if( sType === 'object' ) {
				//before add reqType, check if any of its attributes already exists
				let attrExist:boolean = false;
				reqType.attributes.some( (item:any) => {
					if( this.getObjIndex( item,'attrId' ) !== -1 && item.checked ) {
						attrExist = true;
						return true;
					}
				})
				if( ! attrExist ) this.pushPopSelected( reqType, evt.checked );
			} else {
				reqType.checked = evt.checked;
				// If reqType exists after it's attr is checked, then pop reqType
				let reqTypeIdx:number = this.getObjIdx( reqType );
				if( reqTypeIdx !== -1 ) this.selections.splice( reqTypeIdx, 1 );
				attr.objId = reqType.id;
				this.pushPopSelected( attr, evt.checked, 'attrId', attr.id );
			}
		} else {
			if( sType === 'object' ) {
				reqType.attributes.forEach( (item:any) => {
					if( item.checked ) {
						item.objId = reqType.id;
						this.pushPopSelected( item, evt.checked, 'attrId', item.id );
					}
					item.checked = false;
				})
				// If reqType exist which doesn't have appObjAttrId, then pop reqType
				let reqTypeIdx:number = this.getObjIdx( reqType );
				if( reqTypeIdx !== -1 ) {
					if(reqType.appObjAttrId && reqType.appObjAttrId !== 0) 
						this.pushPopSelected( reqType, evt.checked );
					else 
						this.selections.splice( reqTypeIdx, 1 );
				} else {// If reqType has appObjAttrId and doesn't exist, then push reqType
					if(reqType.appObjAttrId && reqType.appObjAttrId !== 0) 
						this.pushPopSelected( reqType, evt.checked );
				}
			} else {
				attr.objId = reqType.id;
				this.pushPopSelected( attr, evt.checked, 'attrId', attr.id );
				let attrExist1:boolean = false;
				reqType.attributes.some( (item:any) => {
					if( item.checked ) {
						attrExist1 = true;
						return true;
					}
				})
				// If all attributes are unchecked, then add this reqType
				if( reqType.checked && ! attrExist1 ) this.pushPopSelected( reqType, !evt.checked );
			}
		}

		//console.log(this.selections);
	}

	pushPopSelected(row:any,checked:boolean=false,key:string='id',attrId:number=0) {
		let idx:number = (key === 'id')?this.getObjIdx( row ):this.getObjIndex( row, key );
		if( idx === -1)
			this.selections.push( this.setObj( row, checked, attrId ) );
		else
			this.selections.splice( idx, 1 );
	}

	setObj(row:any,checked:boolean=true,attrId:number=0): any {
		return {
					appObjAttrId: row.appObjAttrId || 0,
					id: row.objId || row.id,//In case of attribute set objId else id(Req. Type)
					attrId: attrId,
					objAttrId: row.objAttrId || 0,
					active: +checked,
					modifiedByID: this.globalService.user.id
				}
	}

	getObjIndex(row:any,key:string='id'): number {
		let findIdx:number = -1;
		this.selections.forEach( (item:any,idx:number) => {
			if( row.id === item[key] && row.objAttrId === item.objAttrId ) findIdx = idx;
		})
		return findIdx;
	}

	getObjIdx(row:any,key:string='id'): number {
		let findIdx:number = -1;
		this.selections.forEach( (item:any,idx:number) => {
			if( row.id === item[key] && item.attrId === 0 ) findIdx = idx;
		})
		return findIdx;
	}

	onSelectAll(reqType:any) {
		reqType.checked = true;
		reqType.attributes.forEach( (attr:any) => {
			attr.checked = true;
			attr.objId = reqType.id;
			this.pushPopSelected( attr, true, 'attrId', attr.id );
		});
	}
}
