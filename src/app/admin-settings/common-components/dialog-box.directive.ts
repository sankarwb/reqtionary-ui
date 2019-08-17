import { Directive, ViewContainerRef } from '@angular/core';

@Directive({
	selector: '[dialog-box]'
})

export class DialogBoxDirective {
	
	constructor(public viewContainerRef: ViewContainerRef) { }
}