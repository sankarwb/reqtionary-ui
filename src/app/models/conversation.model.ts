export class Conversation {
    comment: string;
    by: number;
    time: string;
    comments: Conversation[];

    constructor(by: number, comment: string, time: string, comments: Conversation[]=[]) {
        this.by = by;
        this.comment = comment;
        this.time = time;
        this.comments = comments;
    }
}