import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, Observable, of, switchMap, throwError } from 'rxjs';
import { UserService } from 'app/core/user/user.service';
import {environment} from "../../../environments/environment";
import {JwtHelperService} from "@auth0/angular-jwt";
import {Router} from "@angular/router";

@Injectable()
export class AuthService
{
    private _authenticated: boolean = false;
    jwtHelper = new JwtHelperService();
    /**
     * Constructor
     */
    constructor(
        private _httpClient: HttpClient,
        private _userService: UserService,
        private _router:Router
    )
    {
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Accessors
    // -----------------------------------------------------------------------------------------------------

    /**
     * Setter & getter for access token
     */
    set accessToken(token: string)
    {
        localStorage.setItem('sirhat-accessToken', token);
    }

    get accessToken(): string
    {
        return localStorage.getItem('sirhat-accessToken') ?? '';
    }

    set refreshToken(token: string)
    {
        localStorage.setItem('sirhat-refreshToken', token);
    }

    get refreshToken(): string
    {
        return localStorage.getItem('sirhat-refreshToken') ?? '';
    }

    get roles(): string[]
    {
        return this.jwtHelper.decodeToken(this.accessToken).roles || null;
    }

    get accessTokenExpiration()
    {
        return this.jwtHelper.decodeToken(this.accessToken).exp || 0;
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Forgot password
     *
     * @param email
     */
    forgotPassword(email: string): Observable<any>
    {
        return this._httpClient.post('api/auth/forgot-password', email);
    }

    /**
     * Reset password
     *
     * @param password
     */
    resetPassword(password: string): Observable<any>
    {
        return this._httpClient.post('api/auth/reset-password', password);
    }

    /**
     * Sign in
     *
     * @param credentials
     */
    signIn(credentials: { email: string; password: string }): Observable<any>
    {
        // Throw error, if the user is already logged in
        if ( this._authenticated )
        {
            return throwError(()=>new Error('User is already logged in.'));
        }

        return this._httpClient.post(environment.apiUrl+'/auth/login', credentials).pipe(
            switchMap((response: any) => {
                // Store the access token in the local storage
                this.accessToken = response.accessToken;
                this.refreshToken = response.refreshToken;

                // Set the authenticated flag to true
                this._authenticated = true;

                // Return a new observable with the response
                return of(response);
            })
        );
    }

    /**
     * Sign in using the access token
     * private String accessToken;
     * private String refreshToken;
     */
    signInUsingRefreshToken(): Observable<boolean>
    {
        console.log('signInUsingRefreshToken')
        // Sign in using the token
        return this._httpClient.post(environment.apiUrl+'/auth/refreshtoken', {
            refreshToken: this.refreshToken
        }).pipe(
            catchError(() =>
                //throwError(()=>new Error("error refresh token"))
                 of(false)
            ),
            switchMap((response: any) => {
                if ( response )
                {
                    this.accessToken = response.accessToken;
                    this.refreshToken = response.refreshToken;
                    // Set the authenticated flag to true
                    this._authenticated = true;

                    // Return true
                    return of(true);
                } else {
                    // Set the authenticated flag to true
                    this._authenticated = false;

                    // Return true
                    return of(false);
                }

            })
        );
    }

    /**
     * Sign out
     */
    signOut(): Observable<any>
    {
        console.log('signOut')
        // Remove the access token from the local storage
        localStorage.removeItem('sirhat-refreshToken');
        localStorage.removeItem('sirhat-accessToken');
        this._router.navigateByUrl('/sign-in');
        // Set the authenticated flag to false
        this._authenticated = false;

        // Return the observable
        return of(true);
    }

    /**
     * Sign up
     *
     * @param user
     */
    signUp(user: { name: string; email: string; password: string; company: string }): Observable<any>
    {
        return this._httpClient.post('api/auth/sign-up', user);
    }

    /**
     * Unlock session
     *
     * @param credentials
     */
    unlockSession(credentials: { email: string; password: string }): Observable<any>
    {
        return this._httpClient.post('api/auth/unlock-session', credentials);
    }

    rolesChecker(authorizedRoles:string[]):boolean{
        if (authorizedRoles == null || authorizedRoles.length == 0) return false;
        let roles = this.roles;
        if (roles == null) this.signOut()

        let result = false;
        authorizedRoles.forEach(ar=>{
            if( roles.includes(ar) ) result = true;
        });
        return result;
    }
    /**
     * Check the authentication status
     */
    check(): Observable<boolean>
    {
        // Check if the user is logged in
        if ( this._authenticated )
        {
            return of(true);
        }

        // Check the access token availability
        if ( !this.accessToken || !this.refreshToken )
        {
            return of(false);
        }

        // Check the access token expire date
        if ( this.isAccessTokenExpired() )
        {
            return this.signInUsingRefreshToken();
        }else {
            return of(true);
        }


    }

    isAccessTokenExpired(){
        return ((new Date().getTime() - (this.accessTokenExpiration * 1000)) > 0);
    }
}
