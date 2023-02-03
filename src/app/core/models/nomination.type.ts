import {Grade} from "./grade.type";
import {Titre} from "./titre.type";

export interface Nomination
{
    id?: number;
    dateGrade?: Date;
    reference?: string;
    militaireId?: string;
    titreId?: number;
    gradeId?: string;
    grade?: Grade;
    titre?: Titre;

}
