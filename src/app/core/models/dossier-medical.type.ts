import {NatureDossierMedical} from "./Nature-dossier-medicaltype";

export interface DossierMedical
{
    id?: number;
    taux?: number;
    numero?: string;
    reference?: string;
    dateMed?: Date;
    natureDossierMedicalId?: number;
    natureDossierMedical?: NatureDossierMedical;
    militaireId?: string;

}
