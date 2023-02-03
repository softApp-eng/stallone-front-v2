import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment} from "../../../environments/environment";
import {Grade} from "../models/grade.type";
import {Unite} from "../models/unite.type";
import {Specialite} from "../models/specialite.type";
import {OrigineGeographique} from "../models/origine-geographique.type";
import {OrigineService} from "../models/origine-service.type";
import {Langue} from "../models/langue.type";
import {Niveau} from "../models/niveau.type";
import {Profession} from "../models/profession.type";
import {Pays} from "../models/pays.type";
import {Lieu} from "../models/lieu.type";
import {MotifMouvement} from "../models/motif-mouvement.type";
import {Compagnie} from "../models/compagnie.type";
import {Position} from "../models/position.type";
import {Section} from "../models/section.type";

@Injectable({providedIn:'root'})
export class GlobalService
{
    /**
     * Constructor
     */
    constructor(
        private _httpClient: HttpClient,
    )
    {
    }

    public getGrades():Observable<Grade[]>{
        return this._httpClient.get<Grade[]>(environment.apiUrl+"/global/grades");
    }

    public getUniteTrans():Observable<Unite[]>{
        return this._httpClient.get<Unite[]>(environment.apiUrl+"/global/unites-trans");
    }

    public getAutorizedUnites():Observable<Unite[]>{
        return this._httpClient.get<Unite[]>(environment.apiUrl+"/global/autorized-unites");
    }

    public getSpecialites():Observable<Specialite[]>{
        return this._httpClient.get<Specialite[]>(environment.apiUrl+"/global/specialites");
    }

    public getOriginesGeogrraphiques():Observable<OrigineGeographique[]>{
        return this._httpClient.get<OrigineGeographique[]>(environment.apiUrl+"/global/origines-geographiques");
    }

    public getOrigineServices():Observable<OrigineService[]>{
        return this._httpClient.get<OrigineService[]>(environment.apiUrl+"/global/origines-services");
    }

    public getLangues():Observable<Langue[]>{
        return this._httpClient.get<Langue[]>(environment.apiUrl+"/global/langues");
    }

    public getNiveaus():Observable<Niveau[]>{
        return this._httpClient.get<Niveau[]>(environment.apiUrl+"/global/niveaus");
    }

    public getProfessions():Observable<Profession[]>{
        return this._httpClient.get<Profession[]>(environment.apiUrl+"/global/professions");
    }

    public getPays():Observable<Pays[]>{
        return this._httpClient.get<Pays[]>(environment.apiUrl+"/global/pays");
    }

    public getLieux():Observable<Lieu[]>{
        return this._httpClient.get<Lieu[]>(environment.apiUrl+"/global/lieux");
    }

    public getMotifMouvements():Observable<MotifMouvement[]>{
        return this._httpClient.get<MotifMouvement[]>(environment.apiUrl+"/global/motifs-mouvement");
    }

    public getUnites():Observable<Unite[]>{
        return this._httpClient.get<Unite[]>(environment.apiUrl+"/global/unites");
    }

    public getUnitesByTypeMouvemenrt(type:string):Observable<Unite[]>{
        return this._httpClient.get<Unite[]>(environment.apiUrl+"/global/unites/type?type="+type);
    }

    public getCompagnies():Observable<Compagnie[]>{
        return this._httpClient.get<Compagnie[]>(environment.apiUrl+"/global/compagnies");
    }

    public getPositions():Observable<Position[]>{
        return this._httpClient.get<Position[]>(environment.apiUrl+"/global/positions");
    }

    public getPositionsByUnite(uniteId):Observable<Position[]>{
        return this._httpClient.get<Position[]>(environment.apiUrl+"/global/positionsByUnite?id="+uniteId);
    }

    public getCompagniesByUnite(id):Observable<Compagnie[]>{
        return this._httpClient.get<Compagnie[]>(environment.apiUrl+"/global/compagniesByUnite?id="+id);
    }

    public getCompagniesByMultipleUnites(ids:any[]):Observable<Compagnie[]>{
        return this._httpClient.get<Compagnie[]>(environment.apiUrl+"/global/compagniesByMultipleUnites?ids="+ids);
    }

    public getPositionsByCompagnie(id):Observable<Position[]>{
        return this._httpClient.get<Position[]>(environment.apiUrl+"/global/positionsByCompagnies?id="+id);
    }

    public getPositionsByMultipleCompagnie(ids:any[]):Observable<Position[]>{
        return this._httpClient.get<Position[]>(environment.apiUrl+"/global/positionsByMultipleCompagnies?ids="+ids);
    }

    public getSectionByPosition(id):Observable<Section[]>{
        return this._httpClient.get<Section[]>(environment.apiUrl+"/global/sectionsByPositions?id="+id);
    }

    public getLrc(){
        return this._httpClient.get(environment.apiUrl+"/global/lrc");
    }

}
