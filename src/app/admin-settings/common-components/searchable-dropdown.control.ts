import { Component, Input, Output, ViewChild, ElementRef, EventEmitter } from '@angular/core';
import { ArtifactFilterPipe } from '../../pipes/artifactFilter.pipe';

declare var $: any;

@Component({
    selector: 'searchable-dropdown',
    template: `
        <div style="padding-left: 0; padding-right: 0;">
            <div style="display: flex; flex-flow: wrap;" (click)="openPopup($event)">
                <div style="display: flex; flex-wrap: wrap; align-items: center; flex: 1;">
                    <span *ngIf="selections.length===0">{{placeholder}}</span>
                    <span *ngFor="let selected of selections; let idx=index;">
                        <span style="padding-right: 2px;">{{selected}}</span>
                        <i class="glyphicon glyphicon-remove" style="cursor: pointer;" (click)="removeSelection($event, idx)"></i>
                    </span>
                </div>
                <i class="glyphicon glyphicon-triangle-bottom" style="margin-right: 4px; flex: 1;"></i>
            </div>
            <div class="popup" (click)="stopPropagation($event)">
                <mat-list class="popuptext" style="border: 1px solid #ccc;" [ngClass]="{'show': popupOpened}">
                    <mat-list-item>
                        <mat-form-field class="example-full-width" style="width: 98%;">
                            <input matInput #searchInput placeholder="search" [(ngModel)]="searchTxt" (input)="filter($event.target.value)">
                        </mat-form-field>
                    </mat-list-item>
                    <mat-list-item *ngFor="let option of filtered;">
                        <mat-checkbox [checked]="selections.indexOf(option)!==-1"  (change)="addSelection($event, option)">{{option}}</mat-checkbox>
                    </mat-list-item>
                </mat-list>
            </div>
        </div>
    `,
    styles: [
        `.popup {
            cursor: pointer;
            width: 100%;
        }`,
        `.popup .popuptext {
            visibility: hidden;
            width: 12%;
            padding: 8px 0;
            z-index: 1;
            background: #fff;
            position: absolute;
            height: 240px;
            overflow-y: scroll;
        }`,
        `.popup .show {
            visibility: visible;
            -webkit-animation: fadeIn 0.2s;
            animation: fadeIn 0.2s
        }`,
        `@-webkit-keyframes fadeIn {
            from {opacity: 0;} 
            to {opacity: 1;}
        }`,
        `@keyframes fadeIn {
            from {opacity: 0;}
            to {opacity:1 ;}
        }`
    ]
})

export class SearchableDropdownComponent {
    
    @ViewChild('searchInput', {static: true}) searchInput: ElementRef;
    private popupOpened = false;
    private searchTxt: string;
    @Input() placeholder: string;
    private filtered: any[];
    private selections: any[] = [];
    private _options: any[];

    @Input() set options(list : any[]) {
        this._options = list.map(item => item.value);
        this.filtered = [...this.options];
    }
    
    get options(): any[] {
        return this._options;
    }

    @Output('getSelections') emitSelections: EventEmitter<string[]> = new EventEmitter<string[]>();
    constructor(private filterPipe: ArtifactFilterPipe) {}

    ngAfterViewInit() {
        const that = this;
        $('body').on('click', () => {
            if (that.popupOpened) that.openPopup();
        })
    }

    /**************** Component Logic ************/

    timeout: any;
    openPopup(evt: any=undefined) {
        if (this.timeout) clearTimeout(this.timeout);
        this.stopPropagation(evt);
        this.popupOpened = !this.popupOpened;
        setTimeout(() => {
            this.searchInput.nativeElement.focus();
        }, 200)
    }

    addSelection(evt: any, selected: any) {
        if (!evt.checked) {
            this.removeSelection(undefined, selected);
            return;
        }
        this.selections = [...this.selections, ...[this.options[this.options.findIndex(item => item===selected)]]];
        this.emitSelections.emit(this.selections);
        this.filter(this.searchTxt);
    }

    removeSelection(evt: any, idx: number|string) {
        this.stopPropagation(evt);
        this.selections.splice((typeof idx == 'number') ? idx : this.selections.findIndex(item => item===idx), 1);
        this.emitSelections.emit(this.selections);
        this.filter(this.searchTxt);
    }

    clearSelections() {
        this.selections = [];
    }

    stopPropagation(evt) {
        if (evt) evt.stopPropagation();
    }

    filter(filterTxt: string) {
        this.filtered = this.filterPipe.transform(this.options, filterTxt);
    }

}