import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  standalone: true,
  imports: [],
  templateUrl: './nosotros.component.html',
  styleUrl: '../../../assets/css/estilos.css'
})
export class NosotrosComponent implements OnInit {

  constructor( private spinner: NgxSpinnerService) {

    this.spinner.show();
    
                setTimeout(() => {
                  /** spinner ends after 5 seconds */
                  this.spinner.hide();
                }, 1500);
   }

  ngOnInit(): void {

    window.scrollTo(0,0);
  }

}
