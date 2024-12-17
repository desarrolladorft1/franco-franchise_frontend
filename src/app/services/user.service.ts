import { HttpClient } from "@angular/common/http";
import { computed, inject, Injectable, signal } from "@angular/core";
import { User, UsersResponse } from "../interfaces/interface.prueba";
import {delay, Observable} from 'rxjs';
import { environment } from "../../enviroments/environment.prod";



interface State{
    users: User[];
    loading: boolean;
}

@Injectable({
    providedIn: 'root'
})

export class UserService {
    private http = inject(HttpClient);
    private baseUrl: string = environment.apiUrl;
    #state = signal<State>({
        loading : true,
        users: []
    });

    public users = computed( () => this.#state().users)
    public loading = computed( () => this.#state().loading)

    constructor () {
        this.http.get<UsersResponse>('https://reqres.in/api/users')
        .pipe( delay(1000))
        .subscribe( res => {
            this.#state.set({
                loading: false,
                users: res.data
            })
        })
    }

    getLawyersByFilter(
        lawyerNameLastName: string,
        specialtyList: number[] | null,
        orderPrice: number | null,
        orderRating: number | null,
        userId: number | null
      ): Observable<any> {
        return this.http.post<any>(`${this.baseUrl}/api/lawyers/getLawyersByFilter`, {
          lawyerNameLastName: lawyerNameLastName,
          specialtyList: specialtyList,
          orderPrice: orderPrice,
          orderRating: orderRating,
          userId: userId,
        });
      }
  



}


