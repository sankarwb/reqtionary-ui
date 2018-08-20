import { Component, OnInit } from '@angular/core';
import { Router } from '../../../node_modules/@angular/router';

@Component({
  selector: 'app-reqtionary',
  template: `
    <div style="display: flex; flex-direction: column;">
      <app-header></app-header>
      <router-outlet></router-outlet>
    </div>
  `
})
export class ReqtionaryComponent implements OnInit {
  constructor(private router: Router) {}

  ngOnInit() {
    this.router.navigateByUrl('/app/home');
  }
}
