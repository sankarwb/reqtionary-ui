import { Component, OnInit, OnDestroy } from "@angular/core";
import { GlobalSharedService } from "../../services";
import { ActivatedRoute } from "@angular/router";

@Component({
    selector: 'artifacts',
    templateUrl: 'artifacts.component.html'
})
export class ArtifactsComponent implements OnInit, OnDestroy {
    constructor(
        private activatedRoute: ActivatedRoute,
        private globalService: GlobalSharedService
    ) {}

    ngOnInit() {

    }

    ngOnDestroy() {

    }
}