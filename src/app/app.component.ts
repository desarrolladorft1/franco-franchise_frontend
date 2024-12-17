import { Component } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { AuthModule, AuthService } from '@auth0/auth0-angular';
import { FooterComponent } from '@shared/components/footer/footer.component';
import { NavComponent } from '@shared/components/nav/nav.component';
import { HeaderComponent } from "./shared/components/header/header.component";
import { ContactoComponent } from './home/contacto/contacto.component';
import { franquiciaTService } from '@services/franquiciaT.service';
import { UniversalService } from '@services/universal.service';
import { NgxSpinnerService } from 'ngx-spinner';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    NavComponent,
    FooterComponent,
    AuthModule,
    HeaderComponent
],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css', './../assets/css/normalize.css']
})
export class AppComponent {
  title = 'frontend-v3';
  spinnerType: string='';
  spinnerName: string='';

  userAuth: any = null;
  userDb: any = null;

  shoppintCartItems:any=[];
  total:number = 0;

  constructor(public auth: AuthService,
              private franquiciaTServiceLocal:franquiciaTService,
              private universalService: UniversalService,
              private spinner: NgxSpinnerService,
              private router: Router,) {

    this.spinner.show();
    
    setTimeout(() => {
      /** spinner ends after 5 seconds */
      this.spinner.hide();
    }, 1500);
  }



  _getCart(idUsuario:number): void {    
    //console.log("Refresh");
    
    this.franquiciaTServiceLocal.getCartItems(idUsuario).subscribe((data: any) => {   
      //console.log(data);
      this.total = 0;
      data.data.forEach( (element:any) => {
        this.total = this.total +  (element.cantidad*element.net )
      });
      this.shoppintCartItems = data.data;
     
    });
  }

}
