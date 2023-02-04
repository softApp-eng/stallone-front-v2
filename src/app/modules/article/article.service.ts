import {Injectable} from "@angular/core";
import {HttpClient, HttpParams} from "@angular/common/http";
import {environment} from "../../../environments/environment";

@Injectable({
    providedIn: 'root'
})
export class ArticleService
{

    /**
     * Constructor
     */
    constructor(
        private _httpClient: HttpClient,
    ){}

    getArticleByCode(code:string){
        return this._httpClient.get(environment.apiUrl+"/article/code",
            { params:
                    new HttpParams()
                        .set('code', code)
            });
    }

    addArticleQuantite(articleId:number,quantite:number){
        return this._httpClient.post(environment.apiUrl+"/article/quantite/add",
            {
                articleId:articleId,
                quentite:quantite
            });
    }

    getStock(){
        return this._httpClient.get(environment.apiUrl+"/article/stock");
    }
}
