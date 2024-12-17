import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../enviroments/environment';


@Injectable({
  providedIn: 'root'
})
export class franquiciaTService {

  private baseUrl: string = environment.apiUrl;
  private selectedCursos: any = {};
  private http = inject(HttpClient)
  constructor() { }

  //Producs
  getAllProducto(): Observable<any> {
    return this.http.get<any>( `${this.baseUrl}/api/products/allProductos`)
  }

  getOneProducto(id: number): Observable<any> {
    return this.http.post<any>( `${this.baseUrl}/api/products/oneProductos`, { "id": id } )
  }

  getOneSubProducto(id: number): Observable<any> {
    return this.http.post<any>( `${this.baseUrl}/api/products/oneSubProductos`, { "id": id } )
  }

  getProductosPorTipo(tipo: string): Observable<any> {
    return this.http.post<any>( `${this.baseUrl}/api/products/productosPorTipo`, { "tipo": tipo } )
  }

  //mostrar usuarios registrados
  getAllUsuariosRegistrados(id: number): Observable<any> {
    return this.http.post<any>( `${this.baseUrl}/api/products/allUsuarios`, { "id": id })
  }
  
  //Transactions
  // setTrasancion( datos: any ): Observable<any> {
  //   return this.http.post<any>( `${this.baseUrl}/api/transactions/transacciones`, datos )
  // }

  // setTrasancionDetalles( datos: any ): Observable<any> {
  //   return this.http.post<any>( `${this.baseUrl}/api/transactions/transacciones/detalles`, datos )
  // }

  setTrasancionDetallesCitas( datos: any ): Observable<any> {
    return this.http.post<any>( `${this.baseUrl}/api/transactions/transacciones/detallesCitas`, datos )
  }

  setTrasancionDetallesCursos( datos: any ): Observable<any> {
    return this.http.post<any>( `${this.baseUrl}/api/transactions/transacciones/detallesCursos`, datos )
  }

  //OpenPay
 /*  setOpenPayCharge( datos: any ): Observable<any> {
    return this.http.post<any>( `${this.baseUrl}/api/openpayApi/NewCharges`, datos )
  } */

  setShoppinCartDelete( ids: number[] ): Observable<any> {
    return this.http.post<any>( `${this.baseUrl}/api/shoppinCart/shoppinCartDelete`, { "ids": ids } )
  }

  editShoppinCartStatus( datos: any ): Observable<any> {
    return this.http.post<any>( `${this.baseUrl}/api/shoppinCart/shoppinCartEditStatus`, datos )
  }

  //ShoppinCart
  
  getShoppinCartUser( id: any ): Observable<any> {
    return this.http.post<any>( `${this.baseUrl}/api/shoppinCart/getShoppinCartClient`,  {"id": id} )
  }

  setShoppinCartNew( datos: any ): Observable<any> {
    //console.log(datos);
    return this.http.post<any>( `${this.baseUrl}/api/shoppinCart/shoppinCartNew`, datos )
    
  }

  //firmas premium
  setShoppinCartNewFirmasPremium(datos: any): Observable<any> {
    return this.http.post<any>(
      `/api/shoppinCart/shoppinCartNewPlanFirmaPremium`,
      datos
    );
  }

  //OpenPay
  setOpenPayCharge(datos: any): Observable<any> {
    return this.http.post<any>(
      `/api/openpayApi/Client/NewCharges`,
      datos
    );
  }

  setOpenPayChargeMarca(datos: any): Observable<any> {
    return this.http.post<any>(
      `/api/openpayApi/Client/NewChargesMarca`,
      datos
    );
  }

  //Transactions
  setTrasancion(datos: any): Observable<any> {
    return this.http.post<any>(
      `/api/transactions/transacciones`,
      datos
    );
  }

  setTrasancionDetalles(datos: any): Observable<any> {
    return this.http.post<any>(
      `/api/transactions/transacciones/detalles`,
      datos
    );
  }
  insertNewTransaction(idCliente: number, neto: number): Observable<any> {
    return this.http.post<any>(
      `/api/citas/transacciones/insertNewTransaction`,
      { idCliente: idCliente, neto: neto }
    );
  }

  insertNewTransactionDetail(
    trxId: number,
    AppointmentId: number,
    qty: number,
    neto: number
  ): Observable<any> {
    return this.http.post<any>(
      `/api/citas/transacciones/insertNewTransactionDetail`,
      { trxId: trxId, citaId: AppointmentId, cantidad: qty, neto: neto }
    );
  }

  changeAppointmentDateStatus(AppointmentId: number): Observable<any> {
    return this.http.post<any>(
      `/api/citas/transacciones/changeAppointmentDateStatus`,
      { citaId: AppointmentId }
    );
  }



  //User
  setUsuario( datos: any ): Observable<any> {
    return this.http.post<any>( `${this.baseUrl}/api/users/usuarios/crear`, datos )
  }
  
  getUsuarioRoleAuth0( idAPIAUTH: string ): Observable<any> {
    return this.http.post<any>( `${this.baseUrl}/api/auth/UserRole`, {"idAPIAUTH": idAPIAUTH} )
  }

  getUsuario( key: string ): Observable<any> {
    return this.http.post<any>( `${this.baseUrl}/api/users/usuarios`, { "key": key } )
  }

  editUserDetail( datos: any ): Observable<any> {
    return this.http.post<any>( `${this.baseUrl}/api/users/usuarios/editUser`, datos )
  }

////////////////////////////////////
  //cursos

  setSelecterItem(name:string,select:any): void{
    localStorage.setItem(name, JSON.stringify(select));
  }

  getSelecterItem(name:string): Observable<any>{
    this.selectedCursos = localStorage.getItem(name);
    return this.selectedCursos; 
  }

  clearSelecterItem(listToClear:Array<string>): void{
    listToClear.forEach(element => {
      localStorage.removeItem(element);
    });
 
  }

  getAllCategoriesCourses(): Observable<any> {
    return this.http.get<any>( `${this.baseUrl}/api/courses/all/categorias`)
  }

  getAllCoursesWOActive(): Observable<any> {
    return this.http.get<any>( `${this.baseUrl}/api/courses/coursesWOActive`)
  }

  setActiveCourse(activo:boolean=false, dim_productos_id:number ): Observable<any> {
    return this.http.post<any>( `${this.baseUrl}/api/courses/UpdateActiveCourse`, { "activo": activo , "dim_productos_id": dim_productos_id,})
  }
  setActiveCourse2(activo:boolean=true, dim_productos_id:number ): Observable<any> {
    return this.http.post<any>( `${this.baseUrl}/api/courses/UpdateActiveCourse`, { "activo": activo , "dim_productos_id": dim_productos_id,})
  }
  //Transactions
  getClientesTrasancionesDetalles( id: number ): Observable<any> {
    return this.http.post<any>( `${this.baseUrl}/api/courses/transacciones/buyPay`, { "id": id } )
  }
   //Shopping Cart
   setAddCoursesShopingCart( datos: any ):Observable<any> {
    return this.http.post<any>( `${this.baseUrl}/api/courses/SC/shoppinCartNew`,  datos )
  }

  //contenido del curso

  getCoursesDetailWithUser( idproducto: string, idUsuario:string ):Observable<any> {
    return this.http.post<any>( `${this.baseUrl}/api/courses/ContentXCoursesWithUser`, { "idproducto": idproducto, "idUsuario": idUsuario } )
  }

  setViewed( viewedStatus: boolean, detaill_id:string,  dim_usuarios_id:string): Observable<any> {
    return this.http.post<any>( `${this.baseUrl}/api/courses/setViewed`, {  "viewedStatus": viewedStatus,
                                                                            "detaill_id": detaill_id,
                                                                            "dim_usuarios_id": dim_usuarios_id } )
  }

  getTransactionsDetailsByClientCoursesSpecifyOne( idCliente:Number ,idProducto:Number ): Observable<any> {
    return this.http.post<any>( `${this.baseUrl}/api/courses/transacciones/MyViewCourseRefresh`, { "idCliente": idCliente, "idProducto":idProducto } )
  }

  guathCheckCourses( idCliente:Number ,idProducto:Number ): Observable<any> {
    return this.http.post<any>( `${this.baseUrl}/api/courses/transacciones/guathCheckCourses`, { "idCliente": idCliente, "idProducto":idProducto } )
  }

  ////////////////////////////////////////////



  //carrito

  setShoppinCartServicios( datos: any ): Observable<any> {
    return this.http.post<any>( `${this.baseUrl}/api/shoppinCart/shoppinCartServicios`, datos )
  }

  getCartItems( id: number ): Observable<any> {
    return this.http.post<any>( `${this.baseUrl}/api/shoppinCart/getCarritoCliente`, { "id": id } )
  }

  setTrasancion2( datos: any ): Observable<any> {
    return this.http.post<any>( `${this.baseUrl}/api/transactions/transacciones`, datos )
  }

  setTrasancionDetalles2( datos: any ): Observable<any> {
    return this.http.post<any>( `${this.baseUrl}/api/transactions/transacciones/detallesCursos`, datos )
  }

  
}
  

