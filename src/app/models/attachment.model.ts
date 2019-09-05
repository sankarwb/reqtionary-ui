export class Attachment {
    date: string;
    size: number;
    name: string;
    status: UploadStatus;

    constructor(name: string, size: number, date: string, status: UploadStatus) {
        this.name = name;
        this.size = size;
        this.date = date;
        this.status = status;
    }
}

export enum UploadStatus {
    UPLOADING = 'progress',
    SUCCESS = 'success',
    ERROR = 'error'
}
