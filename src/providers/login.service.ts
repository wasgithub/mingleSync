import { Injectable } from '@angular/core';
import { MingleService } from '@totvs/mobile-mingle';
import { AuthResponse } from "@totvs/mobile-mingle/dist/models/authentication-data.model";
import { Observable } from "rxjs/Observable";
import { RequestOptions } from '@angular/http';

@Injectable()
export class LoginService {

    constructor(private mingle: MingleService) {

    }

    signIn(user: string, password: string, alias: string, preventEmmit?: boolean): Observable<AuthResponse> {
        return this.mingle.auth.protheus(user, password, alias, preventEmmit);

    }

    signOut(): Observable<null> {
        return this.mingle.auth.logout();
    }

    get() {
        let request = {
            url: '/CRMMCONTACTS/95779'
            // url: 'customer-api/api/v1/customers'
        };

        let params = {
            page: 1,
            pageSize: 10
        };

        this.mingle.gateway
            .get('/CRMMCONTACTS/95779', {}, params)
            .subscribe(
                (res) => {
                    console.dir(res);
                }
            );

    }

    request() {
        let request = {
            url: 'ping'
        };

        this.mingle.gateway
            .get('ping', {})
            .map((res) => {
                console.log('Res: ', res);
                return res;
            })
            .subscribe(
                (res) => {
                    console.log('RES: ', res);
                });
    }

}

