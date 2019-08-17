import { Pipe, PipeTransform } from '@angular/core';
import { Artifact } from '../vo/artifact';

@Pipe ({
	name: 'artifactFilter',
	pure: true
})

export class ArtifactFilterPipe implements PipeTransform {
	
	transform(items: Artifact[], filter: any): any {
		if (!filter || filter === null || Object.keys(filter).length == 0) return items;
		return items.filter(item => this.filters(item, filter));
	}

	filters(item:any, filter:any):boolean{
		let filterBool = false;
		if (typeof filter == 'object') {
			for(let key in filter){
				if (filter[key] !== "" && Array.isArray(filter[key])) {
					filter[key].some((filterItem:any) => { 
						filterBool = (key in item) && item[key].toString().indexOf(filterItem) !== -1;
						if (filterBool) return filterBool;
					});
				} else {
						filterBool = (filter[key] !== "" && (item.hasOwnProperty(key) ? item[key].toString().toLowerCase().indexOf(filter[key].toString().toLowerCase()) !== -1 : false));
				}
				if (!filterBool) return filterBool;
			}
			return filterBool;
		} else {
			return item.toLowerCase().includes(filter.toLowerCase());
		}
	}
}