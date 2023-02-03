import { Component } from '@angular/core';
import {FuseConfigService} from "../@fuse/services/config";

@Component({
    selector   : 'app-root',
    templateUrl: './app.component.html',
    styleUrls  : ['./app.component.scss']
})
export class AppComponent
{
    /**
     * Constructor
     */
    constructor(private _fuseConfigService: FuseConfigService)
    {
        let scheme = localStorage.getItem('mode');
        if (localStorage.getItem('mode'))
            this._fuseConfigService.config = {scheme};
    }
}
