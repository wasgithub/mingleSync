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

    get(){
        let request = {
          url: '/CRMMCONTACTS/95779'
            // url: 'customer-api/api/v1/customers'
        };
         
        let params = {
          page: 1,
          pageSize: 10
        };
         
        this.mingle.gateway
          .get(new RequestOptions(request), params)
        //   .map(response => <Customer>response)
          .subscribe(
            (customers) => {
                console.dir(customers);
            }
          );
        
      }

    getUrlMigle(){
        try {
            console.log(this.mingle.gateway.getUrlApi());   
        } catch(err) {
            console.log('Erro do xitao: ', err);
        }
    }

    request() {
        let request = {
            url: 'ping'
        };
        
        this.mingle.gateway
            .get(new RequestOptions(request))
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

