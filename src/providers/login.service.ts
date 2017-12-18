import { Injectable } from '@angular/core';
import { MingleService } from '@totvs/mobile-mingle';
import { AuthResponse } from "@totvs/mobile-mingle/dist/models/authentication-data.model";
import { Observable } from "rxjs/Observable";

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

    
}

