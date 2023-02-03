import {Unite} from "./unite.type";
import {MotifMouvement} from "./motif-mouvement.type";
import {Position} from "./position.type";
import {Compagnie} from "./compagnie.type";

export interface Affectation
{
    id?: number;
    militaireId?: string;
    unite?:Unite;
    motif?: MotifMouvement;
    motifId?: number;
    dateDebut?: Date;
    dateFin?: Date;
    reference?: string;
    position?: Position;
    positionId?: number;
    compagnie?: Compagnie;
    compagnieId?: number;

}
