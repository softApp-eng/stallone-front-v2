import {Unite} from "./unite.type";
import {MotifMouvement} from "./motif-mouvement.type";

export interface Mutation
{
    id?: number;
    militaireId?: string;
    nouvelleUnite?:Unite;
    nouvelleUniteId?: string;
    ancienneUnite?:Unite;
    ancienneUniteId?: string;
    motif?: MotifMouvement;
    motifId?: number;
    dateDebut?: Date;
    dateFin?: Date;
    reference?: string;
    type?: 'T'|'D';

}
