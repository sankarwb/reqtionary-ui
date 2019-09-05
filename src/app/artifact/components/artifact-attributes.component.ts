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
        if (!!this._artifact.attributes) {
            this._artifact.attributes.forEach(attribute => {
                this.selections[attribute.appObjectAttributeId] = attribute.value;
            });
        }
    }
    get artifact(): Artifact {
        return this._artifact;
    }
    private selections: {[key: number]: any} = {};

    getAttributeSelections() {
        let attributes = [];
        this.artifact.attributes.forEach(attribute => {
            attribute.value = Array.isArray(this.selections[attribute.appObjectAttributeId]) ? this.selections[attribute.appObjectAttributeId].join() : this.selections[attribute.appObjectAttributeId];
        });
        for (const [key, value] of Object.entries(this.selections)) {
            let attribute = this.artifact.attributes.find(item => item.appObjectAttributeId===parseInt(key));
            if (!attribute) {
                const props = this.attributes.find(attribute => attribute.appObjectAttributeId===parseInt(key));
                attribute = new ArtifactAttribute();
                attribute.id = props.id;
                attribute.appObjectAttributeId = props.appObjectAttributeId;
            }
            attribute.value = Array.isArray(value) ? value.join() : value;
            attributes.push(attribute);
        }
        this.artifact.attributes = attributes;
    }

    ngOnDestroy() {
        this.getAttributeSelections();
    }

}