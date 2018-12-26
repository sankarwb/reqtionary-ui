import {Comment} from './comment.model';

export class Conversation {
    comment: string;
    by: number;
    time: string;
    comments: Comment[];

    constructor(by: number, comment: string, time: string, comments?: Comment[]) {
        this.by = by;
        this.comment = comment;
        this.time = time;
        this.comments = comments;
    }
}