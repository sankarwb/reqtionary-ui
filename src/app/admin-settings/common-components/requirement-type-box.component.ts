import { Component, Input, OnInit, Output,EventEmitter } from "@angular/core";

declare var $:any; 

@Component({
	selector: 'requirement-type-box',
	template: `
	<div style="padding-left: 0px; display: flex; flex-direction: row; align-items: center;" *ngIf="requirementTypes && selectedRequirementType">
		<!--<mat-button-toggle-group #group="matButtonToggleGroup" [value]="selectedRequirementType.objectCode" (change)="onRequirementTypeSelected($event)">
			<mat-button-toggle [value]="reqType.objectCode" *ngFor="let reqType of requirementTypes">
				<span [style.color]="reqType.objectColor">{{reqType.objectCode}}</span>
			</mat-button-toggle>
		</mat-button-toggle-group>-->
		<div *ngFor="let reqType of requirementTypes" style="border-radius: 5px;"
		[ngStyle]="{'background':(reqType.objectCode==selectedRequirementType.objectCode)?'#ccc':'#fff'}">
			<a class="btn" (click)="onRequirementTypeSelected(reqType)"
			[ngStyle]="{'color':'#ffffff','background-color': (reqType.objectCode==selectedRequirementType.objectCode)?'#ccc':reqType.objectColor}"
			style="margin: 2px;opacity: 0.77;
			color: white;
			font-size: 13px;
			font-weight: 600;
			line-height: 1.62;
			letter-spacing: 0.2px;
			background-repeat: repeat-x;">{{reqType.objectCode}}</a>
		</div>
		<div><a href="#wheel2" class="wheel-button btn btn-default" role="button" style=""><i class="glyphicon glyphicon-plus" style=""></i>&nbsp;Add</a></div>
		<ul id="wheel2" class="wheel">
		  <li class="item" *ngFor="let reqType of requirementTypes">
		  	<a class="btn" (click)="createNewArtifact(reqType)"
			[ngStyle]="{'color':'#ffffff','background-color': reqType.objectColor,'background-repeat': 'repeat-x'}"
			style="margin: 2px;">{{reqType.objectCode}}</a>
		  </li>
		</ul>
		<!-- <div class="pull-right" *ngIf="showFilterBox">
			<mat-form-field >
				<input matInput placeholder="Search" >
			</mat-form-field>
			<i class="material-icons">search</i>
		</div> -->
	</div>
	`,
	styles:[
		'.wheel-button {position: relative;}',
		'.wheel-button span {transition: all 1s ease;display: block;',
		`.wheel {margin: 0;padding: 0;list-style: none;
		  width: 200px; /* this will determine the diameter of the circle  */
		  height: 200px; /* this will determine the diameter of the circle  */
		  visibility: hidden;position: relative;display: none;}`,
		'.wheel li {overflow: hidden;float:left;}',
		'.wheel li a {display: block;}',
		'.mat-raised-button{border-radius:2px;color:#ffff; background-color:red;}'
	]
})
export class RequirementTypeBoxComponent implements OnInit {

	@Input() showFilterBox:boolean = true;
	@Input() requirementTypes:any[];
	private selectedRequirementType:any;

	constructor() {}

	ngOnInit() {
		if(this.requirementTypes && this.requirementTypes.length > 0) 
			this.selectedRequirementType = this.requirementTypes[0];
	}

	ngAfterViewInit() {
		$(".wheel-button").wheelmenu({
		  trigger: "hover", // Can be "click" or "hover". Default: "click"
		  animation: "fly", // Entrance animation. Can be "fade" or "fly". Default: "fade"
		  animationSpeed: "fast", // Entrance animation speed. Can be "instant", "fast", "medium", or "slow". Default: "medium"
		  angle: "all", // Angle which the menu will appear. Can be "all", "N", "NE", "E", "SE", "S", "SW", "W", "NW", or even array [0, 360]. Default: "all" or [0, 360]
		});
	}

	@Output() createRequirementType = new EventEmitter<any>();
	createNewArtifact(reqType:any){
		this.createRequirementType.emit(reqType);
	}

	@Output() selectRequirementType = new EventEmitter<any>();
	onRequirementTypeSelected(reqType: any) {
		this.selectedRequirementType = reqType;
		this.selectRequirementType.emit(this.selectedRequirementType);
	}
}