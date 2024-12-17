import { LawyerDetail } from "./lawyer-list.interface";

export interface LawyerFilterResponse {
    lawyers: Lawyer[];
}

export interface Lawyer {
    idAbogado:     number;
    destacado:     number;
    favorito:      null;
    nombres:       string;
    apellidos:     string;
    specialty_id:  string;
    specialty:     string;
    servicios:     any[];
    avatar:        Avatar;
    rating:        number;
    cantOpiniones: number;
    lastReview:    LastReview;
    dates?: {         // Nueva propiedad
        hora_dia_inicio: string;
        hora_dia_fin: string;
    }[];
    toLawyerDetail? : () => LawyerDetail; 
}



export enum Avatar {
    UploadsPostulantes0000002PostulantePNG = "uploads/postulantes/0000002/postulante.png",
}

export enum LastReview {
    SinReseñas = "Sin reseñas",
}
