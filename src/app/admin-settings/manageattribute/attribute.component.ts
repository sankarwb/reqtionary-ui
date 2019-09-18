import { Component, OnInit } from '@angular/core';

import { GlobalSharedService } from '../../services/globalShared.service';
import { AdminSettingsService } from '../../services/admin-settings.service';
import { AttributeService } from '../../services/attribute.service';

import { AdminSettings } from '../../interface/AdminSettings';

export class Attribute {	
	constructor(
		public id: number=0,
		public name: string='',
		public desc: string='',
		public type: string='',
		public system: number=0,
		public status: number=0
	) {}
}

export class AttributeValue {	
	constructor(
		public id: number=0,
		public value: string='',
		public active: number=1,
		public order: number=0,
		public defaultType: string='0',
	) {}
}

@Component({
	selector: 'attribute',
	templateUrl: 'attribute.component.html'
})

export class AttributeComponent implements OnInit, AdminSettings {
	TEXT_INPUT:string = "Text Input";
	NUMERIC_INPUT:string = "Numeric Input";
	DATE_INPUT:string = "Date Input";
	COMBO_BOX:string = "Combo Box";
	CHECK_BOX:string = "Check Box";
	RADIO_BOX:string = "Radio Button";

	selectedIndex:number = 0;
	label:string = "Add New";
	columns:any[] = [
		{key:'id',value:'Id',display:false,width:0},
		{key:'name',value:'Name',dataType:'link',display:true,width:15},
		{key:'desc',value:'Description',display:true,width:30},
		{key:'type',value:'Attribute Type',display:true,width:8},
		{key:'default',value:'Default',display:false,width:0},
		{key:'system',value:'System Type',display:false,width:0},
		{key:'modifiedBy',value:'Modified By',display:true,width:8},
		{key:'modifiedDate',value:'Modified Date',dataType:'date',display:true,width:8}
	];

	constructor(public globalService:GlobalSharedService ,private adminService: AdminSettingsService,private attributeService: AttributeService) {}
	selectedRow:any;
	ngOnInit() {
		if( ! this.globalService.attributes ) this.updateList();
	}

	onTabChange(evt:any) {
		this.selectedIndex = evt.index;
		if( this.selectedIndex === 0) {
			this.label = "Add New";
			this.newRow();
		} else if(this.selectedIndex === 1) {
			if( this.label.indexOf('Edit') !== -1 && !(this.selectedRow.values[this.selectedRow.values.length-1] instanceof AttributeValue) ) {
				this.selectedRow.values.push(new AttributeValue());
			}
			if(this.label.indexOf('Add') === 0)
				this.globalService.adminSettingsActionEmitter.emit(0);
			else
				this.globalService.adminSettingsActionEmitter.emit(1);
		}
	}
	
	newRow(createValue:boolean=false) {
		if(createValue) {
			if(this.selectedRow.values)
				this.selectedRow.values.push(new AttributeValue());
			else
				this.selectedRow.values = [new AttributeValue()];
		} else {
			this.selectedRow = new Attribute(0,'','',this.TEXT_INPUT);
			this.selectedRow.values = [new AttributeValue()];
		}
	}

	save() {
		let values:any[] = [];
		this.selectedRow.values.forEach( (val:any) => {
			if( (('newValue' in val) && val.newValue !== val.value) 
				|| (('newDefaultType' in val) && (val.newDefaultType !== val.defaultType || val.newDefaultType === 'changed')) 
				|| (('oldorder' in val) && val['oldorder'] !== val['order'])
				|| (('oldactive' in val) && val['oldactive'] !== val['active'] )) {
				val.value = val.newValue || val.value;
				val.defaultType = (val.newDefaultType && val.newDefaultType !== 'changed') ? val.newDefaultType : val.defaultType;
				values.push(val);
			}
		})
		this.selectedRow.values = values;
		this.selectedRow.orgId = this.globalService.getRequest().orgId;
		this.selectedRow.modifiedByID = this.globalService.user.id;

		this.attributeService.updateAttribute(this.selectedRow).subscribe((resp:any) => {
			this.globalService.notification.emit(resp.success);
			this.globalService.adminSettingsActionEmitter.emit(2);
		}, err => this.globalService.notification.emit(err.success));
	}

	updateList() {
		this.selectedIndex = 0;
		this.adminService.getAttributes({orgId:this.globalService.getRequest().orgId}).subscribe(result => this.globalService.attributes = result);
	}
	
	onItemSelected(row:any) {
		this.selectedRow = row;
		this.label = `Edit ${row.name}`;
		this.selectedIndex = 1;
		this.globalService.adminSettingsActionEmitter.emit(1);
	}

	onEditValue(evt: any, row: any) {
		row.newValue = evt.target.innerHTML;
	}

	onOrderChange(newVal:any,key:string,row:any) {
		if(newVal !== row[key]) {
			if(!row[`old${key}`]) row[`old${key}`] = row[key];
			row[key] = newVal;
		}
	}

	onDelete(active:number,row:any) {
		if(!row['oldactive']) row['oldactive'] = row['active'];
		row.active = 1-active;
	}

	onDefaultTypeChange(evt: any, row: any) {
		row.newDefaultType = evt;
		if( evt == 1 ) {
			this.selectedRow.values.forEach( (item:any) => {
				if(item.id !== row.id && item.defaultType == 1) {
					item.defaultType = "0";
					item.newDefaultType = "changed";
				}
			})
		}
	}
}