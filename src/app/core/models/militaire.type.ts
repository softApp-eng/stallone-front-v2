import {Grade} from "./grade.type";
import {Unite} from "./unite.type";
import {Langue} from "./langue.type";
import {OrigineGeographique} from "./origine-geographique.type";
import {Niveau} from "./niveau.type";
import {OrigineService} from "./origine-service.type";
import {Specialite} from "./specialite.type";
import {Position} from "./position.type";
import {Section} from "./section.type";
import {Compagnie} from "./compagnie.type";

export interface Militaire
{
    id?: string;
    matricule?: string;
    cin?: string;
    nom?: string;
    prenom?: string;
    sexe?: string;
    dateEngagement?: Date;
    echelle?: string;
    dateEchelle?: Date;
    situationFamiliale?: string;
    dateReng?: Date;
    datecin?: Date;
    dateNaissance?: Date;
    adresse?: string;
    nar?: string;
    som?: number;
    assurance?: string;
    pere?: string;
    mere?: string;
    tuteur?: string;
    npass?: number;
    datePassport?: Date;
    adresseTuteur?: string;
    aptPhy?: string;
    tribut?: string;
    fraction?: string;
    gsm?: string;
    fixe?: string;
    groupeSanguin?: string;
    enService?: boolean;
    langues?: Langue[];
    origineGeographique?: OrigineGeographique;
    niveau?: Niveau;
    origineSvc?: OrigineService;
    specialite?: Specialite;
    grade?: Grade;
    unite?: Unite;
    position?: Position;
    section?: Section;
    compagnie?: Compagnie;
    hasPhoto?: boolean;

}
