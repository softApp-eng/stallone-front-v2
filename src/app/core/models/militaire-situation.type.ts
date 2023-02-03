import {SituationParticuliere} from "./situation-particuliere.type";
import {Lieu} from "./lieu.type";
import {MotifSituation} from "./motif-situation.type";

export interface MilitaireSituation
{
    id?: number;
    dateDebut?: Date;
    dateFin?: Date;
    reference?: string;
    observation?: string;
    militaireId?: string;
    situationParticulieriId?: number;
    lieuId?: number;
    motifSituationId?: number;
    situationParticuliere?: SituationParticuliere;
    lieu?: Lieu;
    motifSituation?: MotifSituation;
}
