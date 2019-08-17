import { Component, Input, OnInit, OnChanges, SimpleChanges } from '@angular/core';

@Component({
  selector: 'image-slider',
  template: `
  <div class="col-md-12 col-sm-12 col-xs-12 align-top" *ngIf="attachments.length>0" style="padding: 0;left: 4%;">
  	<img class="col-md-2 card" [src]="imgLeft">
    <div class="col-md-7" *ngIf="!newAttachment || (newAttachment && newAttachment.isSuccess)" style="text-align: center;">
      <img class="card" [src]="imgCenter" style="height:438px;width:auto;max-width:650px;">
    </div>          
    <div class="col-md-7" *ngIf="newAttachment && !newAttachment.isSuccess" style="margin: 0 20px 0 20px;text-align: center;">
  	  <img class="col-md-12 card blur" [src]="imgCenter">
      <mat-progress-bar class="col-md-3 col-sm-3 col-xs-4" [value]="newAttachment.progress"></mat-progress-bar>
    </div>
  	<img class="col-md-2 card" [src]="imgRight">
  </div>
  <div class="center col-md-12 col-sm-12 col-xs-12 align-top" *ngIf="attachments.length>0">
    <!--<a class="glyphicon glyphicon-chevron-left" *ngIf="attachments.length>1" (click)="slideImage('prev')"></a>-->
    <span class="glyphicon glyphicon-trash" mdTooltip="delete"></span>
    <span class="glyphicon glyphicon-download" mdTooltip="download"></span>
    <span mdTooltip="open">{{imgCenter?.changingThisBreaksApplicationSecurity.split('/')[2]}}</span>
    <!--<a class="glyphicon glyphicon-chevron-right" *ngIf="attachments.length>1" (click)="slideImage('next')"></a>-->
  </div>
  <div class="navBulletsWrapper center col-md-12 col-sm-12 col-xs-12 align-top" *ngIf="attachments.length>1">
    <!--<div [ngClass]="{'active':(imgCenter===attachment)}" *ngFor="let attachment of attachments;let idx=index;" (click)="onImgSelect(idx)">{{idx+1}}</div>-->
    <mat-slider #slider min="0" [max]="attachments.length-1" step="1" [value]="attachments.length-1" tickInterval="1" (change)="onImgSelect(slider.value)"></mat-slider>
  </div>
  <div class="center col-md-12 col-sm-12 col-xs-12" *ngIf="attachments.length===0">
    <h3>No attachments found</h3>
  </div>
  `,
  styles:[
  	'img.card {box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);padding: 0;}',
    'img.blur {filter: blur(10px);}',
    '.center {text-align: center}',
    '.navBulletsWrapper {text-align:center;margin:0 auto;display:table;font-size:0;position:relative;}',
    '.navBulletsWrapper div {border:none;display: inline-block;width: 11px;height: 11px;background-color: #CCCCCC;font-size: 0;margin: 2px 9px;cursor: pointer;border-radius: 11px;box-shadow: inset 0 1px 3px #666666;}}',
    '.navBulletsWrapper .active {background-color: #1293dc;box-shadow:inset 0 1px 3px -1px #28b4ea,0 1px 1px rgba(0,0,0,.5);}',
    'mat-progress-bar {width:50%; height:20px; position: absolute; top: 50%; left: 25%;}',
    'mat-slider {width:50%;}',
    '.align-top {position: relative;top: 10px;}'
  ]
})
export class ImageSliderComponent implements OnChanges {
  /* Attachments slide show*/
  _attachments:string[];
  private imgLeft:string;
  private imgCenter:string; 
  private imgRight:string;
  private position:number = 0;

  /* New attchment progress */
  @Input() newAttachment:any;

  constructor(){}
  @Input() set attachments(attachments:string[]) {
  	this._attachments = attachments;
    if(this.attachments.length >= 2)
      this.position = this.attachments.length-2;
    else
      this.position = this.attachments.length-1;
    this.slideImage();
  }

  get attachments() {
    return this._attachments;
  }

  ngOnChanges(changes: SimpleChanges) {
    console.log(changes);
  }

  //Method to find next/prev position and slide the attachments
  slideImage(direction:string=""){
    if( direction === 'prev') {
      if(this.position > 0) {
        --this.position;
        this.imgLeft = (this.position === 0)?this.attachments[this.attachments.length-1]:this.attachments[this.position-1];
        this.imgRight = this.attachments[this.position+1];
      } else {
        this.position = this.attachments.length-1;
        if(this.attachments.length >= 2)
          this.imgLeft = this.attachments[this.position-1];
        if(this.attachments.length >= 3)
          this.imgRight = this.attachments[0];
      }
    } else {
      if(this.position < this.attachments.length-1) {
        ++this.position;
        this.imgLeft = this.attachments[this.position-1];
        this.imgRight = (this.position === this.attachments.length-1)?this.attachments[0]:this.attachments[this.position+1];
      } else {
        this.position = 0;
        if(this.attachments.length >= 2)
          this.imgLeft = this.attachments[this.attachments.length-1];
        if(this.attachments.length >= 3)
          this.imgRight = this.attachments[this.position+1];
      }
    }
  	//[this.imgLeft,this.imgCenter,this.imgRight] = this.attachments.slice(this.position,this.position+3);
    this.imgCenter = this.attachments[this.position];
  }

  onImgSelect(idx:number) {
    this.position = (idx===0)?this.attachments.length-1:(idx===this.attachments.length-1)?this.attachments.length-2:idx-1;
    this.slideImage();
  }
}
