import {Position} from "./position.type";
import {Lieu} from "./lieu.type";

export interface Detachement
{
    id?: number;
    militaireId?: string;
    dateDebut?: Date;
    dateFin?: Date;
    referenceDebut?: string;
    referenceFin?: string;
    type?: string;
    position?: Position;
    positionId?: number;
    lieu?: Lieu;
    lieuId?: number;

}
