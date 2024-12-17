import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { PrimeNgModule } from '../../prime-ng/prime-ng-module';
import { UniversalService } from '@services/universal.service';
import { AppComponent } from '../../app.component';
import { franquiciaTService } from '@services/franquiciaT.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { AuthService } from '@auth0/auth0-angular';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import Swal from 'sweetalert2';
import { PerfilesService } from '@services/perfiles.services';

@Component({
  standalone: true,
  imports: [CommonModule, PrimeNgModule],
  templateUrl: './carrito.component.html',
  styleUrls: ['./carrito.component.css',
    './../../../assets/css/estilos.css'
  ]
})
export class CarritoComponent implements OnInit {



  //esto es para mostrar el precio final
  //inicio
  contratos: any = [];
  subtotal: number = 0;
  iva: number = 0;
  total: number = 0;
  transaccion: any = {};
  transaccionDetalle: any = [];
  datos1: any = {};
  ids: number[] = [];
  //fin

  contratosShoppyCart: any = [];
  userAuth: any = {};
  userDb: any = {};
  datos: any = {};

  vacio: boolean = false;
  lleno: boolean = false;

  //ref!: DynamicDialogRef;

  constructor(private ServiciosService: UniversalService,
    private perfilesService: PerfilesService,
    private ServicesFranquiciat: franquiciaTService,
    public auth: AuthService,
    public appComponent: AppComponent,
    private spinner: NgxSpinnerService,) {

    /** spinner starts on init */
    this.spinner.show(undefined, {
      color: '#024939',
      bdColor: '#C59B51'
    });

    setTimeout(() => {
      /** spinner ends after 5 seconds */
      this.spinner.hide();
    }, 4000);

  }

  ngOnInit(): void {
    window.scrollTo(0, 0);
    (async () => {
      this.perfilesService._universalAuth0()
        .then(value => {
          this.userDb = value.userDb[0];
        });

      this.ServiciosService._universaltoJQuearyToPages().then(value => {
        if (value) {
          this.perfilesService._universalAuth0().then(value => {
            this.userAuth = value.userAuth;
            this.userDb = value.userDb;
            console.log("Soy el ID de usuario de carrito",this.userDb[0].idUsuario);
            
            this._getCart(this.userDb[0].idUsuario);
          })
        }
      });

    })();
  }


  _getCart(idUsuario: number): void {
    // Paso 1: Obtener carrito desde el servidor
    this.ServicesFranquiciat.getCartItems(idUsuario).subscribe((data: any) => {
      this.contratosShoppyCart = data.data || []; // Asegurarte de que siempre sea un array
      console.log(this.contratosShoppyCart);
  
      // Determinar si el carrito está vacío o lleno
      this.vacio = this.contratosShoppyCart.length === 0;
      this.lleno = !this.vacio;
  
      // Procesar los datos obtenidos del servidor
      this.contratos = Object.assign([], this.contratosShoppyCart);
      this.subtotal = 0;
      this.iva = 0;
      this.total = 0;
      this.ids = [];
  
      this.contratos.forEach((contrato: any) => {
        this.subtotal += contrato.precio;
        this.iva += contrato.iva_unitario * contrato.cantidad;
        this.ids.push(contrato.idTransaccion);
      });
  
      this.total = this.subtotal + this.iva;
      console.log("Esto es el total:", this.total);
  
      // Actualizar `localStorage` con los datos del servidor
      localStorage.setItem("carrito", JSON.stringify(this.contratos));
    });
  
    // Paso 2: Combinar datos locales si existen
    const carritoLocal = JSON.parse(localStorage.getItem("carrito") || "[]") as any[];
  
    if (carritoLocal.length > 0) {
      this.vacio = false;
      this.lleno = true;
    }
  
    carritoLocal.forEach((item, index) => {
      this.subtotal += item.precio;
      this.total += item.precio;
      this.contratos.push({
        id: index, // Generar ID temporal
        producto_nombre: "Cita con abogado",
        cantidad: 1,
        precio_unitario: item.precio,
        precio: item.precio,
      });
    });
  
    // Actualizar nuevamente `localStorage` para garantizar que todo esté sincronizado
    this.contratosShoppyCart = this.contratos;
    localStorage.setItem("carrito", JSON.stringify(this.contratosShoppyCart));
  }
  
  _getCart2(idUsuario: number): void {
    this.ServiciosService.getCartItems(idUsuario)
      .subscribe((data: any) => {
        this.contratosShoppyCart = data.data;
        //console.log(this.contratosShoppyCart);
      });
  }

  _deleteItem(id: number): void {
    // Eliminar del carrito en memoria
    this.contratosShoppyCart = this.contratosShoppyCart.filter((e: any) => e.id !== id);
  
    // Actualizar `localStorage`
    localStorage.setItem("carrito", JSON.stringify(this.contratosShoppyCart));
  
    // Informar al servidor sobre la eliminación
    this.ServiciosService.setShoppinCartDelete([id]).subscribe(() => {
      // Actualizar el carrito en la vista
      this.appComponent._getCart(this.userDb[0].idUsuario);
      this._getCart2(this.userDb[0].idUsuario);
    });
  
    // Mostrar alerta
    Swal.fire({
      html: '<b style="color:#C59B51";>Producto eliminado del carrito</b>',
      icon: 'success',
      backdrop: true,
      timer: 1000,
      timerProgressBar: true,
      showConfirmButton: false,
      padding: '1rem',
      toast: true,
      position: 'top-end',
    }).then(()=>{
      window.location.reload();
    });
  }
  

  buy() {
    Swal.fire({
      html: '<b style="color:#C59B51";>Procesando...</b>',
      icon: 'info',
      backdrop: true,
      timer: 12000,
      timerProgressBar: true,
      showConfirmButton: false,
      padding: '1rem',
      position: 'center',
    });
    this.ServicesFranquiciat.setOpenPayCharge({
      name: this.userDb[0].nombres,
      email: this.userDb[0].correo,
      neto: this.total,
    })
      .toPromise()
      .then(result => {
        const { payment_method } = result.data;

        window.location.href = payment_method.url;
      })
      .catch(() => {
        Swal.fire({
          html: '<b style="color:#C59B51";>Ups... ocurrio un error intentalo mas tarde</b>',
          icon: 'error',
          backdrop: true,
          timer: 12000,
          timerProgressBar: true,
          showConfirmButton: false,
          padding: '1rem',
          position: 'center',
        });
      });
  }

}
