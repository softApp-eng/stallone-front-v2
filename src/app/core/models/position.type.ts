import {Unite} from "./unite.type";
import {Compagnie} from "./compagnie.type";

export interface Position
{
    id?: number;
    libelle?: string;
    unite?: Unite;
    compagnie?: Compagnie;

}
