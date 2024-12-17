import { CommonModule } from '@angular/common';
import { Component, HostListener, Input, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { PrimeNgModule }  from '../../../prime-ng/prime-ng-module';
import { Dropdown } from 'bootstrap';
import { UniversalService } from '@services/universal.service';
import { AuthService } from '@auth0/auth0-angular';

@Component({
  standalone: true,
  selector: 'app-nav',
  imports: [CommonModule, PrimeNgModule, RouterModule],
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit{

  @Input() userAuth: any = null;
  isScrolled = false;
  isAuthenticated: boolean = false;

  

  




  constructor(
    public universalAuth : UniversalService,
    public auth : AuthService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    // Suscríbete a `isAuthenticated$` para actualizar el estado
    this.auth.isAuthenticated$.subscribe((isAuth) => {
      this.isAuthenticated = isAuth;
    });
  }


  Login(): void {
    this.auth.loginWithRedirect();
  }

  LogOut(): void {
    this.auth.logout({
      logoutParams: {
        returnTo: document.location.origin
      },
    });
  }

  usuario(){
    

    console.log(this.auth.user$.subscribe(auth =>{
      console.log(auth);
      
    }));

  }
  // loginWithRedirect() {
  //   this.auth.loginWithRedirect({
  //     appState: { target: '/perfil' }
  //   });
  // }


}