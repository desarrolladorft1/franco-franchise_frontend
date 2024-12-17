export interface AppointmentResponse {
    ok:   boolean;
    data: Appointment[];
}

export interface Appointment {
    idCita:                          number;
    idAbogado:                       number;
    estado:                          string;
    abreviacion_estado:              AppointmentState;
    dim_horas_id:                    number;
    hora:                            string;
    dim_rangos_horarios_detalles_id?: number;
    fechaCita:                       Date;
    nombres:                         string;
    apellidos:                       string;
    servicioNombre:                  string;
    servicioDescripcion:             null;
    servicioPrecioBruto:             number;
    servicioPrecioNeto:              number;
    servicioPrecioIva:               number;
    avatar:                          string;
    specialty:                       string;
    reScheduledCounter:              number;
    calificado:                      boolean;
}

export interface JsonAgenda {
    startDate:        string | Date;
    endDate:          string | Date;
    schedule?:         JsonHorario[];
    lawyerId?:         number;
}

export interface JsonHorario {
    date:             Date | string;
    hours:            string[];
    
}

export enum AppointmentState {
	PAYMENT_PENDING = "PPP",
	PAYMENT_REJECTED= "PR",
	BOOKED = "A",
	CLOSED ="F",
	RE_BOOKED= "RA",
	SUSPENDED= "S",
	REFUNDED= "R"
}

export interface ReBookedAppointment {
    citaId: number; 
    newHoraCitaId : number;
    message: boolean;
}

export interface NewAppointment {
    horarioCitaId   : number | null;
    lawyerId        : number;
    costumerId      : number;
    serviceLawyerId : number;
}

export interface ContactInformation {
    idCita?         : number;
    customerId?     : number;
    nombres         : string;
    apellidos       : string;
    motivo          : string;
    correo          : string;
    telefono        : string;
}

export interface ScheduleCalendarResponse {
    ok:   boolean;
    data: ScheduleCalendar[];
}

export interface ScheduleCalendar {
    fechaCita:         Date;
    fecha?:            string;
    citaId:            number;
    horarioCitaId?:    number;
    estadoCitaAbrev?:  string;
    estadoCitaNombre?: string;
    costumerId?:       number;
    horaCita:          string;
    agendada?:         number;
    disponible:        number;
    nombres?:          string;
    apellidos?:        string;
    correo?:           string;
    telefono?:         string;
}

export interface BackendResponse {
    ok:   boolean;
    data: BdResponse;
}

export interface BdResponse {
    fieldCount:    number;
    affectedRows:  number;
    insertId:      number;
    info:          string;
    serverStatus:  number;
    warningStatus: number;
    changedRows:   number;
}
