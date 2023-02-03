import { Injectable } from '@angular/core';
import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { catchError, Observable, switchMap, throwError} from 'rxjs';
import { AuthService } from 'app/core/auth/auth.service';
import {environment} from "../../../environments/environment";

@Injectable()
export class AuthInterceptor implements HttpInterceptor
{
    private isRefreshing = false;

    constructor(private _authService: AuthService) { }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<Object>> {
        let authReq = req;
        const accesstoken = this._authService.accessToken;
        if (accesstoken != null) {
            authReq = this.addTokenHeader(req, accesstoken);
        }

        return next.handle(authReq).pipe(
            catchError(error => {
                if (error instanceof HttpErrorResponse && !authReq.url.includes('auth/login') && (error.status == 403 || error.status == 401 )) {
                    return this.handle403Error(authReq, next);
                }
                return throwError(error);
            })
        );
    }

    private handle403Error(request: HttpRequest<any>, next: HttpHandler) {
        if (!this.isRefreshing) {
            this.isRefreshing = true;

            const refreshtoken = this._authService.refreshToken;
            if (refreshtoken)
                return this._authService.signInUsingRefreshToken().pipe(
                    switchMap((status: any) => {
                        this.isRefreshing = false;
                        return next.handle(this.addTokenHeader(request, this._authService.accessToken));
                    }),
                    catchError((err) => {
                        if (err instanceof HttpErrorResponse && (err.status == 403 || err.status == 401 )) {
                            this.isRefreshing = false;
                            this._authService.signOut();
                        }
                        //this.isRefreshing = false;
                        //this._authService.signOut();
                        return throwError(err);
                    })
                );
        }
    }

    private addTokenHeader(request: HttpRequest<any>, token: string) {
        return (request.url.startsWith(environment.apiUrl) && !request.url.includes('auth'))?
            request.clone({headers: request.headers.set('Authorization', 'aitkhmim ' + token)})
            :request;
    }
}
