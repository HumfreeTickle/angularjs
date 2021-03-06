import { Injectable } from '@angular/core';

import { Http , Response } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';


@Injectable()
export class ComicBookService {
    image_server:string = '/server/images_server/';
    result: Array<string>;
    constructor(private http: Http) {}

    getPages(series:string): Observable<Array<string>> {
        const call = this.image_server + series + '/issues.json';
        return this.http.get('/server/images_server/batman/issues.json')
                    .map(result =>  {let body = result.json(); this.result = body; return body || { };})
                    .catch(this.handleError)
    }

    private handleError (error: Response | any) {
        // In a real world app, you might use a remote logging infrastructure
        let errMsg: string;
        if (error instanceof Response) {
            const body = error.json() || '';
            const err = body.error || JSON.stringify(body);
            errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
        } else {
        errMsg = error.message ? error.message : error.toString();
        }
        console.error(errMsg);
        return Observable.throw(errMsg);
    }    
}