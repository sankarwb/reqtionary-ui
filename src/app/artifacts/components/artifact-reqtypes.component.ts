import { Component, Input } from "@angular/core";
import { RequirementType } from "../../models/Requirement-type.model";
import { ArtifactsService } from "../services";

@Component({
    selector: 'artifact-reqtype',
    template: `
    <div class="reqtypes-container">
        <span *ngFor="let reqtype of reqtypes;" 
        style="font-size: 12px; font-weight: bold; border-radius: 20px; padding: 5px 10px;" 
        [style.background]="reqtype.color">{{reqtype.name}}</span>
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
    constructor(
        private artifactsService: ArtifactsService
    ) {}

    @Input() applicationId: number;

    ngOnInit() {
        const subscription = this.artifactsService.requirementtypes(this.applicationId).subscribe(reqtypes => {
            this.reqtypes = reqtypes;
        });
        this.artifactsService.subscriptions.push(subscription);
    }
    private reqtypes: RequirementType[];
}
