import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Observable } from "rxjs";
import 'rxjs/add/operator/do';

@Injectable()

export class AuthInterceptor implements HttpInterceptor {

    constructor(private router: Router) { }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const token: string = localStorage.getItem('token');

        if (req.headers.get('No-Auth') == "True")
            return next.handle(req.clone());

        if (token != null) {
            const clonedreq = req.clone({
                headers: req.headers.set("Authorization", "Bearer " + token)
            });
            return next.handle(clonedreq)
                .do(
                    succ => { },
                    error => {
                        if (error.status === 401)
                            console.log('El token ha caducado');
                    });
        }
        else {
            this.router.navigateByUrl('/iniciarSesion');
        }
    }
}
