import {Activite} from "./activite.type";

export interface UniteActiviteType {
    dateDebut:Date;
    dateFin:Date;
    unite:string;
    activites:Activite[];
}
