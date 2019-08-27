import {Component, OnInit, Input, Inject} from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { Artifact, RequirementType } from '../../models';
import { ArtifactsService } from '../../shared/services';

declare var d3: any;

@Component({
    selector: 'artifact-associations',
    templateUrl: 'artifact-associations.component.html'
})

export class ArtifactAssociationsComponent implements OnInit {
    
  @Input() artifact: Artifact;
  associations: any[] = [
      {UID: 'D12', name: `Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum`, color: '0FAA36'},
      {UID: 'D13', name: 'dhs sjgd sgd gsdilkjdbas jhdgjagd', color: 'BF6FF5'},
      {UID: 'D14', name: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.', color: 'F74750'},
      {UID: 'D15', name: 'dhs sjgd sgd gsdilkjdbas jhdgjagd', color: 'F1DA09'}
  ];

  canvas: any;
  context: any;
  width: any;
  height: any;
  simulation: any;
  constructor(
    private artifactService: ArtifactsService,
    public dialog: MatDialog,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    // TODO: make service call to get associations if artifactId is not 0
    this.canvas = document.querySelector("canvas"),
    this.context = this.canvas.getContext("2d"),
    this.width = this.canvas.width,
    this.height = this.canvas.height;

    this.simulation = d3.forceSimulation()
    .force("link", d3.forceLink().id(function(d) { return d.id; }))
    .force("charge", d3.forceManyBody())
    .force("center", d3.forceCenter(this.width / 2, this.height / 2));

    d3.json("./../../../assets/miserables.json", (error, graph) => {
      if (error) throw error;
    
      this.simulation
          .nodes(graph.nodes)
          .on("tick", () => {
            this.context.clearRect(0, 0, this.width, this.height);
        
            this.context.beginPath();
            graph.links.forEach((d) => {
              this.context.moveTo(d.source.x, d.source.y);
              this.context.lineTo(d.target.x, d.target.y);
            });
            this.context.strokeStyle = "#aaa";
            this.context.stroke();
        
            this.context.beginPath();
            graph.nodes.forEach((d) => {
              this.context.moveTo(d.x + 3, d.y);
              this.context.arc(d.x, d.y, 3, 0, 2 * Math.PI);
            });
            this.context.fill();
            this.context.strokeStyle = "#fff";
            this.context.stroke();
          });
    
      this.simulation.force("link")
          .links(graph.links);
    
      d3.select(this.canvas)
          .call(d3.drag()
              .container(this.canvas)
              .subject(() => this.simulation.find(d3.event.x, d3.event.y))
              .on("start", this.dragstarted)
              .on("drag", this.dragged)
              .on("end", this.dragended));
    });
  }

  addMore() {
    this.openDialog();
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(SelectAssociationDialog, {
      width: '250px',
      data: {
        applicationId: this.route.snapshot.params.applicationId,
        projectId: this.route.snapshot.params.projectId
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      this.associations.push(result);
    });
  }

  dragstarted() {
    if (!d3.event.active) this.simulation.alphaTarget(0.3).restart();
    d3.event.subject.fx = d3.event.subject.x;
    d3.event.subject.fy = d3.event.subject.y;
  }

  dragged() {
    d3.event.subject.fx = d3.event.x;
    d3.event.subject.fy = d3.event.y;
  }

  dragended() {
    if (!d3.event.active) this.simulation.alphaTarget(0);
    d3.event.subject.fx = null;
    d3.event.subject.fy = null;
  }

  drawLink(d) {
    this.context.moveTo(d.source.x, d.source.y);
    this.context.lineTo(d.target.x, d.target.y);
  }

  drawNode(d) {
    this.context.moveTo(d.x + 3, d.y);
    this.context.arc(d.x, d.y, 3, 0, 2 * Math.PI);
  }
}

@Component({
  selector: 'select-association-dialog',
  template: `<h1 mat-dialog-title>Add</h1>
  <div mat-dialog-content>
    <mat-form-field>
      <mat-select placeholder="Select Type" (selectionChange)="onSelectReqtype($event.value)">
        <mat-option *ngFor="let reqtype of reqtypes" [value]="reqtype">{{reqtype.name}}</mat-option>
      </mat-select>
    </mat-form-field>
    <mat-form-field>
    <mat-select placeholder="Select Artifact" (selectionChange)="onSelectArtifact($event.value)">
      <mat-option *ngFor="let artifact of artifacts" [value]="artifact">{{artifact.name}}</mat-option>
    </mat-select>
    </mat-form-field>
  </div>
  <div mat-dialog-actions>
    <button mat-button (click)="onNoClick()">Cancel</button>
    <button mat-button [mat-dialog-close]="selectedAssociation" cdkFocusInitial>Associate</button>
  </div>`
})

export class SelectAssociationDialog {
  reqtypes: RequirementType[];
  artifacts: Artifact[];
  selectedReqType: RequirementType;
  selectedAssociation: any;
  constructor(
    public artifactsService: ArtifactsService,
    public dialogRef: MatDialogRef<SelectAssociationDialog>,
    @Inject(MAT_DIALOG_DATA) public data: Artifact
  ) {
    this.artifactsService.requirementtypes(this.data.applicationId).subscribe(reqtypes => {
      this.reqtypes = reqtypes;
    });
  }

  onSelectReqtype(reqType: RequirementType): void {
    this.selectedReqType = reqType;
    this.artifactsService.artifacts(this.data.applicationId, this.data.projectId, reqType.id)
    .subscribe(artifacts => {
      this.artifacts = artifacts;
    })
  }

  onSelectArtifact(artifact: Artifact): void {
    this.selectedAssociation = {...this.selectedReqType, ...artifact};
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}