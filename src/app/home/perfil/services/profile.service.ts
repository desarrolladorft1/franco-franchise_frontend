import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';


import { AppointmentResponse } from '../../../appointments/interfaces/appointment.interface';
import { environment } from '../../../../enviroments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  private baseUrl: string = environment.apiUrl;

  constructor(private http: HttpClient) { }

  getPurchasedServicesByUser(id: number): Observable<any> {
    return this.http.post<any>( `${this.baseUrl}/api/profile/services/purchased-services`, { "id": id } )
  }

  getPurchasedAppointmentsByUser(id: number): Observable<AppointmentResponse> {
    return this.http.post<AppointmentResponse>( `${this.baseUrl}/api/profile/appointments/purchased-appointments`, { "id": id } )
  }

  getCompletedAppointmentsByUser(id: number): Observable<AppointmentResponse> {
    return this.http.post<AppointmentResponse>( `${this.baseUrl}/api/profile/appointments/completed-appointments`, { "id": id } )
  }

  getCanceledAppointmentsByUser(id: number): Observable<AppointmentResponse> {
    return this.http.post<AppointmentResponse>( `${this.baseUrl}/api/profile/appointments/canceled-appointments`, { "id": id } )
  }

  getFavoriteLawyersByUser(id: number): Observable<any> {
    return this.http.post<any>( `${this.baseUrl}/api/profile/lawyers/favorite-lawyers`, { "id": id } )
  }
  
  getLawyerIdByUserId(userId: number): Observable<any> {
    return this.http.post<any>( `${this.baseUrl}/api/profile/lawyers/getLawyerIdByUserId`, { "userId": userId } )
  }
  
}
