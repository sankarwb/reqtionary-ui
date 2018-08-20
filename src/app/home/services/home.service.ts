import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { GlobalSharedService } from '../../shared/services';

@Injectable()
export class HomeService {

    constructor(
        private http: HttpClient,
        private globalService: GlobalSharedService
    ) {}
}
