import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {User} from "../../core/user/user.types";
import {environment} from "../../../environments/environment";

@Injectable({
    providedIn: 'root'
})
export class UsersService
{

    /**
     * Constructor
     */
    constructor(
        private _httpClient: HttpClient,
    ){}

    public getById(id){
        return this._httpClient.get(environment.apiUrl+"/admin/user/get/"+id);
    }

    public getAll():Observable<User[]>{
        return this._httpClient.get<User[]>(environment.apiUrl+"/admin/user/all");
    }

    public getUnites(){
        return this._httpClient.get(environment.apiUrl+"/admin/unites-privileges");
    }

    public getRoles(){
        return this._httpClient.get(environment.apiUrl+"/admin/roles");
    }

    public save(user,isEdit:boolean){
        if (isEdit)
            return this._httpClient.post(environment.apiUrl+"/admin/user/edit",user);
        else
            return this._httpClient.post(environment.apiUrl+"/admin/user/add",user);
    }

    public delete(id){
        return this._httpClient.delete(environment.apiUrl+"/admin/user/delete/"+id);
    }

    public editMdp(password:string,userid:string){
        return this._httpClient.post(environment.apiUrl+"/admin/user/mdp/"+userid,password);
    }

}
