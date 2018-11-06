import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { GlobalSharedService } from './services';

@Component({
  selector: 'app-root',
  template: `
    <router-outlet></router-outlet>
  `
})
export class AppComponent {
  constructor(
    private router: Router,
    private globalService: GlobalSharedService
  ) {
    if (!this.globalService.employee) {
      this.router.navigateByUrl('/login');
    } /* else {
      this.router.navigate(['/home', this.globalService.employee.id]);
    } */
  }
}
