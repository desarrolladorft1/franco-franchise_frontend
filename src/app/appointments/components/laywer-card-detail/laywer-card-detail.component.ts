import { Component, Input, OnInit, Pipe, PipeTransform } from '@angular/core';
import { LawyerDetail, ServicePrice } from '../../interfaces/lawyer-list.interface';
import { Router } from '@angular/router';
import { UniversalService } from '@services/universal.service';
import { CommonModule } from '@angular/common';
import { PrimeNgModule } from '../../../prime-ng/prime-ng-module';
import { CutStringPipe } from '@shared/cut-string.pipe';

@Component({
  standalone: true,
  selector: "app-lawyer-card-detail",
  imports: [CommonModule, PrimeNgModule, CutStringPipe],
  templateUrl: './laywer-card-detail.component.html',
  styleUrl: './laywer-card-detail.component.css'
})
export class LaywerCardDetailComponent implements OnInit {

  showMore: boolean = true;
  showMoreReview: boolean = true;
  text: string = 'Ver más horarios';
  pricesArry:any= [];
  userAuth: any = {};
  userDb: any = {};
  cutString = "";

  @Input() lawyer!: LawyerDetail;
  
  constructor(private router: Router,
              private universalService: UniversalService) { }
              
  ngOnInit(): void {
    //console.log(this.lawyer);
    this.universalService._universalAuth0().then(user => {
      if (user.userDb || user.userAuth) {
        this.userAuth = user.userAuth;
        this.userDb = user.userDb[0];
      }  
    })
    if (this.lawyer != null && this.lawyer != undefined) {
      this.pricesArry = this.getPrices(this.lawyer.precios)
    }
  }

  showMoreText(showMore: boolean) {
    this.showMore = !showMore
    if(!this.showMore) {
      this.text = 'Ver menos';
    } else {
      this.text = 'Ver más horarios';
    }
  }

  showMoreTextReview(showMoreReview: boolean) {
    this.showMoreReview = !showMoreReview
    if(!this.showMoreReview) {
      this.text = 'Ver menos';
    } else {
      this.text = 'Ver más horarios';
    }
  }

  navToLawyer() {
    new Promise((resolve, reject) => {
      $("body").removeClass("page-loaded");
      setTimeout(() => {
        $("#pageT").addClass("active");
        resolve(true);
      }, 1500);
    }).then(value => { 
      if (value) {
        this.router.navigate(['/appointments/abogado', this.lawyer.idAbogado]);
        //console.log(this.lawyer.idAbogado);
      }
    })
    
  }

  async getPrices(servicesPricesString : string) {
    const servicesPrices: ServicePrice[] = [];
    const services = servicesPricesString.split('###');
    services.forEach(service => {
      const triplet = service.split('##');
      servicesPrices.push({
        "name" : triplet[0].trim(),
        "price" : Number(triplet[1].trim()),
        "serviceId" : Number(triplet[2].trim()) 
      });
    });
    return servicesPrices;
  }

}

