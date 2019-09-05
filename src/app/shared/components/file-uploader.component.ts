import {Component, OnInit, Output, EventEmitter} from '@angular/core';
import {FileUploader, FileItem} from 'ng2-file-upload';

@Component({
    selector: 'file-uploader',
    templateUrl: 'file-uploader.component.html',
    styleUrls: ['file-uploader.component.css']
})
export class FileUploaderComponent implements OnInit {
    
    uploader: FileUploader = new FileUploader({url: 'http://localhost:3000/fileupload'});
    @Output() response = new EventEmitter<FileItem[]>();

    constructor() {}

    ngOnInit() {
        let count = 0;
        this.uploader.response.subscribe((res: any) => {
            ++count;
            if (count === this.uploader.queue.length) {
                this.response.emit(this.uploader.queue);
            }
        });
    }

    fileOver(e) {
        
    }

    upload() {
        this.uploader.uploadAll();
    }
}