import {Component, OnInit} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {FileUploader} from 'ng2-file-upload';

@Component({
    selector: 'file-uploader',
    templateUrl: 'file-uploader.component.html',
    styleUrls: ['file-uploader.component.css']
})
export class FileUploaderComponent implements OnInit {
    
    uploader: FileUploader = new FileUploader({url: 'http://localhost:3000/fileupload'});
    constructor(private http: HttpClient) {}

    ngOnInit() {
        
    }

    fileOver(e) {
        
    }

    upload() {
        this.uploader.uploadAll();
    }
}