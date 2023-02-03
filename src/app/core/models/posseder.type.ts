import {Specialite} from "./specialite.type";
import {Diplome} from "./diplome.type";
import {Ecole} from "./ecole.type";
import {Lieu} from "./lieu.type";

export interface Posseder
{
    id?: number;
    militaireId?: string;
    specialite?: Specialite;
    specialiteId?: number;
    diplome?: Diplome;
    diplomeId?: number;
    ecole?: Ecole;
    ecoleId?: number;
    lieu?: Lieu;
    lieuId?: number;
    dateobt?: Date;
    clssmt?: number;
    note?: number;
}
