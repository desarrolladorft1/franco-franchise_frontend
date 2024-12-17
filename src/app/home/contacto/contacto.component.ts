import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';

import Swal from 'sweetalert2';
import { PrimeNgModule } from '../../prime-ng/prime-ng-module';
import { UniversalService } from '@services/universal.service';

@Component({
  standalone: true,
  selector: 'app-contacto',
  imports: [PrimeNgModule, CommonModule],
  templateUrl: './contacto.component.html',
  styleUrls: ['./contacto.component.css',
    '../../../assets/css/estilos.css']
})
export class ContactoComponent implements OnInit {

  nombre: string = '';
  apellidos: string = '';
  email: string = '';
  empresa: string = '';
  mensaje: string = '';
  btn: boolean = false;
  visibleSidebar5: any;

  displayModal: boolean = false;
  private spinner = inject(NgxSpinnerService);
  private universalService = inject(UniversalService);

  constructor(
    private navegacion: Router
  ) {
    this.spinner.show();


  }




  ngOnInit(): void {
    window.scrollTo(0, 0);
    this.showModalDialog();
  }

  showModalDialog() {
    this.displayModal = true;
  }

  contacto(nombre: string, apellidos: string, email: string, empresa: string, mensaje: string) {

    this.universalService.contacto(nombre, apellidos, email, empresa, mensaje).subscribe();

    Swal.fire({
      html: '<h4 style="color:#00000";>Mensaje enviado!</h4>',
      icon: 'success',
      backdrop: true,
      timer: 5000,
      timerProgressBar: true,
      confirmButtonColor: '#FFFF00',
      confirmButtonText: '<h6 style="color:#1A1A1A";>Aceptar</h6>',
    }).then(() => {
      //this.navegacion.navigate(['/']);
      location.reload();
    });
  }

  con: boolean = false;
  terminos() {

    if (this.con == false) {
      this.con = true;

      this.btn = true;

    }
    else if (this.con == true) {
      this.con = false;

      this.btn = false;

    }

  }

}

