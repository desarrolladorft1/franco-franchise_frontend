export interface LawyerListResponse {
    ok:   boolean;
    data: LawyerDetail[];
}

export interface LawyerDetail {
    idAbogado:        number;
    destacado:        boolean;
    favorito:         number;
    licencia?:        string;
    cedula?:          string;
    nombres:          string;
    apellidos:        string;
    specialty:        string;
    avatar:           string;
    rating:           string;
    cantOpiniones:    number;
    lastReview:       string;
    precios:          string;
    precios_number:   number;
    descripcion:      string;
    formacion:        string;
    experiencias:      string;
}

export interface ServicePrice {
    name:             string;
    price:            number;
    serviceId:        number;
}