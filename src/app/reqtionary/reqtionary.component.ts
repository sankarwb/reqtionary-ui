import { Component } from '@angular/core';

@Component({
  selector: 'app-reqtionary',
  template: `
    <div style="display: flex; flex-direction: column;">
      <app-header></app-header>
      <router-outlet></router-outlet>
    </div>
  `
})
export class ReqtionaryComponent {}
