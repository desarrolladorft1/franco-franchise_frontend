import { Component, OnInit, Input, SimpleChanges, inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthModule, AuthService } from '@auth0/auth0-angular';


import { AppComponent } from '../../../app.component';
import { HourElement } from '../../../appointments/interfaces/schedule-component.interface';
import Swal from 'sweetalert2';
import {ToastModule} from 'primeng/toast';
import { franquiciaTService } from '../../../services/franquiciaT.service';
import { UniversalService } from '../../../services/universal.service';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { PrimeNgModule } from '../../../prime-ng/prime-ng-module';

 

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [
    CommonModule,
    AuthModule,
    PrimeNgModule
  ],
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css', './../../../../assets/css/estilos.css']
})
export class FooterComponent implements OnInit {
  userDb: any = {};
  userAuth: any = {};
  shoppintCartItems:any=[];
  total:number = 0;
  cant:number =0;
  transaccion: any = {};
  transaccionDetalle: any = [];
  datos: any = {};
  can: number = 0;

  vacio: boolean = true;
  lleno: boolean = false;

  private universalService = inject(UniversalService);
  private franquiciaTServiceLocal = inject(franquiciaTService);
  public auth = inject(AuthService);
  constructor(  
                  ) { }

  ngOnInit(): void {

      this.universalService._universalAuth0().then(value => {
        console.log("ese el userAuth", value.userAuth);
        console.log("Este es el userDb[0]", value.userDb[0]);
        
        this.userAuth = value.userAuth;
        this.userDb = value.userDb[0];

         console.log("Estos son los roles", this.userDb.idRoles);
       /*  if(this.userDb.idRoles == 1)
        {
          this.activa = true;
        } */

    });

      this.universalService._universalAuth0().then( (userData) => {
        this.userDb = userData.userDb
        this.userAuth = userData.userAuth
        
        
     

        if (userData.userDb != null) {
            console.log("Este es el id usuario recuperado de la base ",this.userDb[0].idUsuario);
          this._getCart(this.userDb[0].idUsuario);
        }
  
      })

   
  }

    _getCart(idUsuario:number): void {
      console.log("Entro el _getCart");
      
      this.franquiciaTServiceLocal.getCartItems(idUsuario).subscribe((data: any) => {      
        if (data.data.length == 0) {
          this.total = 0
          this.cant=0
        }else{
          this.vacio = false;
          this.lleno = true;
          this.total = 0
          this.cant=0
          data.data.forEach( (element:any) => {
            this.total = this.total +  (element.cantidad*element.precio_unitario )
            this.cant = this.cant + element.cantidad
          
          });
        }
        this.can = data.data.length;
        this.shoppintCartItems = data.data;
      });
    }





    _buyCart(): void {
      let insertId: string = ""
      let datosCarro: any = {}

      new Promise((resolve, reject) => {

        this.transaccion = {
          "idCliente": this.userDb[0].idUsuario,
          "neto": this.total
        };

        this.franquiciaTServiceLocal.setTrasancion(this.transaccion)
        .subscribe(async transaccion => {
          insertId = transaccion.data.insertId;

          await this.shoppintCartItems.forEach((element: any) => {

              console.log(element);
          
            this.transaccionDetalle.push({
              "idCliente": this.userDb[0].idUsuario,
              "idTransaccion": insertId,
              "idProductoOriginal": element.idProductoOriginal,
              "idProductos": element.idProducto,
              "email": this.userDb[0].correo,
              "nombre_producto": element.name,
              "cantidad": element.cantidad,
              "neto": element.net,
              "total": element.net
            });
            datosCarro = {
              carrodecompras_id: element.idTransaccion
            }

            this.franquiciaTServiceLocal.editShoppinCartStatus(datosCarro).subscribe()
          })

          this.franquiciaTServiceLocal.setTrasancionDetalles(this.transaccionDetalle).subscribe()



        
          setTimeout(() => {
            resolve(true);
          }, 1500);
        

        })


      }).then(value => {
        if (value) {

          this.datos = {
            name: this.userDb[0].usuario,
            email: this.userDb[0].correo,
            neto: this.total,
            idTransaccion: insertId
          }
        
         /*  this.franquiciaTServiceLocal.setOpenPayCharge(this.datos)
            .subscribe(resp => {
              window.location.href = resp.data.payment_method.url
            }, error => {
              console.log(error);
            }) */
          
        }
      });

    }

    carrito(){
      this.auth.loginWithRedirect({
        appState: { target: '/carrito' }
      });
    
  }

}
