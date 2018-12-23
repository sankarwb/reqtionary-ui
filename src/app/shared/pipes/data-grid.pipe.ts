import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
    name: 'dataGridPipe',
    pure: true
})

export class DataGridPipe implements PipeTransform {
    transform(rows: {[key: string]: any}[], ...args: any[]): {[key: string]: any}[] {
        if (rows && rows.length && args && args.length) {
            let filterArgs = args[0];
            return rows.filter(row => this.filterLogic(row, filterArgs));
        }
        return rows;
    }

    filterLogic(row: {[key: string]: any}, filterArgs: {[key: string]: any}): boolean {
        let match = true;
        for (const key in filterArgs) {
            if (filterArgs[key] === '') {
                //match = true;
            } else if (typeof filterArgs[key] === 'boolean') {
                match = match && row[key] && (row[key].toString() === filterArgs[key]);
            } else if (typeof filterArgs[key] === 'string') {
                match = match && row[key] && row[key].toLowerCase().includes(filterArgs[key].toLowerCase());
            }
        }
        return match;
    }
}