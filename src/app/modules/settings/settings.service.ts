import {Injectable} from "@angular/core";
import {HttpClient, HttpEvent, HttpHeaders, HttpRequest} from "@angular/common/http";
import {environment} from "../../../environments/environment";
import {BehaviorSubject, Observable} from "rxjs";
import {tap} from "rxjs/operators";

@Injectable(
    {providedIn:"root"}
)
export class SettingsService
{

    constructor(
        private _httpClient: HttpClient,
    )
    {
    }

    changePassword(data: any)
    {
        return this._httpClient.post(environment.apiUrl+'/user/resetPassword', data);
    }

}
