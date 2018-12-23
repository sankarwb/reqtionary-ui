import {Injectable} from '@angular/core';
import {
    Resolve,
    ActivatedRouteSnapshot
} from '@angular/router';
import {Observable} from 'rxjs';
import {ArtifactsService} from '../../shared/services';

@Injectable()
export class ArtifactResolve implements Resolve<Observable<any>> {
    
    constructor(
        private artifactService: ArtifactsService
    ) {}
    
    resolve(route: ActivatedRouteSnapshot) {
        return this.artifactService.artifactById(route.params.artifactId);
    }
}