export class DataGridColumn {
    key: string;
    displayText: string;
    filterCtrlType: string;
    width: number;
    showLink: boolean;

    constructor(key: string, displayText: string, filterCtrlType: string, width: number, showLink?: boolean) {
        this.key = key;
        this.displayText = displayText;
        this.filterCtrlType = filterCtrlType;
        this.width = width;
        this.showLink = showLink;
    }
}