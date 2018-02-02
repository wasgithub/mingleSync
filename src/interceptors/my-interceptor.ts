
import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class MyInterceptor implements HttpInterceptor {
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        console.log("Estou no interceptor");
        console.log(req);
        const authReq = req.clone({
            headers: req.headers.set('Accept-Language', 'Felipe')
        });
        return next.handle(authReq);
    }
}