import { CommonModule } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { PrimeNgModule } from '../../../prime-ng/prime-ng-module';
import { LawyerDetail } from '../../../appointments/interfaces/lawyer-list.interface';
import { LawyerSchedule } from '../../../appointments/interfaces/schedule-component.interface';
import { SelectItem, SelectItemGroup } from 'primeng/api';
import { AppointmentsService } from '../../../appointments/services/appointments.service';
import { UniversalService } from '@services/universal.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { franquiciaTService } from '@services/franquiciaT.service';
import { ProfileService } from '../../perfil/services/profile.service';
import { AuthService } from '@auth0/auth0-angular';
import { Router } from '@angular/router';

import { LaywerCardDetailComponent } from '../../../appointments/components/laywer-card-detail/laywer-card-detail.component';
import { LawyerScheduleComponent } from "../../../appointments/components/lawyer-schedule/lawyer-schedule.component";
import { LawyerFilterResponse } from '../../../appointments/interfaces/LawyerFilterResponse';
import { DropdownModule } from 'primeng/dropdown';
import { MultiSelectModule } from 'primeng/multiselect';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

@Component({
  standalone: true,
  imports: [CommonModule,
            PrimeNgModule,
            LawyerScheduleComponent,
            DropdownModule,
            MultiSelectModule,
            FormsModule,
            ReactiveFormsModule
  ],
  templateUrl: './citas.component.html',
  styleUrls: ['./citas.component.css', './../../../../assets/css/estilos.css']
})
export class CitasComponent implements OnInit {
  @ViewChild('dv') dataView!: any;

  lawyerList: LawyerFilterResponse = {} as LawyerFilterResponse;
  layerListDates: any = {}
  lawyerNameLastName: string = '';
  specialtyList: number[] | null = null;
  orderPrice: number | null = null;
  orderRating: number | null = null;

  opcionesOrdenado!: any;

  userAuth: any = {};
  userDb: any = {};
  dates: any = {};

  termino: string = '';
  sortOptions: SelectItemGroup[] = [];
  sortKey!: string;
  sortOrder: number = 0;
  sortField: string = '';
  categoriaSeleccionada: string = '';
  especialidad: { name: string; value: number }[] = [];
  especialidadSeleccionada!: any;
  listaEspecialidad!: any[];
  data!: any;

  constructor(
    private _serviciosService: UniversalService,
    private router: Router,
    public auth: AuthService,
    private spinner: NgxSpinnerService,
    private perfilesService: UniversalService,
  ) {
    /** spinner starts on init */
    this.spinner.show(undefined, {
      color: '#024939',
      bdColor: '#C59B51',
    });

    setTimeout(() => {
      /** spinner ends after 5 seconds */
      this.spinner.hide();
    }, 2000);
  }

  

  ngOnInit(): void {
    (async () => {
      this.perfilesService._universalAuth0().then(value => {
        this.userDb = value.userDb;
        console.log("soy el userDb", this.userDb);

      });

      await this._serviciosService
        .getLawyersByFilter(
          this.lawyerNameLastName,
          this.specialtyList,
          this.orderPrice,
          this.orderRating,
          this.userDb.idUsuario
        )
        .toPromise()
        .then((resp) => {
          this.lawyerList = (resp as LawyerFilterResponse);
          this.lawyerList.lawyers.forEach(e => {
            e.toLawyerDetail = (): LawyerDetail => {
              const body = { abogadoId: e.idAbogado };


              return {
                idAbogado: e.idAbogado,
                apellidos: e.apellidos,
                avatar: e.avatar,
                cantOpiniones: e.cantOpiniones,
                destacado: false,
                favorito: 1,
                formacion: "",
                lastReview: "",
                descripcion: "",
                experiencias: "",
                nombres: e.nombres,
                precios: "",
                precios_number: 1,
                rating: "",
                specialty: e.specialty,

              }
            }
          });
          this.getEvetsToMark();
        });

      this.sortOptions = [
        {
          label: 'Ordenar por Precio',
          value: 'precio',
          items: [
            { label: 'Mayor precio', value: '!precio' },
            { label: 'Menor precio', value: 'precio' },
          ],
        },
        {
          label: 'Ordenar por Rating',
          value: 'rating',
          items: [
            { label: 'Mayor rating', value: '!rating' },
            { label: 'Menor rating', value: 'rating' },
          ],
        },
      ];
      this._serviciosService.getEspecialidades('').subscribe((data) => {
        this.listaEspecialidad = data.results;
        console.log("Soy lista de especialidad, ", this.listaEspecialidad);

        this.listaEspecialidad.forEach((elem) => {
          this.especialidad.push({
            name: `${elem.name}`,
            value: elem.value,
          });
        });
      });

      
    })()
      .then(() => {
        this.layerListDates = this.lawyerList.lawyers.map(lawyer => {
          const dates = (this.dates as Array<any>).filter(d => d.abogado_id === lawyer.idAbogado);
          return {
            ...lawyer,
            dates,
          }
        });

      });

      
  }

  navDetalle(id: number) {
    new Promise((resolve, reject) => {
      $('.page-transition').toggleClass('active');
      $('body').removeClass('page-loaded');
      setTimeout(() => {
        $('#pageT').addClass('active');
        resolve(true);
      }, 1500);
    }).then((value) => {
      if (value) {
        this.router.navigate(['/abogado-detalle', id]);
      }
    });
  }

  filter() {

    this.spinner.show(undefined, {
      color: '#024939',
      bdColor: '#C59B51',
    });

    this._serviciosService
      .getLawyersByFilter(
        this.lawyerNameLastName,
        this.specialtyList,
        this.orderPrice,
        this.orderRating,
        this.userDb.idUsuario
      )
      .subscribe((resp) => {
        this.lawyerList = resp as LawyerFilterResponse;
        this.lawyerList.lawyers.forEach(e => {
          e.toLawyerDetail = (): LawyerDetail => {

            return {
              idAbogado: e.idAbogado,
              apellidos: e.apellidos,
              avatar: e.avatar,
              cantOpiniones: e.cantOpiniones,
              destacado: false,
              descripcion: "",
              experiencias:"",
              favorito: 1,
              formacion: "",
              lastReview: "",
              nombres: e.nombres,
              precios: "",
              precios_number: 1,
              rating: "",
              specialty: e.specialty,
            }
          }
        });
        this.spinner.hide();
      });
  }

  setArraySpecialtyFilter(event: any) {
    let newArray: number[] = [];

    event.value.forEach((element: any) => {
      newArray.push(element.value);
    });
    if (event.value.length > 0) {
      this.specialtyList = newArray;
    } else {
      this.specialtyList = null;
    }
  }

  orderFilter(event: any, tipo: string): void {

    if (tipo === 'order') {
      if (event.value.length > 0) {
        let arrayOrder: string[] = event.value;

        if (arrayOrder.includes('!rating') && !arrayOrder.includes('rating')) {
          this.orderRating = 0;
        } else if (
          arrayOrder.includes('rating') &&
          !arrayOrder.includes('!rating')
        ) {
          this.orderRating = 1;
        } else if (
          arrayOrder.includes('rating') &&
          arrayOrder.includes('!rating')
        ) {
          this.orderRating = null;
        }

        if (arrayOrder.includes('!precio') && !arrayOrder.includes('precio')) {
          this.orderPrice = 0;
        } else if (
          arrayOrder.includes('precio') &&
          !arrayOrder.includes('!precio')
        ) {
          this.orderPrice = 1;
        } else if (
          arrayOrder.includes('precio') &&
          arrayOrder.includes('!precio')
        ) {
          this.orderPrice = null;
        }
      }
    }
  }

  getLawyerDates(idAbogado: number) {
    const aux: any = this.layerListDates;
    console.log(aux.find((e: any) => e.abogado_id === idAbogado));
    return aux.find((e: any) => e.abogado_id === idAbogado);
  }

  public eventsToMark: any[] = [];
  getEvetsToMark() {
    this.lawyerList.lawyers.forEach((lawyer) => {
        this._serviciosService.getDatesInavailable(lawyer.idAbogado).subscribe((response: any) => {
            if (response.success) {
                lawyer.dates = response.data.map((cita: any) => ({
                    hora_dia_inicio: cita.hora_dia_inicio,
                    hora_dia_fin: cita.hora_dia_fin,
                }));
            }
        });
    });
}


  

}
