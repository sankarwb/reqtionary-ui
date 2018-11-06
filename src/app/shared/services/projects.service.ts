import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

import {projectsByApplication} from '../../endpoints';
import {Release} from '../../models/release.model';

@Injectable()
export class ProjectsService {

    constructor(private http: HttpClient) {}

    getProjectsByApplication(applicationId: number): Observable<Release[]> {
        return this.http.get<Release[]>(`${projectsByApplication.replace(':applicationId', applicationId.toString())}`);
    }

}
