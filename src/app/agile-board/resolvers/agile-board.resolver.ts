import {Injectable} from '@angular/core';
import {
    Resolve,
    ActivatedRouteSnapshot
} from '@angular/router';
import {Observable} from 'rxjs';
import {ArtifactsService} from '../../shared/services';

@Injectable()
export class AgileBoardResolver implements Resolve<Observable<any>> {
    
    constructor(
        private artifactsService: ArtifactsService
    ) {}
    
    resolve(route: ActivatedRouteSnapshot) {
        return this.artifactsService.requirementtypes(route.params.applicationId);
    }
}