import {Punition} from "./punition.type";

export interface AvoirPunition
{
    id?: number;
    taux?: number;
    numaff?: string;
    autsan?: string;
    datePunition?: Date;
    punition?: Punition;
    militaireId?: string;
}
