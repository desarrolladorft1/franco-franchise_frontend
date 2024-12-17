
export interface LawyerScheduleResponse {
    ok:   boolean;
    data: LawyerSchedule[];
}

export interface LawyerSchedule {
    date:  Date;
    hours: HourElement[];
}

export interface HourElement {
    horaCitaId: number | null;
    hour      : HourEnum;
    scheduled : number | null;
    available : number | null;
}

export interface AppointmentDay {
    date: Date;
    hour: HourElement;
}


export enum HourEnum {
    Empty = "-",
    The0600 = "06:00",
    The0700 = "07:00",
    The0800 = "08:00",
    The0900 = "09:00",
    The1000 = "10:00",
    The1100 = "11:00",
    The1200 = "12:00",
    The1300 = "13:00",
    The1400 = "14:00",
    The1500 = "15:00",
    The1600 = "16:00",
    The1700 = "17:00",
    The1800 = "18:00",
    The1900 = "19:00",
    The2000 = "20:00",
    The2100 = "21:00",
    The2200 = "22:00",
    The2300 = "23:00",
    The0000 = "00:00",
    The0100 = "01:00",
    The0200 = "02:00",
    The0300 = "03:00",
    The0400 = "04:00",
    The0500 = "05:00",
}
