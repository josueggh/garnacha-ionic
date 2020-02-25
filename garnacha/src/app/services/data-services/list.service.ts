import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BaseDataService } from './base-data.service';
import { BusinessService} from './business.service';
import { FirestoreService,FirestoreQuery } from '../firestore/firestore.service';
import { List } from '../../models/list.model';

@Injectable({
  providedIn: 'root'
})
export class ListService extends BaseDataService<List> {
  ACTIVE_QUERY: any = {field: 'active', operation:'==', key: true};

  constructor(
    private firestore: FirestoreService,
    private businessService : BusinessService,
    ) {
    super('list');
  }

  public getAll(): Observable<List[]> {
    const query :FirestoreQuery= {
      orderBy: {field: 'position' , order:'asc'},
      where: this.ACTIVE_QUERY
    };
    return this.firestore.runQuery<List>(this.baseCollection, query);
  }

  public getDetails(list: List){
    const listData = new Observable( observer => {
      switch(list.type){
        case 'orderby':
          this.businessService
            .getFirstOrderBy({field: list.field, order: list.order})
            .subscribe( businessList => {
              observer.next(businessList);
            })
        break;
        case 'random':
          this.businessService
            .getRandom(list.limit)
            .subscribe( businessList => {
              observer.next(businessList);
            });
        break;
        case 'bylocation':
          this.businessService
            .getByLocation(list.lat, list.lng)
            .subscribe( businessList => {
              observer.next(businessList);
            });
        break;
        case 'tags':
          this.businessService
            .getByTag(list.value, {field: list.field, order: list.order})
            .subscribe( businessList => {
              observer.next(businessList);
            });
        break;
      }
    })
    return listData;
  }
}