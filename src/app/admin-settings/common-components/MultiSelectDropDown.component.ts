import { Component, Input, Output, EventEmitter } from '@angular/core';
//import 'multiselectjs';
declare var $: any;
@Component({
	selector: 'multi-select-dropdown',
	template: `
		<div *ngIf="options">
			<select id="{{dropDownID}}" multiple="multiple" *ngIf="!objectKey">
				<option *ngFor="let option of options" value="{{option.value}}">{{option.value}}</option>
			</select>
			<select id="{{dropDownID}}" multiple="multiple" *ngIf="objectKey">
				<option *ngFor="let option of options" value="{{option[objectKey].value}}">{{option[objectKey].value}}</option>
			</select>
		</div>
		`
})
export class MultiSelectDropDown {
	@Input() options: string[];
	@Input() dropDownID: string;
	@Input() objectKey: string;
	@Input() selection: string[];
	@Input() includeSelectAll: boolean = true;
	@Output() selectionChange = new EventEmitter<string[]>();
	ngAfterViewInit(){
		let that = this;
		function onSelectionChange(selected:string[]) {
			that.selectionChange.emit(selected);
		}

		$('#'+this.dropDownID).multiselect({
			includeSelectAllOption: true,
			onChange: function() {
				onSelectionChange(this.$select.val());
			},
			onSelectAll: function() {
				onSelectionChange(this.$select.val());
			}
		});
	}
}