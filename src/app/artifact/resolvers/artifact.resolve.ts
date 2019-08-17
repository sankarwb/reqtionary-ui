import {Injectable} from '@angular/core';
import {Resolve, ActivatedRouteSnapshot} from '@angular/router';
import {Observable, forkJoin} from 'rxjs';
import {ArtifactsService} from '../../shared/services';
import {Artifact} from '../../models';

@Injectable()
export class ArtifactResolve implements Resolve<Observable<any>> {
    
    constructor(
        private artifactService: ArtifactsService
    ) {}
    
    resolve(route: ActivatedRouteSnapshot) {
        return new Observable(observer => {
            let result = {};
            if (route.params.artifactId) {
                forkJoin(
                    this.artifactService.attributes(route.params.applicationId, route.params.requirementTypeId),
                    this.artifactService.artifactById(route.params.artifactId),
                    this.artifactService.artifacts(route.params.applicationId, route.params.projectId, route.params.requirementTypeId)
                ).subscribe(result => {
                    observer.next({
                        attributes: result[0],
                        artifact: result[1],
                        parentArtifacts: result[2]
                    });
                }, err => observer.error(err), () => observer.complete());
            } else {
                forkJoin(
                    this.artifactService.attributes(route.params.applicationId, route.params.requirementTypeId),
                    this.artifactService.artifacts(route.params.applicationId, route.params.projectId, route.params.requirementTypeId)
                ).subscribe(result => {
                    observer.next({
                        attributes: result[0],
                        artifact: new Artifact(),
                        parentArtifacts: result[1]
                    });
                }, err => observer.error(err), () => observer.complete());
            }
        });
    }
}