import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';
import { Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { environment } from '../../enviroments/environment.prod';
import { UniversalService } from './universal.service';
import { franquiciaTService } from './franquiciaT.service';

@Injectable({
  providedIn: 'root',
})
export class PerfilesService {
  private baseUrl: string = environment.apiUrl;

  constructor(
    private http: HttpClient,
    public auth: AuthService,
    private Servicios: UniversalService,
    private activatedRoute: ActivatedRoute,
    private ServiciosService: franquiciaTService,
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

  async _universalAuth0(): Promise<any> {
    return await new Promise(async (resolve, reject) => {
      this.auth.user$.subscribe((profile) => {
        let userAuth = profile;
        if (userAuth != null) {
          this.ServiciosService.getUsuario(userAuth.sub!).subscribe(
            (userDb) => {
              this.ServiciosService.getUsuarioRoleAuth0(
                userAuth!.sub!
              ).subscribe((rol) => {
                 console.log("Rol desde perfil.service", rol);
                resolve({
                  userDb: userDb.data,
                  userAuth: userAuth,
                  rol: rol.data,
                });
              });
            }
          );
        } else {
          resolve({
            userDb: null,
            userAuth: null,
            rol: null,
          });
        }
      });
    });
  }

  updatePostulantes(id: number, estado: number): Observable<any> {
    return this.http.post<any>(
      `/api/citas/actualizar/postulantes`,
      { id: id, estado: estado }
    );
  }

  //corredores
  updatePostulantesC(id: number, estado: number): Observable<any> {
    return this.http.post<any>(
      `/api/citas2/actualizar/postulantes2`,
      { id: id, estado: estado }
    );
  }

  setPostulante(data: any): Observable<any> {
    const formData: FormData = new FormData();
    formData.append('idUsuario', data.idUsuario);
    formData.append('nombres', data.nombres);
    formData.append('apellidos', data.apellidos);
    formData.append('identificacion', data.identificacion);
    formData.append('cedula', data.cedula);
    formData.append('fechanacimiento', data.fechanacimiento);
    formData.append('telefono', data.telefono);
    formData.append('correo', data.correo);
    formData.append('estado', data.estado);
    formData.append('ciudad', data.ciudad);
    formData.append('direccion', data.direccion);
    formData.append('codigopostal', data.codigopostal);
    formData.append('descripcion', data.descripcion);
    formData.append('formacion', data.formacion);
    formData.append('especialidad', data.especialidad);
    formData.append('experiencia', data.experiencia);
    formData.append('precio', data.precio);
    formData.append('tarjetaBancaria', data.tarjetaBancaria);
    formData.append('imagen', data.imagen);
    formData.append('curriculum', data.curriculum);
    return this.http.post(`/api/citas/postulantes`, formData);
  }

  //corredores
  setPostulanteC(data: any): Observable<any> {
    const formData: FormData = new FormData();
    formData.append('idUsuario', data.idUsuario);
    formData.append('nombres', data.nombres);
    formData.append('apellidos', data.apellidos);
    formData.append('identificacion', data.identificacion);
    formData.append('cedula', data.cedula);
    formData.append('fechanacimiento', data.fechanacimiento);
    formData.append('telefono', data.telefono);
    formData.append('correo', data.correo);
    formData.append('estado', data.estado);
    formData.append('ciudad', data.ciudad);
    formData.append('direccion', data.direccion);
    formData.append('codigopostal', data.codigopostal);
    formData.append('descripcion', data.descripcion);
    formData.append('formacion', data.formacion);
    formData.append('especialidad', data.especialidad);
    formData.append('experiencia', data.experiencia);
    formData.append('precio', data.precio);
    formData.append('tarjetaBancaria', data.tarjetaBancaria);
    formData.append('imagen', data.imagen);
    formData.append('curriculum', data.curriculum);
    return this.http.post(`/api/citas2/postulantes2`, formData);
  }

  async _universaltoShoppinCart(
    goTO: string,
    data: any,
    userData: any,
    cantidad: any
  ): Promise<any> {
    let transaccion = {};
    //console.log(userData);
    if (goTO == 'Contrato' || goTO == 'Plan' || goTO == 'Marca' || goTO == 'ConstitucionSociedad') {
      transaccion = {
        idCliente: userData.idUsuario,
        idProd: data.idProducto,
        precioUnitario: data.bruto,
        cantidad: cantidad,
        precio: data.bruto * cantidad,
      };
      //console.log(transaccion);
      return await new Promise(async (resolve, reject) => {
        await this.ServiciosService.setShoppinCartNew(transaccion).subscribe(
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
          await this.ServiciosService.setAddCoursesShopingCart(
            transaccion
          ).subscribe((transaccion) => {
            resolve(transaccion);
          });
        });
      }
    }
  }


  /* ESTO ES PARA COMPRAR LAS FIRMAS */
  firmasp: number = 15;
  async _universaltoShoppinCartPlanFirmasPremium(
    goTO: string,
    data: any,
    userData: any,
    cantidad: any
  ): Promise<any> {
    let transaccion = {};
    //console.log(userData);
    if (goTO == 'Firmas') {
      transaccion = {
        idCliente: userData.idUsuario,
        idProd: data.idProducto,
        precioUnitario: data.bruto,
        cantidad: cantidad,
        precio: data.bruto * cantidad,
        firmas: this.firmasp
      };
      //console.log(transaccion);
      return await new Promise(async (resolve, reject) => {
        await this.ServiciosService.setShoppinCartNewFirmasPremium(transaccion).subscribe(
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
          await this.ServiciosService.setAddCoursesShopingCart(
            transaccion
          ).subscribe((transaccion) => {
            resolve(transaccion);
          });
        });
      }
    }
  }

  /* TERMINA LO DE LAS FIRMAS */



  //para constitucion de sociedad
  async _universaltoShoppinCartConstitucionSociedad(
    goTO: string,
    data: any,
    userData: any,
    cantidad: any,
    precio: any
  ): Promise<any> {
    let transaccion = {};
    //console.log(userData);
    if (goTO == 'ConstitucionSociedad') {
      transaccion = {
        idCliente: userData.idUsuario,
        idProd: data.idProducto,
        precioUnitario: data.bruto,
        cantidad: cantidad,
        precio: precio * cantidad,
      };
      //console.log(transaccion);
      return await new Promise(async (resolve, reject) => {
        await this.ServiciosService.setShoppinCartNew(transaccion).subscribe(
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
          await this.ServiciosService.setAddCoursesShopingCart(
            transaccion
          ).subscribe((transaccion) => {
            resolve(transaccion);
          });
        });
      }
    }
  }

  async _universaltoJQuearyToPages(): Promise<any> {
    return await new Promise(async (resolve, reject) => {
      $('#pageT').removeClass('active');
      setTimeout(() => {
        $('body').addClass('page-loaded');
        resolve(true);
      }, 1500);
    });
  }

  async _universaltoBuyContract(
    userDb: any,
    productoDetalles: any,
    cantidad: number
  ): Promise<any> {
    $('body').removeClass('page-loaded');
    //console.log(userDb, productoDetalles, cantidad);

    let transaccionDetalle: any = [];

    let transaccion = {
      idCliente: userDb.idUsuario,
      neto: productoDetalles.neto * cantidad,
    };

    this.ServiciosService.setTrasancion(transaccion).subscribe(
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

        // console.log(productoDetalles.tipo);

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
                switchMap(({ }) =>
                  this.ServiciosService.setTrasancionDetalles(
                    transaccionDetalle
                  ).pipe(
                    switchMap(({ }) =>
                      this.ServiciosService.setOpenPayCharge(datos)

                    )
                  )
                )
              )
              .subscribe((resp) => {
                window.location.href = resp.data.payment_method.url;
                resolve(true);
              });
          });
        }
      }
    );
  }

  tipo: number = 0;
  confidencialidad: number = 28;
  async _universaltoBuyContractGratis(
    userDb1: any,
    productoDetalles: any,
    cantidad: number,
    precio: number
  ): Promise<any> {
    $('body').removeClass('page-loaded');
    console.log(userDb1, precio, cantidad);

    let transaccionDetalle: any = [];

    let transaccion = {
      idCliente: userDb1.idUsuario,
      neto: precio * cantidad,
    };
    console.log(transaccion);
    console.log("entrados a setTransacion");
    this.ServiciosService.setTrasancion(transaccion).subscribe(
      (transaccion) => {
        transaccionDetalle.push({
          idCliente: userDb1.idUsuario,
          idTransaccion: transaccion.data.insertId,
          idProductos: this.confidencialidad,
          email: userDb1.correo,
          nombre_producto: productoDetalles.nombre,
          cantidad: cantidad,
          neto: precio,
          total: precio,
          tipo: this.tipo,
          examenId: productoDetalles.examenId,
        });

        console.log(this.tipo);
        console.log(transaccionDetalle);

        if (
          this.tipo != null &&
          this.tipo != undefined
        ) {
          let datos = {
            name: userDb1.usuario,
            email: userDb1.correo,
            neto: precio * cantidad,
            idTransaccion: transaccion.data.insertId,
          };

          console.log(datos);
          new Promise((resolve, reject) => {
            this.activatedRoute.params
              .pipe(
                switchMap(({ }) =>
                  this.ServiciosService.setTrasancionDetalles(
                    transaccionDetalle
                  ).pipe(
                    switchMap(({ }) =>
                      this.ServiciosService.setOpenPayCharge(datos)

                    )
                  )
                )
              )
              .subscribe((resp) => {
                //window.location.href = resp.data.payment_method.url;
                //window.location.href = 'https://localhost:4200/contratos-comprados';
                //appState: { target: `https://localhost:4200/contratos-comprados` }
                resolve(true);
              });
          });
        }
      }
    );
  }

  sitioweb: number = 12;
  async _universaltoBuyContractGratis2(
    userDb1: any,
    productoDetalles: any,
    cantidad: number,
    precio: number
  ): Promise<any> {
    $('body').removeClass('page-loaded');
    console.log(userDb1, precio, cantidad);

    let transaccionDetalle: any = [];

    let transaccion = {
      idCliente: userDb1.idUsuario,
      neto: precio * cantidad,
    };
    console.log(transaccion);
    console.log("entrados a setTransacion");
    this.ServiciosService.setTrasancion(transaccion).subscribe(
      (transaccion) => {
        transaccionDetalle.push({
          idCliente: userDb1.idUsuario,
          idTransaccion: transaccion.data.insertId,
          idProductos: this.sitioweb,
          email: userDb1.correo,
          nombre_producto: productoDetalles.nombre,
          cantidad: cantidad,
          neto: precio,
          total: precio,
          tipo: this.tipo,
          examenId: productoDetalles.examenId,
        });

        console.log(this.tipo);
        console.log(transaccionDetalle);

        if (
          this.tipo != null &&
          this.tipo != undefined
        ) {
          let datos = {
            name: userDb1.usuario,
            email: userDb1.correo,
            neto: precio * cantidad,
            idTransaccion: transaccion.data.insertId,
          };

          console.log(datos);
          new Promise((resolve, reject) => {
            this.activatedRoute.params
              .pipe(
                switchMap(({ }) =>
                  this.ServiciosService.setTrasancionDetalles(
                    transaccionDetalle
                  ).pipe(
                    switchMap(({ }) =>
                      this.ServiciosService.setOpenPayCharge(datos)

                    )
                  )
                )
              )
              .subscribe((resp) => {
                //window.location.href = resp.data.payment_method.url;
                //window.location.href = 'https://localhost:4200/contratos-comprados';
                //appState: { target: `https://localhost:4200/contratos-comprados` }
                resolve(true);
              });
          });
        }
      }
    );
  }

  async _universaltoBuyMarca(
    userDb: any,
    productoDetalles: any,
    cantidad: number
  ): Promise<any> {
    $('body').removeClass('page-loaded');
    let transaccionDetalle: any = [];
    let transaccion = {
      idCliente: userDb.idUsuario,
      neto: productoDetalles.neto * cantidad,
    };

    this.ServiciosService.setTrasancion(transaccion).subscribe(
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
                switchMap(({ }) =>
                  this.ServiciosService.setTrasancionDetalles(
                    transaccionDetalle
                  ).pipe(
                    switchMap(({ }) =>
                      this.ServiciosService.setOpenPayChargeMarca(datos)
                    )
                  )
                )
              )
              .subscribe((resp) => {
                window.location.href = resp.data.payment_method.url;
                resolve(true);
              });
          });
        }
      }
    );
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

  async _universaltoBuyAppointment(
    userDb: any,
    citasDetalles: any,
    cantidad: number,
    idCitas: any,
    type: string
  ): Promise<any> {
    $('body').removeClass('page-loaded');

    // console.log(citasDetalles);

    this.ServiciosService.insertNewTransaction(
      userDb.idUsuario,
      citasDetalles.servicio.price
    ).subscribe((transaccion) => {
      let datos = {
        name: userDb.usuario,
        email: userDb.correo,
        neto: citasDetalles.servicio.price,
        idTransaccion: transaccion.data.insertId,
        type: type,
      };
      new Promise((resolve, reject) => {
        this.activatedRoute.params
          .pipe(
            switchMap(({ }) =>
              this.ServiciosService.insertNewTransactionDetail(
                transaccion.data.insertId,
                idCitas,
                cantidad,
                citasDetalles.servicio.price
              ).pipe(
                switchMap(({ }) => this.ServiciosService.setOpenPayCharge(datos))
              )
            )
          )
          .subscribe((resp) => {
            // console.log(resp);

            if (type == 'Citas') {
              this.ServiciosService.changeAppointmentDateStatus(
                idCitas
              ).subscribe();
            }

            window.location.href = resp.data.payment_method.url;
            resolve(true);
          });
      });
    });
  }

  async _getStepInformation(
    stepName: string,
    get: boolean,
    item: any
  ): Promise<any> {
    let valueStep = undefined;
    // console.log(item);

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


  //contacto
  contacto(
    nombre: string,
    apellidos: string,
    email: string,
    empresa: string,
    mensaje: string): Observable<any> {

    let datos = {
      nombre: nombre,
      apellidos: apellidos,
      email: email,
      empresa: empresa,
      mensaje: mensaje
    }

    //console.log(datos);

    return this.http.post<any>(`/api/contacto/postContacto`, datos)

  }

  //franquicias
  enviarDatosfranquicia(
    nombre: string,
    apellido: string,
    nacimiento: string,
    ciudad: string,
    email: string,
    telefono: string,
    mensaje: string,
    pdfPrincipal: any): Observable<any> {

    const datosEnvio: FormData = new FormData();
    datosEnvio.append('nombre', nombre);
    datosEnvio.append('apellido', apellido);
    datosEnvio.append('nacimiento', nacimiento);
    datosEnvio.append('ciudad', ciudad);
    datosEnvio.append('email', email);
    datosEnvio.append('telefono', telefono);
    datosEnvio.append('mensaje', mensaje);
    datosEnvio.append('pdfPrincipal', pdfPrincipal);

    console.log(datosEnvio);

    return this.http.post<any>(`/api/contacto/DatosFRAN`, datosEnvio)

  }

  //contacto
  enviarDatos(
    nombre: string,
    apellidos: string,
    email: string,
    telefono: string,
    nombre1: string,
    nombre2: string,
    nombre3: string,
    pdfPrincipal: any,
    actaNacimiento: any,
    comprobanteDomicilio: any,
    curp: any,
    rfc: any,
    identificacionOficial: any): Observable<any> {

    /*  let datosEnvio = {
       nombre: nombre,
       apellidos: apellidos,
       email: email,
       telefono: telefono,
       pdfPrincipal: pdfPrincipal
     }
 
     console.log(datosEnvio); */

    const datosEnvio: FormData = new FormData();
    datosEnvio.append('nombre', nombre);
    datosEnvio.append('apellidos', apellidos);
    datosEnvio.append('email', email);
    datosEnvio.append('telefono', telefono);
    datosEnvio.append('nombre1', nombre1);
    datosEnvio.append('nombre2', nombre2);
    datosEnvio.append('nombre3', nombre3);
    datosEnvio.append('pdfPrincipal', pdfPrincipal);
    datosEnvio.append('actaNacimiento', actaNacimiento);
    datosEnvio.append('comprobanteDomicilio', comprobanteDomicilio);
    datosEnvio.append('curp', curp);
    datosEnvio.append('rfc', rfc);
    datosEnvio.append('identificacionOficial', identificacionOficial);


    console.log(datosEnvio);

    return this.http.post<any>(`/api/contacto/DatosCS`, datosEnvio)

  }

  enviarDatos2(
    nombre: string,
    apellidos: string,
    email: string,
    telefono: string,
    nombre11: string,
    nombre22: string,
    nombre33: string,
    pdfPrincipal2: any,
    ActaConstitutiva: any,
    RFCsociedad: any,
    ComprobanteSociedad: any,
    IdentificacionApoderado: any,
    RFCapoderado: any,
    comisionario1: string,
    comisionario2: string,
    comisionario3: string,
    comisionario4: string,
    comisionario5: string,
    RFCScomisionarios: any): Observable<any> {


    const datosEnvio2: FormData = new FormData();
    datosEnvio2.append('nombre', nombre);
    datosEnvio2.append('apellidos', apellidos);
    datosEnvio2.append('email', email);
    datosEnvio2.append('telefono', telefono);
    datosEnvio2.append('nombre11', nombre11);
    datosEnvio2.append('nombre22', nombre22);
    datosEnvio2.append('nombre33', nombre33);
    datosEnvio2.append('pdfPrincipal2', pdfPrincipal2);
    datosEnvio2.append('ActaConstitutiva', ActaConstitutiva);
    datosEnvio2.append('RFCsociedad', RFCsociedad);
    datosEnvio2.append('ComprobanteSociedad', ComprobanteSociedad);
    datosEnvio2.append('IdentificacionApoderado', IdentificacionApoderado);
    datosEnvio2.append('RFCapoderado', RFCapoderado);
    datosEnvio2.append('comisionario1', comisionario1);
    datosEnvio2.append('comisionario2', comisionario2);
    datosEnvio2.append('comisionario3', comisionario3);
    datosEnvio2.append('comisionario4', comisionario4);
    datosEnvio2.append('comisionario5', comisionario5);
    datosEnvio2.append('RFCScomisionarios', RFCScomisionarios);


    console.log(datosEnvio2);

    return this.http.post<any>(`/api/contacto/DatosCS200000`, datosEnvio2)

  }



  //seguridata 1
  SeguriData1(): Observable<any> {

    let datos34 = {

    }

    //console.log(datos);

    return this.http.post<any>(`/api/openpayApi/Client/Seguridata`, datos34)

  }

  //seguridata2

  SeguriData2(): Observable<any> {

    let datos35 = {
    }



    return this.http.post<any>(`/api/openpayApi/Client/Seguridata2`, datos35);


  }

  //seguridata3
  SeguriData3(PDFS: any, pdfPrin: string): Observable<any> {
    const datosEnvio: FormData = new FormData();
    if (PDFS == null || PDFS == undefined) {

      alert("Selecciona un archivo");
    }
    else {


      datosEnvio.append('PDFS', PDFS);
      datosEnvio.append('pdfPrin', pdfPrin);
    }




    return this.http.post<any>(`/api/openpayApi/Client/Seguridata3`, datosEnvio)

  }

  //seguridata4
  SeguriData4(nombre: any): Observable<any> {

    const datosEnvio4: FormData = new FormData();
    datosEnvio4.append('nombre', nombre);



    return this.http.post<any>(`/api/openpayApi/Client/Seguridata4`, datosEnvio4)

  }

  //seguridata4_1
  SeguriData4_1(numFirmas: any): Observable<any> {

    const datosEnvios23: FormData = new FormData();
    datosEnvios23.append('numFirmas', numFirmas);



    return this.http.post<any>(`/api/openpayApi/Client/Seguridata4_1`, datosEnvios23)

  }

  //seguridata5
  SeguriData5(Nomb: string, correo: string, tipoFirma: any): Observable<any> {

    const datosEnvios: FormData = new FormData();
    datosEnvios.append('Nomb', Nomb);
    datosEnvios.append('correo', correo);
    datosEnvios.append('tipoFirma', tipoFirma);



    return this.http.post<any>(`/api/openpayApi/Client/Seguridata5`, datosEnvios)

  }

  //seguridata7
  SeguriData7(): Observable<any> {

    let datos40 = {
    }



    return this.http.post<any>(`/api/openpayApi/Client/Seguridata7`, datos40)

  }

  //seguridata8
  SeguriData8(): Observable<any> {

    let datos41 = {
    }



    return this.http.post<any>(`/api/openpayApi/Client/Seguridata8`, datos41)

  }

  //seguridata9
  SeguriData9(): Observable<any> {

    let datos42 = {
    }



    return this.http.post<any>(`/api/openpayApi/Client/Seguridata9`, datos42)

  }

  UpdateActivomarca(
    activo: number,
    userDb: any
  ): Observable<any> {

    let datos = {
      activo: activo,
      idUsuario: userDb.idUsuario
    }

    return this.http.post<any>(`/api/Marca/postMarcaUpdate`, datos)

  }

  PostRegistroMarca(
    nombre: string,
    imagen: any,
    unaPersona: string,
    unaPersonaNombre: string,
    unaPersonaApellidos: string,
    numPersonas: string,
    persona1NOMBRE: string,
    persona1APELLIDOS: string,
    persona2NOMBRE: string,
    persona2APELLIDOS: string,
    persona3NOMBRE: string,
    persona3APELLIDOS: string,
    persona4NOMBRE: string,
    persona4APELLIDOS: string,
    persona5NOMBRE: string,
    persona5APELLIDOS: string,
    calle: string,
    numeroEXT: string,
    numINT: string,
    colonia: string,
    CP: string,
    ciudad: any,
    estado: string,
    pais: string,
    correo: string,
    telefono: string,
    medio: string,
    fecha: string,
    descripcion: string,
    servicio: string,
    userDb: any,
    productoDetalles: any): Observable<any> {

    const formData: FormData = new FormData();
    formData.append('nombre', nombre);
    formData.append('imagen', imagen);
    formData.append('unaPersona', unaPersona);
    formData.append('unaPersonaNombre', unaPersonaNombre);
    formData.append('unaPersonaApellidos', unaPersonaApellidos);
    formData.append('numPersonas', numPersonas);
    formData.append('persona1NOMBRE', persona1NOMBRE);
    formData.append('persona1APELLIDOS', persona1APELLIDOS);
    formData.append('persona2NOMBRE', persona2NOMBRE);
    formData.append('persona2APELLIDOS', persona2APELLIDOS);
    formData.append('persona3NOMBRE', persona3NOMBRE);
    formData.append('persona3APELLIDOS', persona3APELLIDOS);
    formData.append('persona4NOMBRE', persona4NOMBRE);
    formData.append('persona4APELLIDOS', persona4APELLIDOS);
    formData.append('persona5NOMBRE', persona5NOMBRE);
    formData.append('persona5APELLIDOS', persona5APELLIDOS);
    formData.append('calle', calle);
    formData.append('numeroEXT', numeroEXT);
    formData.append('numINT', numINT);
    formData.append('colonia', colonia);
    formData.append('CP', CP);
    formData.append('ciudad', ciudad.nombre);
    formData.append('estado', estado);
    formData.append('pais', pais);
    formData.append('correo', correo);
    formData.append('telefono', telefono);
    formData.append('medio', medio);
    formData.append('fecha', fecha);
    formData.append('descripcion', descripcion);
    formData.append('servicio', servicio);
    formData.append('idUsuario', userDb.idUsuario);
    formData.append('idProductos', productoDetalles.idProductos);
    formData.append('nombre_producto', productoDetalles.nombre_producto);

    console.log(formData);

    return this.http.post<any>(`/api/Marca/enviarMarca`, formData)
  }



}
