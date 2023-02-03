import {Injectable} from "@angular/core";
import {HttpClient, HttpParams} from "@angular/common/http";
import {environment} from "../../../../environments/environment";
import {Observable} from "rxjs";
import {Data} from "../../../core/models/data.type";

@Injectable({
    providedIn: 'root'
})
export class HomeService
{

    /**
     * Constructor
     */
    constructor(
        private _httpClient: HttpClient,
    ){}

    public getCountMilitaireByCateg(unite:string):Observable<Data[]>{
        return this._httpClient.get<Data[]>(environment.apiUrl+"/statistique/count/militaire-by-categ?unite="+unite);
    }

    public getCountMilitaireBySexe(unite:string):Observable<Data[]>{
        return this._httpClient.get<Data[]>(environment.apiUrl+"/statistique/count/militaire-by-sexe?unite="+unite);
    }

    public getCountSexe(unite:string):Observable<Data[]>{
        return this._httpClient.get<Data[]>(environment.apiUrl+"/statistique/count/sexe?unite="+unite);
    }

    public getCountUnites():Observable<Data[]>{
        return this._httpClient.get<Data[]>(environment.apiUrl+"/statistique/count/unites");
    }

    public getCountEngagementPerYears():Observable<Data[]>{
        return this._httpClient.get<Data[]>(environment.apiUrl+"/statistique/count/engagement-per-years");
    }

    public getCountGrade():Observable<Data[]>{
        return this._httpClient.get<Data[]>(environment.apiUrl+"/statistique/count/grades");
    }

    public getStatistiqueMutationsPerYears(unite:String):Observable<any>{
        return this._httpClient.get<any>(environment.apiUrl+"/statistique/count/stat-mutation?unite="+unite);
    }

    public getBilanPersonnelsRealise(unites){
        return this._httpClient.post(environment.apiUrl+"/statistique/bilan/realise",unites);
    }

    public getBilanPersonnelsDisponible(unites){
        return this._httpClient.post(environment.apiUrl+"/statistique/bilan/disponible",unites);
    }
 public getCompagnieByCategorie(unites):Observable<any>{
        return this._httpClient.post(environment.apiUrl+"/statistique/compagnie/categorie",unites);
    }
    public getMoyaneAge(unites){
        return this._httpClient.post(environment.apiUrl+"/statistique/bilan/moyenne-age",unites);
    }


}
