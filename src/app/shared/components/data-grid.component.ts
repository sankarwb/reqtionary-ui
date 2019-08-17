import {Component, Input, Output, EventEmitter, ViewChild, OnInit} from "@angular/core";
import { FormGroup } from "@angular/forms";

@Component({
    selector: 'data-grid',
    templateUrl: 'data-grid.component.html'
})
export class DataGridComponent implements OnInit {

    @ViewChild('filterForm', {static: true}) filterForm: FormGroup;
    @Input() columns: {[key: string]: any}[];
    @Input() data: {[key: string]: any}[];
    customFilter: any = {};
    @Output() selectedItems = new EventEmitter<any[]>();
    @Output() linkClick = new EventEmitter<any>();

    constructor() {}

    ngOnInit() {
        if (this.filterForm) {
            this.filterForm.valueChanges.subscribe(changes => {
                this.customFilter = this.filterForm.value;
            })
        }
    }

    onCheckAll(evt: {[key: string]: any}): void {
        this.emitSelectedItems(null, evt.target.checked, true);
    }

    onChecked(evt: {[key: string]: any}, row: {[key: string]: any}): void {
        this.emitSelectedItems(row, evt.target.checked);
    }

    onLinkClick(data: any): void {
        this.linkClick.emit(data);
    }

    emitSelectedItems(selectedRow?: {[key: string]: any}, checked?: boolean, checkAll?: boolean): void {
        if (this.data && this.data.length) {
            let selected = [];
            this.data.forEach(row => {
                if (checkAll) {
                    row.checked = checked;
                } else if (selectedRow) {
                    if (selectedRow.id === row.id) {
                        row.checked = checked;
                    }
                }
                if (row.checked) {
                    selected.push(row.id);
                }
            });
            this.selectedItems.emit(selected);
        }
    }
}