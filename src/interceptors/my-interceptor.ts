
import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class MyInterceptor implements HttpInterceptor {
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        console.log("Estou no interceptor");
        console.log('URL: ', req.url);
        if(req.url.indexOf('http') == -1) {
            const newReq = req.clone({
                url: 'http://www.google.com/' + req.url
            });
            return next.handle(newReq);
        } else {
            return next.handle(req);
        }
        
    }
}