import {Component} from '@angular/core';
import {Router} from '@angular/router';
import {HttpClient} from '@angular/common/http';

import {GlobalSharedService} from './services';
import {Employee} from './models';
import {employeeById} from './endpoints';

@Component({
  selector: 'app-root',
  template: `
    <router-outlet></router-outlet>
  `
})
export class AppComponent {
  constructor(
    private router: Router,
    private globalService: GlobalSharedService,
    private http: HttpClient
  ) {
    if (!this.globalService.employee) {
      this.router.navigateByUrl('/login');
    } else {
      // this.router.navigate(['/home', this.globalService.employee.id]);
      const subscription = this.http.get<Employee>(`${employeeById.replace(':employeeId', this.globalService.employee.id.toString())}`)
      .subscribe(employee => {
        this.globalService.employee = employee;
        subscription.unsubscribe();
      });
    }
  }
}
