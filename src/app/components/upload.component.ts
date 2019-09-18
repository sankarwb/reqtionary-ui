import { Component, Input, Output, EventEmitter } from "@angular/core";
import { FileUploader } from 'ng2-file-upload';
import { GlobalSharedService } from '../services/globalShared.service';

@Component({
	selector: 'file-upload',
	template: `
        <div class="container-fluid min-padd-right-left">
            <div class="col-md-2 min-padd-right-left">
                <form>
                    <div class="form-group">
                        <input type="file" class="custom-file-input" name="multiple" ng2FileSelect [uploader]="uploader" multiple 
                        accept="image/*,.pdf"/>
                    </div>
                </form>
            </div>
            <div class="row">    
                <div class="col-md-12">
                    Queue length: {{ uploader?.queue?.length }}
                    <table class="table table-responsive table-striped">
                        <thead>
                        <tr>
                            <th width="50%">Name</th>
                            <th>Size</th>
                            <th>Progress</th>
                            <th>Status</th>
                            <th>Actions</th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr *ngFor="let item of uploader.queue">
                            <td><strong>{{ item.file.name }}</strong></td>
                            <td nowrap>{{ item.file.size/1024/1024 | number:'.2' }} MB</td>
                            <td>
                                <div class="progress" style="margin-bottom: 0;">
                                    <div class="progress-bar" role="progressbar" [ngStyle]="{ 'width': item.progress + '%' }"></div>
                                </div>
                            </td>
                            <td class="text-center">
                                <span *ngIf="item.isSuccess"><i class="glyphicon glyphicon-ok"></i></span>
                                <span *ngIf="item.isCancel"><i class="glyphicon glyphicon-ban-circle"></i></span>
                                <span *ngIf="item.isError"><i class="glyphicon glyphicon-remove"></i></span>
                            </td>
                            <td nowrap>
                                <button type="button" class="btn btn-success btn-xs"
                                    (click)="item.orgId=globalService.getRequest().orgId;item.upload()" [disabled]="item.isReady || item.isUploading || item.isSuccess">
                                    <span class="glyphicon glyphicon-upload"></span> Upload
                                </button>
                                <button type="button" class="btn btn-warning btn-xs"
                                        (click)="item.cancel()" [disabled]="!item.isUploading">
                                    <span class="glyphicon glyphicon-ban-circle"></span> Cancel
                                </button>
                                <button type="button" class="btn btn-danger btn-xs"
                                        (click)="item.remove()">
                                    <span class="glyphicon glyphicon-trash"></span> Remove
                                </button>
                            </td>
                        </tr>
                        </tbody>
                    </table>

                    <div>
                        <div>
                            Queue progress:
                            <div class="progress" style="">
                                <div class="progress-bar" role="progressbar" [ngStyle]="{ 'width': uploader.progress + '%' }"></div>
                            </div>
                        </div>
                        <button type="button" class="btn btn-success btn-s"
                                (click)="uploader.uploadAll()" [disabled]="!uploader.getNotUploadedItems().length">
                            <span class="glyphicon glyphicon-upload"></span> Upload all
                        </button>
                        <button type="button" class="btn btn-warning btn-s"
                                (click)="uploader.cancelAll()" [disabled]="!uploader.isUploading">
                            <span class="glyphicon glyphicon-ban-circle"></span> Cancel all
                        </button>
                        <button type="button" class="btn btn-danger btn-s"
                                (click)="uploader.clearQueue()" [disabled]="!uploader.queue.length">
                            <span class="glyphicon glyphicon-trash"></span> Remove all
                        </button>
                    </div>
                </div>
            </div>
        </div>
	`,
})
export class UploadComponent {
	constructor(private globalService: GlobalSharedService) {
        this.uploader.onCompleteItem = (item: any, response: any, status: any, headers: any) => {
            //console.log(response);
            this.uploadSuccess.emit(JSON.parse(response));
        }
	}
    uploader: FileUploader = new FileUploader({ url: this.globalService.getServerURL() + "fileupload" });

    @Output() uploadSuccess = new EventEmitter<any>();

    onUploadSuccess(){

    } 
    //TODO: Add excel, word file types, enable delete option on each image in curosal, delete file on server on Delete
}