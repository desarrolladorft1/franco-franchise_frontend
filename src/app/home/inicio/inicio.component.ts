import { CommonModule } from '@angular/common';
import { Component, Input, input, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '@auth0/auth0-angular';
import { franquiciaTService } from '@services/franquiciaT.service';
import { PrimeNgModule } from '../../prime-ng/prime-ng-module';
import Swal from 'sweetalert2';
import { UniversalService } from '@services/universal.service';
import { StyleClassModule } from 'primeng/styleclass';
import { CarouselModule } from 'primeng/carousel';

@Component({
  standalone: true,
  imports: [CommonModule, RouterModule, PrimeNgModule, CarouselModule],
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css', './../../../assets/css/estilos.css']
})



export default class InicioComponent implements OnInit {

  title = 'Franquiciat';

  spinnerType: string='';
  spinnerName: string='';

  userAuth: any = null;
  userDb: any = null;

  shoppintCartItems:any=[];
  total:number = 0;

  nombre: string='';
  apellidos: string='';
  email: string='';
  empresa: string='';
  mensaje: string='';

  conforme: string = '';
  displayModal: boolean = true;
    inicioModal: boolean = false;
    blockedDocument: boolean = false;
  /*   activa: boolean = false;
    dialo: boolean = true;
    activa2: boolean = true; */
    
    btn: boolean = false;
    visibleSidebar5:any;
  
    usuarioJSON: any = {};

    /* Custom Carousel*/
    


    products = [  
      { id: 1, razon: 'Te ofrecemos financiamiento' },  
      { id: 2, razon: 'Nuestro proceso es sencillo y transparente' },  
      { id: 3, razon: 'Nuestros especialistas cuentan con maestría y doctorado.' },
      { id: 4, razon: 'Cada servicio es diseñado atendiendo a las necesidades de tu negocio' },
      { id: 5, razon: 'Estamos disponibles para atenderte en línea, de manera inmediata' },
      { id: 6, razon: 'Más de 20 años de experiencia y clientes satisfechos nos respaldan' },
      { id: 7, razon: 'Sabemos los beneficios que tiene un negocio al ser franquiciado. La franquicia es la opción de crecimiento y expansión más exitosa en el mundo de la distribución de los negocios' }
    ];
    
    beneficios = [  
      { title: "ÉXITO PROBADO", beneficio: 'El franquiciante ha desarrollado un modelo de negocio exitoso que ya ha demostrado su efectividad en el mercado. Esto reduce significativamente los riesgos asociados con iniciar un negocio desde cero.' },  
      { title: "REDUCCIÓN DE RIESGOS", beneficio: 'Al unirte a una franquicia, cuentas con el respaldo de una marca establecida y un sistema operativo probado. Esto minimiza los riesgos financieros y las incertidumbres típicas de los nuevos negocios.' },  
      { title: "SOPORTE Y CAPACITACIÓN", beneficio: 'Los franquiciantes proporcionan capacitación inicial y continua, así como apoyo operativo y de marketing. Esto te permite emprender con confianza, incluso si no tienes experiencia previa en el sector.' },
      { title: "RECONOCIMIENTO DE MARCA", beneficio: 'Aprovechas el reconocimiento y la reputación de la marca del franquiciante. Esto puede acelerar la construcción de una base de clientes leales.' },
      { title: "ECONOMÍAS DE ESCALA", beneficio: 'Como parte de una red de franquicias, puedes beneficiarte de costos más bajos en la adquisición de suministros y servicios debido a las economías de escala.' },
      { title: "INDEPENDENCIA EMPRESARIAL", beneficio: 'A pesar de seguir un modelo probado, aún tienes la independencia para tomar decisiones locales y operar tu negocio de manera única.' }
    ];
    


constructor(
  public auth : AuthService,
  public franquiciaTServiceLocal : franquiciaTService,
  public universalService: UniversalService,
  private router : Router
){ }

ngOnInit(): void {
  this.auth.isAuthenticated$.subscribe( Auth => {
    if (Auth){
      this.router.navigate(['/inicio'])
      
    }
  })
}

contacto(nombre:string, apellidos:string, email:string, empresa:string, mensaje:string){

  this.universalService.contacto(nombre, apellidos, email, empresa, mensaje).subscribe(); 

  Swal.fire({
    html: '<h4 style="color:#00000";>Mensaje enviado!</h4>',
    icon: 'success',
    backdrop: true,
    timer: 5000,
    timerProgressBar: true,
    confirmButtonColor:'#FFFF00',
    confirmButtonText: '<h6 style="color:#1A1A1A";>Aceptar</h6>',
  }).then(() => {
    location.reload();
});   
}

con:boolean=false;

terminos(){
    
  if(this.con==false){
    this.con=true;

    this.btn=true;

  }
  else if(this.con==true){
    this.con=false;

    this.btn=false;

  }

}

isHovering_1 = false; // Estado para controlar el hover
isHovering_2 = false; // Estado para controlar el hover 2
isHovering_3 = false; // Estado para controlar el hover 3
  showDiv2_1(): void {
    this.isHovering_1 = true;
  }

  showDiv1_1(): void {
    this.isHovering_1 = false;
  }
  
  showDiv2_2(): void {
    this.isHovering_2 = true;
  }

  showDiv1_2(): void {
    this.isHovering_2 = false;
  }

  showDiv2_3(): void {
    this.isHovering_3 = true;
  }

  showDiv1_3(): void {
    this.isHovering_3 = false;
  }
  
}

