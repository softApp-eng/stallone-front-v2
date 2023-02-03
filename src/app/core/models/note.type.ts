import {Noteur} from "./noteur.type";

export interface Note
{
    id?: number;
    dateDebut?: Date;
    dateFin?: Date;
    note?: number;
    appreciation?: string;
    militaireId?: string;
    noteurId?: string;
    noteur?: Noteur;

}
