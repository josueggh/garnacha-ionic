import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BusinessService } from '../../../services/data-services/business.service';
@Component({
  selector: 'app-business-detail',
  templateUrl: './business-detail.page.html',
  styleUrls: ['./business-detail.page.scss'],
})
export class BusinessDetailPage implements OnInit {
  details;
  constructor(
    private route: ActivatedRoute,
    private busines: BusinessService
    ) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.busines.getDetails(params.path).subscribe( data =>{
        this.details = data[0];
      } )
   });
  }

}
