import { Component, OnInit } from '@angular/core';
import { forkJoin } from 'rxjs';

import { Attribute, AttributeValue } from '../manageattribute/attribute.component';

import { GlobalSharedService } from '../../services/globalShared.service';
import { AdminSettingsService } from '../../services/admin-settings.service';
import { RequirementTypeService } from '../../services/requirement-type.service';
import { AttributeService } from '../../services/attribute.service';

import { AdminSettings } from '../../interface/AdminSettings';

export class RequirementType {	
	constructor(
		public checked: boolean=false,
		public id: number=0,
		public name: string='',
		public desc: string='',
		public prefix: string='',
		public color: string='',
		public type: number=0,
		public attributes: Attribute[]=[],
		public values: AttributeValue[]=[new AttributeValue()],
		public modifiedByID: number=0
	) {}
}

@Component({
	selector: 'requirement-type',
	templateUrl: 'requirement-type.component.html'
})

export class RequirementTypeComponent implements OnInit, AdminSettings {
	attributes:any[] = [];
	selectedIndex:number = 0;
	label:string = "Add New";
	columns:any[] = [
		{key:'id',value:'Id',display:false,width:0},
		{key:'name',value:'Name',dataType:'link',display:true,width:15},
		{key:'desc',value:'Description',display:true,width:25},
		{key:'color',value:'Color',dataType:'color',displayTextKey:'code',display:true,width:2},
		{key:'attributes',value:'Attributes',dataType:'array',display:true,width:30},
		{key:'modifiedBy',value:'Modified By',display:true,width:8},
		{key:'modifiedDate',value:'Modified Date',dataType:'date',display:true,width:8}
	];
	selectedRow:any;
	statusAttr:any = new Attribute(0,'','','Combo Box',-1,1);
	constructor(public globalService:GlobalSharedService ,private adminService: AdminSettingsService, private reqTypeService: RequirementTypeService, private attributeService: AttributeService) {}

	ngOnInit() {
		if( ! this.globalService.requirementTypes ) this.updateList();
		if( ! this.globalService.attributes ) {
			this.adminService.getAttributes({orgId:this.globalService.getRequest().orgId}).subscribe(result => {
				this.globalService.attributes = result;
				this.attributes = [].concat([...this.globalService.attributes].filter( (attr:any) => attr.system === 0 ));
			});
		} else
			this.attributes = [].concat([...this.globalService.attributes].filter( (attr:any) => attr.system === 0 ));
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
		//this.globalService.adminSettingsActionEmitter.emit( (this.selectedIndex === 1) ?  ? 0 : 1 : 2 );
	}

	newRow(createValue:boolean=false) {
		if(createValue) {
			if(this.selectedRow.values)
				this.selectedRow.values.push(new AttributeValue());
			else
				this.selectedRow.values = [new AttributeValue()];
		} else {
			this.selectedRow = new RequirementType();
			this.statusAttr = new Attribute(0,'','','Combo Box',-1,1);
		}
		//this.attributes = [...this.globalService.attributes].filter( (attr:any) => attr.system === 0 );
	}

	updateList() {
		this.selectedIndex = 0;
		this.adminService.getRequirementTypes({orgId:this.globalService.getRequest().orgId}).subscribe(result => this.globalService.requirementTypes = result);
	}
	
	save() {
		let selectedAttributes:any[] = [];
		this.attributes.forEach( (item:any) => {
			if( item.hasOwnProperty('newChecked') && item.newChecked !== item.checked ) {
				item.active = item.newChecked?1:0;
				delete item.newChecked;
				selectedAttributes.push(item);
			}
		})
		this.selectedRow.attributes = selectedAttributes;
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
		// create status attribute for a new requirement type
		if(this.selectedRow.id === 0) {
			this.statusAttr.name = `${this.selectedRow.name} status`;
			this.statusAttr.desc = `This attribute is of type status for ${this.selectedRow.desc}`;
		}
		this.selectedRow.statusAttr = this.statusAttr;
		this.selectedRow.orgId = this.globalService.getRequest().orgId;
		this.selectedRow.modifiedByID = this.globalService.user.id;
		//console.log(this.selectedRow);
		this.reqTypeService.updateRequirementType(this.selectedRow).subscribe((resp:any) => {
			this.globalService.notification.emit(resp.success);
			this.globalService.adminSettingsActionEmitter.emit(2);
		}, err => this.globalService.notification.emit(err.success));
	}

	onItemSelected(row:any) {
		this.selectedRow = row;
		this.newRow(true);
		let statusAttr:Array<any> = (<Array<any>>row.attributes).filter( item => item.system === -1 );
		if( statusAttr && statusAttr.length > 0 ) {
			this.statusAttr = statusAttr[0];
			forkJoin(
				this.attributeService.getAttributeValues({orgId:this.globalService.getRequest().orgId,attributeId:statusAttr[0].id}), 
				this.reqTypeService.getObjectArtifactAttributes({orgId:this.globalService.getRequest().orgId,id:this.selectedRow.id}))
			.subscribe( (result: any) => {
				row.values = !('error' in result[0]) ? result[0] : [];
				row.values.push(new AttributeValue());
				this.processArtifactAttributes( !('error' in result[1]) ? result[1] : [] );
				this.switchTab(row);
			}, err => this.switchTab(row) );
		} else {
			this.reqTypeService.getObjectArtifactAttributes({orgId:this.globalService.getRequest().orgId,id:this.selectedRow.id})
			.subscribe( result => {
				this.processArtifactAttributes( !('error' in result) ? result : [] );
				this.switchTab(row);
			}, err => this.switchTab(row) );
		}
	}

	switchTab(row:any, tabIndex:number=1) {
		this.label = `Edit ${row.name}`;
		this.selectedIndex = 1;
		this.globalService.adminSettingsActionEmitter.emit(1);
	}

	// method to disable attributes which are used in artifacts
	processArtifactAttributes(artifactAttributes:number[]) {
		//this.attributes = [].concat([...this.globalService.attributes].filter( (attr:any) => attr.system === 0 ));
		this.attributes.forEach( (attr:any) => {
			let filtered:any[] = artifactAttributes.filter( ( artifactAttribute:number ) => artifactAttribute === attr.id );
			attr.artifactAttrId = filtered[0] ? filtered[0].artifactAttrId : 0 ;
		})
	}

	selectedAttribute(row: any):boolean {
		if( this.selectedRow) {
			let filtered:any[] = (<Array<any>>this.selectedRow.attributes).filter(item => item.id === row.id && item.active == 1);
			row.checked = filtered.length === 1;
			row.objAttrId = filtered[0] ? filtered[0].objAttrId : 0;
		}
		return row.checked;
	}
	filterTxt:string = "";
	filterAttribute(evt:any) {
		if(evt === "" || (evt.target && evt.target.innerText === "")) {
			this.filterTxt = "";
			return [...this.attributes]
		};
		this.filterTxt = (evt && evt.target)?evt.target.innerText:evt;
		return [].concat(this.attributes.filter((item:any) => item.name.toLowerCase().indexOf(this.filterTxt.toLowerCase()) !== -1));
	}

	onAttributeSelection(evt: any, row: any) {
		row.newChecked = evt.checked;
		if( ! row.objAttrId ) row.objAttrId = 0;
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