import { Component, OnInit, Input } from '@angular/core';
import { List } from '../../../models/list.model';
import { Business } from '../../../models/business.model';
import { ListService} from '../../../services/data-services/list.service';
import { Platform } from '@ionic/angular';

@Component({
  selector: 'garnacha-list',
  templateUrl: './list.component.html',
  styleUrls: [
    './style/list.component.scss',
    './style/shell.scss'
  ],
})
export class ListComponent implements OnInit {
  @Input() list: List;
  public items;
  public slidesOpts;
  constructor(
    private listService : ListService,
    private platform: Platform
    ) {
    
    let  slides = 2.1;
    
    if(platform.is('desktop')){
      slides = 4;
    }else if(platform.is('ipad')){
      slides = 2.3;
    }


    this.slidesOpts = {
      slidesPerView: slides,
      pagination: {
        el: '.swiper-pagination',
        type: 'custom',
        renderCustom: (swiper, current, total) => {
            return this.customProgressBar(current, total);
        }
      }
    };
  }

  private customProgressBar(current: number, total: number): string {
    const ratio: number = current / total;

    const progressBarStyle: string = 'style=\'transform: translate3d(0px, 0px, 0px) scaleX(' + ratio + ') scaleY(1); transition-duration: 200ms;\'';
    const progressBar: string = '<span class=\'swiper-pagination-progressbar-fill\' ' + progressBarStyle + '></span>';

    let progressBarContainer: string = '<div class=\'swiper-pagination-progressbar\' style=\'height: 1px; top: 9px; width: 60%;margin:0 20%;\'>';
    progressBarContainer += progressBar;
    progressBarContainer += '</span></div>';

    return progressBarContainer;
  }

  getCategoryIcon(item: Business){
    if(item.categories && item.categories.length){
      return '/assets/icon/categories/'+item.categories[0].toLowerCase()+'.svg';
    }
  }

  getMainPhoto(item: Business){
    if(item.photos && item.photos.length){
      return item.photos[0];
    }
    return '/assets/imgs/default.jpg'
  }

  getPhotos(item){
    if(item.photos.length < 5){
      return item.photos;
    }else{
      return item.photos.slice(0, 5)
    }
  }

  ngOnInit() {
    this.listService.getDetails(this.list).subscribe( data => {
      this.items = data;
      //console.log(this.items);
    });
  }

}
