import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '@auth0/auth0-angular';
import { franquiciaTService } from '@services/franquiciaT.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { ProfileService } from '../perfil/services/profile.service';
import { UniversalService } from '@services/universal.service';
import { CommonModule, Location } from '@angular/common';
import Swal from 'sweetalert2';
import { PrimeNgModule } from '../../prime-ng/prime-ng-module';

@Component({
  standalone: true,
  imports: [CommonModule, PrimeNgModule],
  templateUrl: './test.component.html',
  styleUrl: './test.component.css'
})
export class TestComponent implements OnInit {

  uno: string = '';
  dos: string = '';
  tres: string = '';
  cuatro: string = '';
  cinco: string = '';
  seis: string = '';
  siete: string = '';
  ocho: string = '';
  nueve: string = '';
  diez: string = '';

  usuarioJSON: any = {};
  userAuth: any = {};
  userDb: any = {};

  constructor(private spinner: NgxSpinnerService,
              public _router: Router,
              public auth: AuthService,
              public location: Location,
              private franquiciaTService: franquiciaTService,
              private profileService: ProfileService,
              private universalService: UniversalService,
              private router: Router) { 
    

    this.spinner.show();
    
                setTimeout(() => {
                  /** spinner ends after 5 seconds */
                  this.spinner.hide();
                }, 1500);
  }


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
                 this.router.navigate(['/editar-informacion']);
                }
                else if(this.userDb.nombres!="" || this.userDb.nombres!=null){
                  console.log("entrando");
                  this.router.navigate(['/test']);
                }

              });
            });
          });
      }
     
    })

  }

  
  refresh(): void {
		this._router.navigateByUrl("/test", { skipLocationChange: true }).then(() => {
		//console.log(decodeURI(this.location.path()));
		this._router.navigate([decodeURI(this.location.path())]);
		});


	}


  tress:boolean = false;
  val:number=0;
  btres(){
  if(this.tress==false){
    this.tress=true;
  }
}

  btres2(){
  if(this.tress==true){
    this.tress=false;
  }
}

  sverde: boolean = false;
  samarillo: boolean = false;
  srojo: boolean = false;
  formu: boolean = true;

  finalizar(){

    

    

    if(this.uno==='' || this.dos==='' || this.tres==='' || this.cuatro==='' ||
    this.cinco==='' || this.seis==='' || this.siete==='' || this.ocho==='' || 
    this.nueve==='' || this.diez===''){

      Swal.fire({
        html: '<h4 style="color:#00000";>No has contestado todas las preguntas!</h4>',
        icon: 'error',
        backdrop: true,
        timer: 1500,
        timerProgressBar: true,
        confirmButtonColor:'#FFFF00',
        confirmButtonText: '<h6 style="color:#1A1A1A";>Aceptar</h6>',
    });

    }else{
      this.MostrarResultadoFinal();

      Swal.fire({
        html: '<b style="color:#C59B51";>Generando Resultado</b>',
        icon: 'info',
        backdrop: true,
        timer: 9000,
        timerProgressBar: true,
        showConfirmButton: false,
        padding: '1rem',
        position: 'center'
      }).then(() => {
        window.scrollTo(0, 5000);
    });
  

    

   

  }
  }

  public onSubmit(){
  }



  MostrarResultadoFinal(){
    console.log("entrando");

    if(this.cuatro == "b"){
      this.srojo=true;
      this.samarillo=false;
      this.sverde=false;

    }
    if(this.cuatro == "a" && this.seis == "a" ){
      this.srojo=false;
      this.samarillo=true;
      this.sverde=false;

    }
    if(this.nueve == "b" && this.diez == "a" ){
      this.srojo=false;
      this.samarillo=false;
      this.sverde=true;

      if(this.cuatro == "b"){
        this.srojo=true;
        this.samarillo=false;
        this.sverde=false;
  
      }

    }

    if(this.nueve == "a" && this.diez == "b" ){
      this.srojo=false;
      this.samarillo=false;
      this.sverde=true;

      if(this.cuatro == "b"){
        this.srojo=true;
        this.samarillo=false;
        this.sverde=false;
  
      }

    }
   
    

  }

}

