import {Injectable} from '@angular/core';
import {
    Resolve,
    ActivatedRouteSnapshot
} from '@angular/router';
import {Observable} from 'rxjs';
import {HomeService} from '../services/home.service';
import {GlobalSharedService} from '../../services';

@Injectable()
export class HomeResolver implements Resolve<Observable<any>> {
    
    constructor(
        private globalSharedService: GlobalSharedService,
        private homeService: HomeService
    ) {}
    
    resolve(route: ActivatedRouteSnapshot) {
        return this.homeService.getApplicationsByEmployee(this.globalSharedService.employee.id);
    }
}