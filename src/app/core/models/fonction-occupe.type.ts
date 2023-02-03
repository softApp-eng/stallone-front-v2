import {Fonction} from "./fonction.type";

export interface FonctionOccupe
{
    id?: number;
    reference?: string;
    dateFonction?: Date;
    dateFinFonction?: Date;
    fonction?: Fonction;
    militaireId?: string;

}
