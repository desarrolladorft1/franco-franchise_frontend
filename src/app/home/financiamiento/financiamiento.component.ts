import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { PrimeNgModule } from '../../prime-ng/prime-ng-module';
import { NgxSpinnerService } from 'ngx-spinner';
import { UniversalService } from '@services/universal.service';
import { FormArray, FormBuilder, FormControl, FormGroup, FormsModule, Validators } from '@angular/forms';
import { AuthService } from '@auth0/auth0-angular';
import { franquiciaTService } from '@services/franquiciaT.service';
import { ProfileService } from '../perfil/services/profile.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  standalone: true,
  imports: [CommonModule, PrimeNgModule, FormsModule],
  templateUrl: './financiamiento.component.html',
  styleUrl: '../../../assets/css/estilos.css'
})
export class FinanciamientoComponent implements OnInit {

  nombre: string='';
  apellidos: string='';
  email: string='';
  empresa: string='';
  mensaje: string='';

 

  pagoMensual: string='';
  enganche: string='';
  ingreso: string='';
  dependientes: string='';

  calle: string='';
  exterior: string='';
  interior: string ='';
  cp: string ='';
  colonia: string ='';
  ciudad: string='';
  estado: string='';
  val: number=0;

  display: boolean = false;
  display2: boolean = false;

    showDialog() {
        this.display = true;
    }
    showDialog2() {
      this.display2 = true;
  }

  plus:string ='a';
  plusElejido:boolean=false;
  
  premium:string='b';
  premiumElejido:boolean=false;

  

  plus1(){
   // console.log("entrando plus");
    if(this.plus == "a"){
      this.plusElejido=true;
      this.premiumElejido=false;

      this.mesesPLUS=true;
      this.mesesPREM=false;

    }
  }

  premium1(){
    if(this.premium == "b"){
     // console.log("entrando premium");
      this.premiumElejido=true;
      this.plusElejido=false;

      this.mesesPLUS=false;
      this.mesesPREM=true;

    }
  }

  tabla3mesesplus:boolean=false;
  tabla3mesesPREMIUM:boolean=false;
  TresMeses:string='3';

  tabla6mesesplus:boolean=false;
  tabla6mesesPREMIUM:boolean=false;
  SeisMeses:string='6';

  tabla9mesesplus:boolean=false;
  tabla9mesesPREMIUM:boolean=false;
  NueveMeses:string='9';

  tabla12mesesplus:boolean=false;
  tabla12mesesPREMIUM:boolean=false;
  DoceMeses:string='12';

  meses3:boolean=false;
  meses6:boolean=false;
  meses9:boolean=false;
  meses12:boolean=false;

  boton3MP:boolean=false;
  boton6MP:boolean=false;
  boton9MP:boolean=false;
  boton12MP:boolean=false;

  boton3MPRE:boolean=false;
  boton6MPRE:boolean=false;
  boton9MPRE:boolean=false;
  boton12MPRE:boolean=false;


  mesesPLUS:boolean=true;
  mesesPREM:boolean=false;

  intento:boolean=false;
  cambiarBotones(){
    if(this.boton3MP==true){
      this.intento=true;

      this.boton3MP=false;
      this.boton6MP=false;
      this.boton9MP=false;
      this.boton12MP=false;

    }
    if(this.boton6MP==true){
      this.intento=true;

      this.boton3MP=false;
      this.boton6MP=false;
      this.boton9MP=false;
      this.boton12MP=false;

    }
    if(this.boton9MP==true){
      this.intento=true;
      
      this.boton3MP=false;
      this.boton6MP=false;
      this.boton9MP=false;
      this.boton12MP=false;

    }
    if(this.boton12MP==true){
      this.intento=true;
      
      this.boton3MP=false;
      this.boton6MP=false;
      this.boton9MP=false;
      this.boton12MP=false;

    }

  }
  cambiarBotones2(){
    if(this.boton3MPRE==true){
      this.intento=true;

      this.boton3MPRE=false;
      this.boton6MPRE=false;
      this.boton9MPRE=false;
      this.boton12MPRE=false;

    }
    if(this.boton6MPRE==true){
      this.intento=true;

      this.boton3MPRE=false;
      this.boton6MPRE=false;
      this.boton9MPRE=false;
      this.boton12MPRE=false;

    }
    if(this.boton9MPRE==true){
      this.intento=true;
      
      this.boton3MPRE=false;
      this.boton6MPRE=false;
      this.boton9MPRE=false;
      this.boton12MPRE=false;

    }
    if(this.boton12MPRE==true){
      this.intento=true;
      
      this.boton3MPRE=false;
      this.boton6MPRE=false;
      this.boton9MPRE=false;
      this.boton12MPRE=false;

    }

  }
  Mostrar3Meses(){
    if(this.TresMeses == "3"){
     // console.log("3 meses");
        this.meses3=true;
        this.meses6=false;
        this.meses9=false;
        this.meses12=false;

        this.boton3MP=true;
        this.boton6MP=false;
        this.boton9MP=false;
        this.boton12MP=false;

        this.boton3MPRE=false;
        this.boton6MPRE=false;
        this.boton9MPRE=false;
        this.boton12MPRE=false;
    }
    }
    Mostrar6Meses(){
    if(this.SeisMeses == "6"){
      this.meses3=false;
      this.meses6=true;
      this.meses9=false;
      this.meses12=false;

      this.boton6MP=true;
      this.boton3MP=false;
      this.boton9MP=false;
      this.boton12MP=false;

      this.boton3MPRE=false;
        this.boton6MPRE=false;
        this.boton9MPRE=false;
        this.boton12MPRE=false;
  }
  }
  Mostrar9Meses(){
  if(this.NueveMeses == "9"){
    this.meses3=false;
    this.meses6=false;
    this.meses9=true;
    this.meses12=false;

    this.boton6MP=false;
    this.boton3MP=false;
    this.boton9MP=true;
    this.boton12MP=false;

    this.boton3MPRE=false;
        this.boton6MPRE=false;
        this.boton9MPRE=false;
        this.boton12MPRE=false;
}
  }

  Mostrar12Meses(){
if(this.DoceMeses == "12"){
  this.meses3=false;
  this.meses6=false;
  this.meses9=false;
  this.meses12=true;

  this.boton6MP=false;
    this.boton3MP=false;
    this.boton9MP=false;
    this.boton12MP=true;

    this.boton3MPRE=false;
        this.boton6MPRE=false;
        this.boton9MPRE=false;
        this.boton12MPRE=false;
}
  }


  MostrarTabla3MP(){
    
       this.tabla3mesesplus=true;
       this.tabla6mesesplus=false;
       this.tabla9mesesplus=false;
       this.tabla12mesesplus=false;

       this.boton3MP=true
       this.boton6MP=false
       this.boton9MP=false
       this.boton12MP=false
 
  }
  MostrarTabla6MP(){
    
    this.tabla3mesesplus=false;
    this.tabla6mesesplus=true;
    this.tabla9mesesplus=false;
    this.tabla12mesesplus=false;

       this.boton3MP=false
       this.boton6MP=true
       this.boton9MP=false
       this.boton12MP=false

}
MostrarTabla9MP(){
    
  this.tabla3mesesplus=false;
  this.tabla6mesesplus=false;
  this.tabla9mesesplus=true;
  this.tabla12mesesplus=false;

  this.boton3MP=false
  this.boton6MP=false
  this.boton9MP=true
  this.boton12MP=false

}
MostrarTabla12MP(){
    
  this.tabla3mesesplus=false;
  this.tabla6mesesplus=false;
  this.tabla9mesesplus=false;
  this.tabla12mesesplus=true;

  this.boton3MP=false
  this.boton6MP=false
  this.boton9MP=false
  this.boton12MP=true

}

/* plan premium */

Mostrar3MesesPRE(){
  if(this.TresMeses == "3"){
   // console.log("3 meses");
      this.meses3=true;
      this.meses6=false;
      this.meses9=false;
      this.meses12=false;

      this.boton3MPRE=true;
      this.boton6MPRE=false;
      this.boton9MPRE=false;
      this.boton12MPRE=false;

      this.boton6MP=false;
    this.boton3MP=false;
    this.boton9MP=false;
    this.boton12MP=false;
  }
  }
  Mostrar6MesesPRE(){
    if(this.SeisMeses == "6"){
      this.meses3=false;
      this.meses6=true;
      this.meses9=false;
      this.meses12=false;

      this.boton6MPRE=true;
      this.boton3MPRE=false;
      this.boton9MPRE=false;
      this.boton12MPRE=false;

      this.boton6MP=false;
    this.boton3MP=false;
    this.boton9MP=false;
    this.boton12MP=false;
  }
  }
  Mostrar9MesesPRE(){
    if(this.NueveMeses == "9"){
      this.meses3=false;
      this.meses6=false;
      this.meses9=true;
      this.meses12=false;
  
      this.boton6MPRE=false;
      this.boton3MPRE=false;
      this.boton9MPRE=true;
      this.boton12MPRE=false;

      this.boton6MP=false;
    this.boton3MP=false;
    this.boton9MP=false;
    this.boton12MP=false;
  }
    }
    Mostrar12MesesPRE(){
      if(this.DoceMeses == "12"){
        this.meses3=false;
        this.meses6=false;
        this.meses9=false;
        this.meses12=true;
      
        this.boton6MP=false;
          this.boton3MPRE=false;
          this.boton9MPRE=false;
          this.boton12MPRE=true;

          this.boton6MP=false;
    this.boton3MP=false;
    this.boton9MP=false;
    this.boton12MP=false;
      }
        }


MostrarTabla3MPRE(){
    
  this.tabla3mesesPREMIUM=true;
  this.tabla6mesesPREMIUM=false;
  this.tabla9mesesPREMIUM=false;
  this.tabla12mesesPREMIUM=false;

  this.boton3MPRE=true
  this.boton6MPRE=false
  this.boton9MPRE=false
  this.boton12MPRE=false

  this.tabla3mesesplus=false;
  this.tabla6mesesplus=false;
  this.tabla9mesesplus=false;
  this.tabla12mesesplus=false;

  this.boton3MP=false;
  this.boton6MP=false;
  this.boton9MP=false;
  this.boton12MP=false;

}
MostrarTabla6MPRE(){
    
  this.tabla3mesesPREMIUM=false;
  this.tabla6mesesPREMIUM=true;
  this.tabla9mesesPREMIUM=false;
  this.tabla12mesesPREMIUM=false;

  this.boton3MPRE=false
  this.boton6MPRE=true
  this.boton9MPRE=false
  this.boton12MPRE=false

  this.tabla3mesesplus=false;
  this.tabla6mesesplus=false;
  this.tabla9mesesplus=false;
  this.tabla12mesesplus=false;

  this.boton3MP=false;
  this.boton6MP=false;
  this.boton9MP=false;
  this.boton12MP=false;

}
MostrarTabla9MPRE(){
    
  this.tabla3mesesPREMIUM=false;
  this.tabla6mesesPREMIUM=false;
  this.tabla9mesesPREMIUM=true;
  this.tabla12mesesPREMIUM=false;

  this.boton3MPRE=false
  this.boton6MPRE=false
  this.boton9MPRE=true
  this.boton12MPRE=false

  this.tabla3mesesplus=false;
  this.tabla6mesesplus=false;
  this.tabla9mesesplus=false;
  this.tabla12mesesplus=false;

  this.boton3MP=false;
  this.boton6MP=false;
  this.boton9MP=false;
  this.boton12MP=false;

}
MostrarTabla12MPRE(){
    
  this.tabla3mesesPREMIUM=false;
  this.tabla6mesesPREMIUM=false;
  this.tabla9mesesPREMIUM=false;
  this.tabla12mesesPREMIUM=true;

  this.boton3MPRE=false
  this.boton6MPRE=false
  this.boton9MPRE=false
  this.boton12MPRE=true

  this.tabla3mesesplus=false;
  this.tabla6mesesplus=false;
  this.tabla9mesesplus=false;
  this.tabla12mesesplus=false;

  this.boton3MP=false;
  this.boton6MP=false;
  this.boton9MP=false;
  this.boton12MP=false;

}





































  msgs: any[]=[];
  usuarioJSON: any = {};
  userAuth: any = {};
  userDb: any = {};
  
  private fb = inject(FormBuilder);
  constructor(private spinner: NgxSpinnerService,

              private universalService:UniversalService,
              public auth: AuthService,
              private franquiciaTService: franquiciaTService,
              private profileService: ProfileService,
              private navegacion: Router) {  
    
    this.spinner.show();
    
    setTimeout(() => {
      /** spinner ends after 5 seconds */
      this.spinner.hide();
    }, 1500);}

  ngOnInit(): void {
    window.scrollTo(0,0);


    this.universalService._universalAuth0().then(value => {
      if (value) {
        this.auth.user$
          .subscribe(profile => {
            this.userAuth = profile;
            if (this.userAuth != null) {
              this.usuarioJSON = {
                "name": profile!.name,
                "nickname": profile!.nickname,
                "email": profile!.email,
                "sub1": profile!.sub,
                "sub2": profile!.sub
              };
            }
            this.franquiciaTService.setUsuario( this.usuarioJSON ).subscribe( resp => {
              this.franquiciaTService.getUsuario( this.userAuth.sub ).subscribe(userDb => {
                // this.franquiciaTService.getUsuarioRoleAuth0(this.userAuth!.sub!).subscribe( rol => {
                    let tmp = userDb.data;
                    // console.log(rol);
                    this.userDb = tmp[0];

                   
                    
                // })

                if(this.userDb.nombres=="" || this.userDb.nombres==null){
                 console.log("faltan datos");
                 this.navegacion.navigate(['/editar-informacion']);
                }
                else if(this.userDb.nombres!="" || this.userDb.nombres!=null){
                  console.log("entrando");
                  this.navegacion.navigate(['/financiamiento']);
                }

              });
            });
          });
      }
     
    })
  }
  parteA:boolean = false;
  parteB:boolean = false;
  mostrarParteB(){
    if(this.parteB==false){
      this.parteB=true;
      this.parteA=false;
    }
  }
  mostrarParteA(){
    if(this.parteA==false){
      this.parteB=false;
      this.parteA=true;
    }
  }







  parte0:boolean = true;
  parte1:boolean = false;
  
  mostrarParte0(){
    if(this.parte1==false){
      this.parte1=true;
      this.parte0=false;
      this.parte2=false;
      this.parte3=false;
      this.parte4=false;
    }
  }

  mostrarParte1(){
    if(this.parte1==false){
      this.parte0=false;
      this.parte1=true;
      this.parte2=false;
      this.parte3=false;
      this.parte4=false;
    }
  }

  parte2:boolean = false;
  mostrarParte2(){
    if(this.nombres.length>=3 && 
      this.apellidosP.length>=3 && 
      this.apellidosM.length>=3 &&
      this.correo.length>=3){
      this.parte0=false;
      this.parte2=true;
      this.parte1=false;
      this.parte3=false;
      this.parte4=false;
    }
  }
  parte3:boolean = false;
  mostrarParte3(){
    if(this.pagoMensual!='' && 
      this.enganche!='' && 
      this.ingreso!='' &&
      this.dependientes!=''){
      this.parte0=false;
      this.parte3=true;
      this.parte1=false;
      this.parte2=false;
      this.parte4=false;
    }
  }

  parte4:boolean = false;
  mostrarParte4(){
    if(this.calle.length>=1 && 
      this.exterior!='' && 
      this.colonia.length>=3 &&
      this.cp!='' &&
      this.ciudad.length>=3 &&
      this.estado.length>=3){
      this.parte0=false;
      this.parte4=true;
      this.parte1=false;
      this.parte2=false;
      this.parte3=false;
    }

    
  }

  miFormulario: FormGroup = this.fb.group({

    nombresj: [ '', [ Validators.required, Validators.minLength(3) ] ],
    apellidoP: [ '', [ Validators.required, Validators.minLength(3) ] ],
    apellidoM: [ '', [ Validators.required, Validators.minLength(3) ] ],
    domicilio: [ '', [ Validators.required, Validators.minLength(3) ] ],
    Telefono: [ '', [ Validators.required, Validators.minLength(3) ] ],
    correos: [ '', [ Validators.required, Validators.minLength(3) ] ],
    nombreNegocio: [ '', [ Validators.required, Validators.minLength(3) ] ],
    tiempoNegocio: [ '', [ Validators.required, Validators.minLength(3) ] ],
    utilidadesNegocio: [ '', [ Validators.required, Validators.minLength(3) ] ],
    tipoPlan: [ '', [ Validators.required, Validators.minLength(3) ] ],
    estadosCuentas: [ '', [ Validators.required, Validators.minLength(3) ] ],
   /*  pago: [ '', [ Validators.required, Validators.minLength(1) ] ],
    engancheD: [ '', [ Validators.required, Validators.minLength(1) ] ],
    ingresoL: [ '', [ Validators.required, Validators.minLength(1) ] ],
    dependientesE: [ '', [ Validators.required, Validators.minLength(1) ] ],
    calles: [ '', [ Validators.required, Validators.minLength(1) ] ],
    exteriorC:  [ '', [ Validators.required, Validators.minLength(1) ] ],
    cpf: [ '', [ Validators.required, Validators.minLength(1) ] ],
    coloniaf: [ '', [ Validators.required, Validators.minLength(3) ] ],
    ciudadf: [ '', [ Validators.required, Validators.minLength(3) ] ],
    estadof: [ '', [ Validators.required, Validators.minLength(3) ] ], */
  });

  nuevaFormacion: FormControl = this.fb.control( '', Validators.required );
  nuevaEspecialidad: FormControl = this.fb.control( '', Validators.required );
  nuevaExperiencia: FormControl = this.fb.control( '', Validators.required );

  get formaciones() { return this.miFormulario.get('formaciones') as FormArray; }
  get especialidades() { return this.miFormulario.get('especialidades') as FormArray; }
  get experiencias() { return this.miFormulario.get('experiencias') as FormArray; }

  campoEsValido( campo: string ) {
    return this.miFormulario.controls[campo].errors 
            && this.miFormulario.controls[campo].touched;
            
  }

  enviar(){

  }

  

  show() {
    this.msgs.push({severity:'info', summary:'Info Message', detail:'PrimeNG rocks'});
}

hide() {
    this.msgs = [];
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
      this.navegacion.navigate(['/']);
  });   
  }

  nombres: string='';
  apellidosP: string='';
  apellidosM: string='';
  domicilio:string='';
  Telefono:string='';
  genero: string='';
  correo: string='';
  nombreNegocio:string='';
  tiempoNegocio:string='';
  utilidadesNegocio:string='';
  tipoPlan:string='';
  archivoPDF:string='';

  imagen: any = null;

  financiamiento(nombres: string, apellidosP: string,apellidosM: string,
                 domicilio:string,Telefono:string,correo: string,nombreNegocio:string,
                 tiempoNegocio:string,utilidadesNegocio:string,tipoPlan:string,archivoPDF:string){

    this.universalService.financiamiento(nombres, apellidosP, apellidosM,domicilio,Telefono,correo,nombreNegocio,tiempoNegocio,utilidadesNegocio,tipoPlan,archivoPDF,this.imagen).subscribe();


      Swal.fire({
        html: '<h4 style="color:#00000";>Financiamiento enviado!</h4>',
        backdrop: true,
        confirmButtonColor:'#FFFF00',
        confirmButtonText: '<h6 style="color:#1A1A1A";>Aceptar</h6>'
      }).then(() => {
        this.navegacion.navigate(['/']);
    });
  }

  
  cargarCurriculum( event: any ) {
    this.imagen = event.target.files[0]
  }

  con:boolean=false;
  btn:boolean=false;
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
  
  
  
  
}
