import { Injectable } from '@angular/core';
import {ActivatedRoute, ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot} from '@angular/router';
import {Observable, of} from 'rxjs';
import {AuthService} from "../../../core/auth/auth.service";

@Injectable({
    providedIn: 'root'
})
export class HomeResolvers implements Resolve<any>
{
    /**
     * Constructor
     */
    constructor(private _activeRoute:ActivatedRoute,private _authService:AuthService,private _router: Router)
    {
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Resolve
     *
     * @param route
     * @param state
     */
    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any>
    {
        //bricol
        if(this._authService.rolesChecker(['ADMINPAS']))
            this._router.navigateByUrl('/etats/passeport');
        return of(true);
    }
}
