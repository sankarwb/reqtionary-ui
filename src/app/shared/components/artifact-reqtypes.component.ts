import { Component, Input, Output, EventEmitter } from "@angular/core";
import { Subscription } from "rxjs";

import { RequirementType } from "../../models/requirement-type.model";
import { ArtifactsService } from "../services";

@Component({
    selector: 'artifact-reqtype',
    template: `
    <div class="reqtypes-container">
        <span *ngFor="let reqtype of reqtypes;" (click)="onRequirementTypeSelected(reqtype)"
        style="font-size: 12px; font-weight: bold; border-radius: 20px; padding: 5px 10px; margin-bottom: 5px; cursor: pointer;" 
        [style.background]="reqtype.color">{{reqtype.name}}</span>
        <a style="color: #FFF; font-size: 14px; border-radius: 20px; background-image: linear-gradient(to top, #3079EA, #5BCCF7);"><mat-icon>add</mat-icon> Add</a>
    </div>
    `,
    styles: [
        `.reqtypes-container {
            display: flex;
            flex-direction: row;
            flex-wrap: wrap;
        }`,
        `.reqtypes-container span {
            margin-right: 10px;
            color: #fff;
        }`
    ]
})
export class ArtifactReqtypesComponent {

    private reqtypes: RequirementType[];
    private selectedRequirementTypeId: number;
    private subscriptions: Subscription[] = [];
    @Input() applicationId: number;

    @Output() requirementTypesLoaded = new EventEmitter<number>();
    @Output() changeRequirementType = new EventEmitter<number>();

    constructor(private artifactsService: ArtifactsService) {}

    ngAfterViewInit() {
        const subscription = this.artifactsService.requirementtypes(this.applicationId).subscribe(reqtypes => {
            this.reqtypes = reqtypes;
            this.notifyRequirementTypesLoaded();
        });
        this.subscriptions.push(subscription);
    }

    private notifyRequirementTypesLoaded(): void {
        this.requirementTypesLoaded.emit((this.reqtypes && this.reqtypes.length) ? this.reqtypes[0].id : 0);
    }

    private onRequirementTypeSelected(requirementType: RequirementType): void {
        if (this.selectedRequirementTypeId !== requirementType.id) {
            this.changeRequirementType.emit(requirementType.id);
        }
        this.selectedRequirementTypeId = requirementType.id;
    }
}
