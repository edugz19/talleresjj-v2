import { HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { AuthService } from "../services/auth/auth.service";
import { Observable } from "rxjs";

@Injectable()
export class AdminInterceptor {

    constructor(private authSvc: AuthService) {}

    // intercept(req: HttpRequest<any>, next: HttpHandler): Observable<any> {
        
    //     if (req.url.includes('users')) {
    //         const authToken = this.authSvc.userTokenValue;
    //         const authReq = req.clone({
    //             setHeaders: {
    //                 auth: authToken,
    //             }
    //         });

    //         return next.handle(authReq);
    //     }

    //     return next.handle(req);
    // }
}