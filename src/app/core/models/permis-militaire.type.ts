import {Permis} from "./permis.type";

export interface PermisMilitaire
{
    id?: number;
    numero?: string;
    datePermis?: Date;
    confiance?: boolean;
    militaireId?: string;
    permisId?: string;
    permis?: Permis;

}
