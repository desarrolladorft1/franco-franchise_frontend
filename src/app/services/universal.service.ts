import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';

import { switchMap } from 'rxjs/operators';
import { environment } from '../../enviroments/environment';
import { AuthService } from '@auth0/auth0-angular';

import { franquiciaTService } from './franquiciaT.service';

import { Observable } from 'rxjs';
import { AppointmentsService } from '../appointments/services/appointments.service';
import * as $ from 'jquery';
import { AppointmentDay, LawyerScheduleResponse } from '../appointments/interfaces/schedule-component.interface';


@Injectable({
  providedIn: 'root'
})
export class UniversalService {
  curriculum: any = null;

  private baseUrl: string = environment.apiUrl;
    
    public auth = inject(AuthService);
    private franquiciaTService = inject(franquiciaTService);
    private appointmentsService = inject(AppointmentsService);
    private http = inject(HttpClient);
  constructor(
    // private http: HttpClient,
    
    private activatedRoute: ActivatedRoute,
    //private franquiciaTService:franquiciaTService,
    //private appointmentsService: AppointmentsService,
    // public auth: AuthService,
  ) { }

  private StepInformation: any = {
    step1: {
      coursesName: '',
      coursesDesc: '',
      coursesPrices: '',
      coursesCategori: [],
    },
    step2: {
      descCourses: '',
      quienEsArray: [],
      loQueAprenArray: [],
      requisitosArray: [],
    },
    step3: { Preview: [{ name: '' }] },
    step4: {},
    step5: {},
  };



  async _universaltoShoppinCart(goTO: string, data: any, userData: any, cantidad: any): Promise<any> {
    let transaccion = {}
    let toCart:any = []

    if (goTO == "Paquete Completo") {
      // console.log(data);
      for await (const iterator of data) {
        toCart.push({
          "idCliente": userData.idUsuario,
          "idProd": iterator.idProducto,
          "precioUnitario": iterator.net,
          "cantidad": cantidad,
          "precio": iterator.net * cantidad
        });

        await this.franquiciaTService.setShoppinCartNew({
          "idCliente": userData.idUsuario,
          "idProd": iterator.idProducto,
          "precioUnitario": iterator.net,
          "cantidad": cantidad,
          "precio": iterator.net * cantidad
        }).subscribe();
      }
      return true;
    }
    else {
      if (goTO == 'Cursos') {
        transaccion = {
          idCliente: userData.idUsuario,
          idProd: data.idProducto,
          precioUnitario: data.neto,
          cantidad: cantidad,
          precio: data.neto * cantidad,
        };
        return await new Promise(async (resolve, reject) => {
          await this.franquiciaTService.setAddCoursesShopingCart(
            transaccion
          ).subscribe((transaccion) => {
            resolve(transaccion);
          });
        });
      }else{

        transaccion = {
          "idCliente": userData.idUsuario,
          "idProd": data.idProducto,
          "precioUnitario": data.net,
          "cantidad": cantidad,
          "precio": data.net * cantidad
        };
        return await new Promise(async (resolve, reject) => {
          await this.franquiciaTService.setShoppinCartNew(transaccion)
            .subscribe(transaccion => {
              resolve(transaccion);
            });
        })

      }
    }
  }


  async _universaltoShoppinCart2(
    goTO: string,
    data: any,
    userData: any,
    cantidad: any
  ): Promise<any> {
    let transaccion = {};
    //console.log(userData);
    if (goTO == "planes" || goTO == "plus") {

        transaccion = {
          idCliente: userData.idUsuario,
          idProd: data.idProducto,
          precioUnitario: data.neto,
          cantidad: cantidad,
          precio: data.neto * cantidad,
        };
        //console.log(transaccion);
        return await new Promise(async (resolve, reject) => { 
          await this.franquiciaTService.setShoppinCartNew(transaccion).subscribe(
            (transaccion) => {
              resolve(transaccion);
            }
          );
        });
    } else {
      if (goTO == 'Cursos') {
        transaccion = {
          idCliente: userData.idUsuario,
          idProd: data.idProducto,
          precioUnitario: data.neto,
          cantidad: cantidad,
          precio: data.neto * cantidad,
        };
        return await new Promise(async (resolve, reject) => {
          await this.franquiciaTService.setAddCoursesShopingCart(
            transaccion
          ).subscribe((transaccion) => {
            resolve(transaccion); 
          });
        });
      }
    }
  }

  async _universalAuth0(): Promise<any> {
    return await new Promise(async (resolve, reject) => {
      await this.auth.user$.subscribe(profile => {
        let userAuth = profile;
        if (userAuth != null) {
          this.franquiciaTService.getUsuario(userAuth.sub!).subscribe(userDb => {
            // this.franquiciaTService.getUsuarioRoleAuth0(userAuth!.sub!).subscribe( rol => {
              // console.log(rol);
              resolve({
                "userDb": userDb.data,
                "userAuth": userAuth
                // "rol": rol.data
              })
            // })   
          });
        } else {
          resolve({
            "userDb": null,
            "userAuth": null
            // "rol":null
          })
        }
      });
    })
  }

  //Local Storage de cita seleccionada
  setSelectedHour(name: string, appointmentDay: AppointmentDay): void {
    localStorage.setItem(name, JSON.stringify(appointmentDay));
  }


//ShoppinCart
getCartItems(id: number): Observable<any> {
  return this.http.post<any>(
    `${this.baseUrl}/api/shoppinCart/getCarritoCliente`,
    { id: id }
  );
}

setShoppinCartNew(datos: any): Observable<any> {
  return this.http.post<any>(
    `${this.baseUrl}/api/shoppinCart/shoppinCartNew`,
    datos
  );
}

setShoppinCartDelete(ids: number[]): Observable<any> {
  return this.http.post<any>(
    `${this.baseUrl}/api/shoppinCart/shoppinCartDelete`,
    { ids: ids }
  );
}

    //citas

    getDatesInavailable(
      abogadoId: any
    ): Observable<any>{
      return this.http.post<any>(`${this.baseUrl}/api/appointments/getDatesInavailable`,{
        abogadoId: abogadoId
      });
    }


    getLawyerScheduleById(
      days: number,
      id: number
    ): Observable<LawyerScheduleResponse> {
      return this.http.post<LawyerScheduleResponse>(
        `${this.baseUrl}/api/lawyers/lawyerScheduleById`,
        { days: days, id: id }
      );
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

    getDates(
      lawyer_id : number,
      fecha_cita : string
    ): Observable<any> {
      return this.http.post<any>(
        `${this.baseUrl}/api/appointments/getDatesLawyer`,{ 
          lawyer_id: lawyer_id, 
          fecha_cita: fecha_cita}
      );
    }

    getEspecialidades(patron: string): Observable<any> {
      return this.http.post<any>(`${this.baseUrl}/api/lawyers/getEspecialidades`, {
        patron: '',
      });
    }


  async _universaltoBuyContract(userDb: any,
    productoDetalles: any,
    
    cantidad: number,
    accion: string): Promise<any> {

    let transaccionDetalle: any = [];

//console.log(productoDetalles);
//console.log(cantidad);

    let transaccion = {
      "idCliente": userDb.idUsuario,
      "neto": productoDetalles.net * cantidad
    };

    //console.log(transaccion);
    

    this.franquiciaTService.setTrasancion(transaccion).subscribe(async transaccion => {

          transaccionDetalle.push({
            "idCliente": userDb.idUsuario,
            "idTransaccion": transaccion.data.insertId,
            "idProductoOriginal": productoDetalles.idProducto,
            "idProductos": null,
            "email": userDb.correo,
            "nombre_producto": productoDetalles.name,
            "cantidad": cantidad,
            "neto": productoDetalles.net*cantidad,
            "total": productoDetalles.net*cantidad
          })
        
      
     
      //console.log(transaccionDetalle[0]);
      

        console.log("Si entra");
        let datos = {
          name: userDb.usuario,
          email: userDb.correo,
          neto: productoDetalles.net * cantidad,
          idTransaccion: transaccion.data.insertId
        }
  
        new Promise((resolve, reject) => {
          this.activatedRoute.params
            .pipe(
              switchMap(({ }) => this.franquiciaTService.setTrasancionDetalles(transaccionDetalle)
               /*  .pipe(
                  switchMap(({ }) => this.franquiciaTService.setOpenPayCharge(datos))) */))
            .subscribe(resp => {
              window.location.href = resp.data.payment_method.url
              resolve(true)
            });
        });

  
    })
  }

  async _universaltoBuyContract2(userDb: any,
    productoDetalles: any,
    
    cantidad: number,
    accion: string): Promise<any> {

    let transaccionDetalle: any = [];

//console.log(productoDetalles);
//console.log(cantidad);

    let transaccion = {
      "idCliente": userDb.idUsuario,
      "neto": productoDetalles.neto * cantidad
    };

    //console.log(transaccion);
    

    this.franquiciaTService.setTrasancion(transaccion).subscribe(async transaccion => {

      
        
          transaccionDetalle.push({
            "idCliente": userDb.idUsuario,
            "idTransaccion": transaccion.data.insertId,
            "idProductoOriginal": productoDetalles.idProducto,
            "idProductos": null,
            "email": userDb.correo,
            "nombre_producto": productoDetalles.nombre,
            "cantidad": cantidad,
            "neto": productoDetalles.neto*cantidad,
            "total": productoDetalles.neto*cantidad
          })
        
      
     
      //console.log(transaccionDetalle[0]);
      

        console.log("Si entra");
        let datos = {
          name: userDb.usuario,
          email: userDb.correo,
          neto: productoDetalles.neto * cantidad,
          idTransaccion: transaccion.data.insertId
        }
  
        new Promise((resolve, reject) => {
          this.activatedRoute.params
            .pipe(
              switchMap(({ }) => this.franquiciaTService.setTrasancionDetalles(transaccionDetalle)
               /*  .pipe(
                  switchMap(({ }) => this.franquiciaTService.setOpenPayCharge(datos))) */))
            .subscribe(resp => {
              window.location.href = resp.data.payment_method.url
              resolve(true)
            });
        });

  
    })
  }
  

  async _universaltoBuyAppointment(
    userDb: any,
    citasDetalles: any,
    cantidad: number,
    idCitas:any,
    type: string ): Promise<any> {

   // $("body").removeClass("page-loaded");

    //console.log(citasDetalles);
   
    //TODO: Enlazar openPay 

    let transaccionDetalle: any = [];

    let transaccion = {
      "idCliente": userDb.idUsuario,
      "neto": citasDetalles.servicio.price
    };
    this.franquiciaTService.setTrasancion(transaccion).subscribe(transaccion => {
      let datos = {
        name: userDb.usuario,
        email: userDb.correo,
        neto:  citasDetalles.servicio.price,
        idTransaccion: transaccion.data.insertId,
        type: type
      }
      transaccionDetalle.push({
        "idCliente": userDb.idUsuario,
        "idTransaccion": transaccion.data.insertId,
        "idProductos": idCitas,
        "email": userDb.correo,
        "nombre_producto": citasDetalles.servicio.name,
        "cantidad": cantidad,
        "neto": citasDetalles.servicio.price,
        "total": citasDetalles.servicio.price,
        "tipo": type,
        "examenId": null
      });
      new Promise((resolve, reject) => {
        this.activatedRoute.params
          .pipe(
            switchMap(({ }) => this.franquiciaTService.setTrasancionDetallesCitas(transaccionDetalle)
              /* .pipe(
                switchMap(({ }) => this.franquiciaTService.setOpenPayCharge(datos))) */))
          .subscribe(resp => {
            // console.log(resp);

            if (type == "Citas") {
              this.appointmentsService.changeAppointmentDateStatus(idCitas).subscribe();
            }

            //window.location.href = resp.data.payment_method.url
            resolve(true)
          });
      });

    })
  }

  getStates():Observable<any> {
    return this.http.get<any>( `${this.baseUrl}/api/omnibus/locations/states`)
  }

  getMunicipalities():Observable<any> {
    return this.http.get<any>( `${this.baseUrl}/api/omnibus/locations/municipalities`)
  }

  contacto(
    nombre:string,
    apellidos:string,
    email:string,
    empresa: string,
    mensaje:string):Observable<any>{

      let datos = {
       nombre: nombre,
       apellidos: apellidos,
       email: email,
       empresa: empresa,
       mensaje: mensaje
      }

      //console.log(datos);

      return this.http.post<any>( `${this.baseUrl}/api/contacto/postContacto`, datos)

    }


    marcas(
      nombre:string, 
      apellidos:string, 
      email:string, 
      telefono:string, 
      direccion:string, 
      ciudad:string, 
      estado:string, 
      cp:string, 
      areainteres:string, 
      invertir:string, 
      marca:string, 
      comentarios:string):Observable<any>{
  
        let marcas = {
         nombre: nombre,
         apellidos: apellidos,
         email: email,
         telefono: telefono,
         direccion: direccion,
         ciudad: ciudad,
         estado: estado,
         cp: cp,
         areainteres: areainteres,
         invertir: invertir,
         marca: marca,
         comentarios: comentarios
        }
  
        //console.log(marcas);
  
        return this.http.post<any>( `${this.baseUrl}/api/marcas/postMarcas`, marcas)
  
      }

    

    financiamiento(nombres: string, apellidosP: string,apellidosM: string,
      domicilio:string,Telefono:string,correo: string,nombreNegocio:string,
      tiempoNegocio:string,utilidadesNegocio:string,tipoPlan:string,archivoPDF:string,imagen:any):Observable<any>{
  
        let datos = {
         nombres: nombres,
         apellidosP: apellidosP,
         apellidosM: apellidosM,
         domicilio: domicilio,
         Telefono: Telefono,
         correo: correo,
         nombreNegocio: nombreNegocio,
         tiempoNegocio: tiempoNegocio,
         utilidadesNegocio: utilidadesNegocio,
         tipoPlan: tipoPlan,
         archivoPDF:archivoPDF,
         imagen:imagen
      
        }
  
        //console.log(datos);
  
        return this.http.post<any>( `${this.baseUrl}/api/contacto/postFinanciamiento`, datos)
  
      }


      //citas
      async _universaltoJQuearyToPages(): Promise<any> {
        return await new Promise(async (resolve, reject) => {
          $.default("#pageT").removeClass("active");
          setTimeout(() => {
            $.default("body").addClass("page-loaded");
            resolve(true);
          }, 1500);
        })
      }

      ////////////////////////////////////////////////////////////

      //cursos

      async _getStepInformation(
        stepName: string,
        get: boolean,
        item: any
      ): Promise<any> {
        let valueStep = undefined;
        //console.log(item);
    
        if (get) {
          switch (stepName) {
            case 'step1':
              valueStep = this.StepInformation.step1;
              break;
    
            case 'step2':
              valueStep = this.StepInformation.step2;
              break;
    
            case 'step3':
              valueStep = this.StepInformation.step3;
              break;
    
            case 'step4':
              valueStep = this.StepInformation.step4;
              break;
    
            case 'step5':
              valueStep = this.StepInformation.step5;
              break;
    
            case 'all':
              valueStep = this.StepInformation;
              break;
    
            default:
              break;
          }
    
          return valueStep;
        } else {
          switch (stepName) {
            case 'step1':
              this.StepInformation.step1 = item;
              break;
    
            case 'step2':
              this.StepInformation.step2 = item;
              break;
    
            case 'step3':
              this.StepInformation.step3 = item;
              break;
    
            case 'step4':
              this.StepInformation.step4 = item;
              break;
    
            case 'step5':
              this.StepInformation.step5 = item;
              break;
    
            case 'clear':
              this.StepInformation = {
                step1: {
                  coursesName: '',
                  coursesDesc: '',
                  coursesPrices: '',
                  coursesCategori: [],
                },
                step2: {
                  descCourses: '',
                  quienEsArray: [],
                  loQueAprenArray: [],
                  requisitosArray: [],
                },
                step3: {},
                step4: {},
                step5: {},
              };
              break;
    
            default:
              break;
          }
    
          return item;
        }
      }


      
  async calculateCheckBox(coursesDetail: any): Promise<any> {
    let porcentaje = 0;
    if (coursesDetail != null && coursesDetail != undefined) {
      let checkBoxNumbers: number = 0;
      let markedCheckBoxes: number = 0;
      for (let i = 0; i < coursesDetail.length; i++) {
        let checkboxValue = coursesDetail[i].content;
        checkBoxNumbers += checkboxValue.length;
        for (let j = 0; j < checkboxValue.length; j++) {
          if (checkboxValue[j].viewed) {
            markedCheckBoxes++;
          }
        }
      }
      porcentaje = (markedCheckBoxes * 100) / checkBoxNumbers;
    }

    return porcentaje;
  }


  async _universaltoBuyContract3(
    userDb: any,
    productoDetalles: any,
    cantidad: number
  ): Promise<any> {
    $.default('body').removeClass('page-loaded');
    //console.log(userDb, productoDetalles, cantidad);

    let transaccionDetalle: any = [];

    let transaccion = {
      idCliente: userDb.idUsuario,
      neto: productoDetalles.neto * cantidad,
    };

    this.franquiciaTService.setTrasancion(transaccion).subscribe(
      (transaccion) => {
        transaccionDetalle.push({
          idCliente: userDb.idUsuario,
          idTransaccion: transaccion.data.insertId,
          idProductos: productoDetalles.idProducto,
          email: userDb.correo,
          nombre_producto: productoDetalles.nombre,
          cantidad: cantidad,
          neto: productoDetalles.neto,
          total: productoDetalles.neto,
          tipo: productoDetalles.tipo,
          examenId: productoDetalles.examenId,
        });

        //console.log(productoDetalles.tipo);

        if (
          productoDetalles.tipo != null &&
          productoDetalles.tipo != undefined
        ) {
          let datos = {
            name: userDb.usuario,
            email: userDb.correo,
            neto: productoDetalles.neto * cantidad,
            idTransaccion: transaccion.data.insertId,
          };

          new Promise((resolve, reject) => {
            this.activatedRoute.params
              .pipe(
                switchMap(({}) =>
                  this.franquiciaTService.setTrasancionDetalles(
                    transaccionDetalle
                  )/* .pipe(
                    switchMap(({}) =>
                      this.franquiciaTService.setOpenPayCharge(datos)
                      
                    )
                  ) */
                )
              )
              .subscribe((resp) => {
               /*  window.location.href = resp.data.payment_method.url; */
                resolve(true);
              });
          });
        }
      }
    );
  }






      ////////////////////////////////////////////

}


