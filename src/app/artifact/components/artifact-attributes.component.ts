import {Component, Input, OnDestroy} from '@angular/core';

import {Artifact, Attribute, ArtifactAttribute} from '../../models';

@Component({
    selector: 'artifact-attributes',
    templateUrl: 'artifact-attributes.component.html',
    styles: [
        `form .flex-box-column {
            margin: 0px 10px 10px 0px;
        }
        `,
        `.flex-box-row label, .flex-box-column label {
            color: #70757B;
            font-size: 10px;
            font-weight: bold;
            padding: 4px 4px 4px 0px;
        }
        `
    ]
})

export class ArtifactAttributesComponent implements OnDestroy {
    private _artifact: Artifact;
    @Input() attributes: Attribute[];
    @Input() set artifact(artifact: Artifact) {
        this._artifact = artifact;
        if (this._artifact.attributes) {
            this._artifact.attributes.forEach(attribute => {
                this.selections[attribute.id] = attribute.value;
            });
        }
    }
    get artifact(): Artifact {
        return this._artifact;
    }
    private selections: {[key: number]: any} = {};

    getAttributeSelections() {
        if (!this.artifact.attributes) {
            this.artifact.attributes = [];
        }
        this.artifact.attributes.forEach(attribute => {
            attribute.value = Array.isArray(this.selections[attribute.id]) ? this.selections[attribute.id].join() : this.selections[attribute.id];
        });
        Object.keys(this.selections).forEach(selection => {
            if (this.artifact.attributes.findIndex(attribute => attribute.id===parseInt(selection)) === -1) {
                let attribute = new ArtifactAttribute();
                attribute.id = parseInt(selection);
                attribute.appObjectAttributeId = this.attributes.find(attribute => attribute.id===parseInt(selection)).appObjectAttributeId;
                attribute.value = Array.isArray(this.selections[selection]) ? this.selections[selection].join() : this.selections[selection];
                this.artifact.attributes.push(attribute);
            }
        });
    }

    ngOnDestroy() {
        this.getAttributeSelections();
    }

}