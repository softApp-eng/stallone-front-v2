import {Profession} from "./profession.type";
import {Pays} from "./pays.type";

export interface Conjoint
{
    id?: number;
    nautorisation?: string;
    nom?: string;
    prenom?: string;
    natureMariage?: string;
    dateMariage?: Date;
    militaireId?: string;
    professionId?: number;
    paysId?: number;
    profession?: Profession;
    pays?: Pays;

}
