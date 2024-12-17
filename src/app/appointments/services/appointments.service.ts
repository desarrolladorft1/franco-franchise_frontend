import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';



import { LawyerListResponse } from '../interfaces/lawyer-list.interface';
import { AppointmentDay, LawyerScheduleResponse } from '../interfaces/schedule-component.interface';
import { environment } from '../../../enviroments/environment';
import { NewAppointment } from '../interfaces/appointment.interface';
import { ContactInformation } from '../interfaces/appointment.interface';
import { Appointment } from '../interfaces/appointment.interface';
import { BackendResponse } from '../interfaces/appointment.interface';
import { ScheduleCalendarResponse } from '../interfaces/appointment.interface';
import { JsonAgenda } from '../interfaces/appointment.interface';

export interface AppointmentResponse {
  ok:   boolean;
  data: Appointment[];
}

@Injectable({
  providedIn: 'root'
})
export class AppointmentsService {

  private baseUrl: string = environment.apiUrl;

  constructor(private http: HttpClient) { }

  getLawyerSpecialties(pattern: string): Observable<any> {
    return this.http.post<any>( `${this.baseUrl}/api/lawyers/specialties`, { "pattern": pattern } )
  }

  setLawyer( data: any ): Observable<any> {
    const formData: FormData = new FormData();
    console.log(data.idUsuario);
    
    formData.append("idUsuario", data.idUsuario);
    formData.append("nombres", data.nombres);
    formData.append("apellidos", data.apellidos);
    formData.append("identificacion", data.identificacion);
    formData.append("cedula", data.cedula);
    formData.append("usuario", data.usuario);
    formData.append("fechanacimiento", data.fechanacimiento);
    formData.append("telefono", data.telefono);
    formData.append("correo", data.correo);
    formData.append("estado", data.estado);
    formData.append("ciudad", data.ciudad);
    formData.append("direccion", data.direccion);
    formData.append("codigopostal", data.codigopostal);
    formData.append("descripcion", data.descripcion);
    formData.append("formacion", data.formacion);
    formData.append("especialidad", data.especialidad);
    formData.append("experiencia", data.experiencia);
    formData.append("precio", data.precio);
    formData.append("imagen", data.imagen);
    formData.append("curriculum", data.curriculum);
    
    return this.http.post( `${this.baseUrl}/api/lawyers/create`, formData )
  }  

  getLawyersByFilter(lawyerNameLastName: string, specialtyList: number[] | null, orderPrice: number | null, orderRating: number | null, userId: number | null): Observable<LawyerListResponse>  {
    return this.http.post<LawyerListResponse>( `${this.baseUrl}/api/lawyers/getLawyersByFilter`, {"lawyerNameLastName": lawyerNameLastName, "specialtyList": specialtyList, "orderPrice": orderPrice, "orderRating": orderRating, "userId": userId } )
  }

  getLawyerScheduleById(days: number, id: number): Observable<LawyerScheduleResponse>{
    return this.http.post<LawyerScheduleResponse>( `${this.baseUrl}/api/lawyers/lawyerScheduleById/`, { "days": days, "id": id } )
  }

  setSelectedHour( name: string, appointmentDay: AppointmentDay ): void{
    localStorage.setItem(name, JSON.stringify(appointmentDay));
  }

  getEspecialidades(patron: string): Observable<any> {
    return this.http.post<any>( `${this.baseUrl}/api/lawyers/specialties/`, { "pattern": '' } )
  }
  
  createFavoriteLawyer(idlawyer: number, idclient:number): Observable<any>  {
    return this.http.post<any>( `${this.baseUrl}/api/lawyers/favorite/create`, {"idlawyer": idlawyer, "idclient": idclient } )
  }

  deleteFavoriteLawyer(idlawyer: number, idclient:number): Observable<any>  {
    return this.http.post<any>( `${this.baseUrl}/api/lawyers/favorite/delete`, {"idlawyer": idlawyer, "idclient": idclient } )
  } 

  setPurchasedAppointmentInSuspendedState(id: number): Observable<any>  {
    return this.http.post<any>( `${this.baseUrl}/api/appointments/suspended`, { "citaId": id } )
  } 

  setPurchasedAppointmentInCanceledState(id: number): Observable<any>  {
    return this.http.post<any>( `${this.baseUrl}/api/appointments/canceled`, { "citaId": id } )
  } 

  saveNewAppointmentReview(data: any):Observable<BackendResponse> {
    return this.http.post<BackendResponse>( `${this.baseUrl}/api/appointments/review`, data)
  }

  clearSelectedHour(listToClear:Array<string>): void{
    listToClear.forEach(element => {
      localStorage.removeItem(element);
    });
  }

  getSelectedHour( name:string ){
    return localStorage.getItem(name); 
  }

  setSelectedSchedule(name: string, fechas: Date[]): void {
    localStorage.setItem(name, JSON.stringify(fechas));
  }

  changeAppointmentDate(AppointmentId: number, newHourDateId: number , addCouunt : boolean): Observable<BackendResponse>{
    return this.http.post<BackendResponse>( `${this.baseUrl}/api/appointments/changeAppointmentDate`, {"citaId": AppointmentId, "newHoraCitaId": newHourDateId, "addCouunt": addCouunt} )
  }

  //Agendar Cita
  setNewAppointment(appointment: NewAppointment): Observable<BackendResponse> {
    return this.http.post<BackendResponse>( `${this.baseUrl}/api/appointments/newAppointment`, appointment )
  }

  setAppointmentContactInformation(contactInformation: ContactInformation): Observable<BackendResponse> {
    return this.http.post<BackendResponse>( `${this.baseUrl}/api/appointments/contactInformation`, contactInformation )
  }

  getLawyersById(customerUserId: number, id: number): Observable<LawyerListResponse>  {
    return this.http.post<LawyerListResponse>( `${this.baseUrl}/api/lawyers/getLawyerById`, {"customerUserId": customerUserId, "id": id } )
  }

  changeAppointmentDateStatus(AppointmentId: number ): Observable<BackendResponse>{
    return this.http.post<BackendResponse>( `${this.baseUrl}/api/appointments/changeAppointmentDateStatus`, {"citaId": AppointmentId} )
  }
  
  //Agenda
  getAppointmentsByLawyerId(lawyerId: number ): Observable<ScheduleCalendarResponse>{
    return this.http.post<ScheduleCalendarResponse>( `${this.baseUrl}/api/agenda/getAppointmentsByLawyerId`, {"lawyerId": lawyerId} )
  }

  getNonLawyerUsers():Observable<any> {
    return this.http.get<any>( `${this.baseUrl}/api/users/usuarios/no-abogados`)
  }
  
  getAppointmentsByDatesAndLawyerId(startDate: string | Date, endDate: string | Date, lawyerId: number ): Observable<ScheduleCalendarResponse>{
    return this.http.post<ScheduleCalendarResponse>( `${this.baseUrl}/api/agenda/getAppointmentsByDatesAndLawyerId`, {"startDate": startDate, "endDate": endDate, "lawyerId": lawyerId} )
  }

  deleteAppointmentScheduledById( appointmentId: number ): Observable<BackendResponse>{
    return this.http.post<BackendResponse>( `${this.baseUrl}/api/agenda/deleteAppointmentScheduledById`, {"appointmentId": appointmentId} )
  }

  getMissingRangesDate(schedule: JsonAgenda ): Observable<any>{
    return this.http.post<any>( `${this.baseUrl}/api/agenda/getMissingRangesDate`, schedule )
  }

  setSchedule(schedule: JsonAgenda ): Observable<BackendResponse>{
    return this.http.post<BackendResponse>( `${this.baseUrl}/api/agenda/setSchedule`, schedule )
  }


  //

  
  getAppointmentsByCustomerUserId(customerUserId: number): Observable<AppointmentResponse> {
    return this.http.post<AppointmentResponse>( `${this.baseUrl}/api/profile/appointments/purchased-appointments`, { "id": customerUserId } )
  }

  getCancelledAppointmentsByCustomerUserId(customerUserId: number): Observable<AppointmentResponse> {
    return this.http.post<AppointmentResponse>( `${this.baseUrl}/api/profile/appointments/canceled-appointments`, { "id": customerUserId } )
  }

  getCompletedAppointmentsByCustomerUserId(customerUserId: number): Observable<AppointmentResponse> {
    return this.http.post<AppointmentResponse>( `${this.baseUrl}/api/profile/appointments/completed-appointments`, { "id": customerUserId } )
  }
  




}
