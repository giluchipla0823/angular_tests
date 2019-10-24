import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { LoaderService } from './loader.service';

@Injectable()
export class BaseService {
    protected BASE_URL: string = 'http://127.0.0.1:8000/api/';

    constructor(
        protected http: HttpClient,
        private loaderService: LoaderService
    ) {}

    public setActiveLoaderService(active: boolean) {
        this.loaderService.setActive(active);

        return this;
    }
}