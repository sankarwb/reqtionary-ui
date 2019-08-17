// Searchable table component: Used only in all admin setting screens and registered only in AdminSettingsModule
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

declare var $:any;

@Component({
	selector: 'searchable-table',
	templateUrl: 'searchable-table.component.html'
})

export class SearchableTableComponent {
	@Input() parentList:any[] = [];
	_rows: any[] = [];
	@Input() set rows(list:any[]) {
		if( !list ) return;
		this._rows = list;
		this.copyRows = [...this.rows];
	}
	get rows(): any[] {
		return this._rows;
	}
	_columns: any[] = [];
	@Input() set columns(list:any[]) {
		this._columns = list.filter(item=>item.display);
	}
	get columns():any[] {
		return this._columns;
	}
	constructor(private sanitizer: DomSanitizer) {
		this.onFilter = this.onFilter.bind(this);
	}

	ngAfterViewInit() {
		this.columns.forEach(item => {
			(function(val:any,filterFn:Function){
				$(`#${item.key}`).on('input',(evt:any) => {
					filterFn(evt.target.innerText,val.key);
				})
			})(item,this.onFilter)
		})
	}
	copyRows:any[];
	filterObj:any = {};
	onFilter(filterTxt:string,column:string) {
		if (this.filterObj.hasOwnProperty(column) && this.filterObj[column] === "") 
			delete this.filterObj[column];
		else 
			this.filterObj[column] = filterTxt;
		if(Object.keys(this.filterObj).length === 0) {
			this.copyRows = [...this.rows];
			return;
		}
		this.copyRows = [].concat([...this.rows].filter(item => {
			let filterBool = false;
			for(let key in this.filterObj){
				filterBool = (Array.isArray(item[key]) ? this.toString(item[key]) : item[key]).toLowerCase().indexOf(this.filterObj[key].toLowerCase()) !== -1;
				if ( ! filterBool ) return filterBool;				
			}
			return filterBool;
		}));
	}

	@Output() itemSelected = new EventEmitter<any>();
	onclick(evt:any,row:any) {
		this.itemSelected.emit(row);
	}

	getFieldName(key: number|string): string {
		for( let i = 0; i < this.parentList.length; i++ ) {
			if( key === this.parentList[i].id ) return this.parentList[i].name;
		}
		return '';
	}

	//concat name strings from array of items after filtered system(attribute type system===1) items
	toString(arr:any[]): SafeHtml {
		return this.sanitizer.bypassSecurityTrustHtml(arr.filter(item =>item.system!==1).map(item =>{return item.name}).toString());
	}
}