import { Injectable } from '@angular/core';
import { FirestoreService,FirestoreQuery } from '../firestore/firestore.service';
import { Business } from '../../models/business.model';
import { Observable } from 'rxjs';
import { BaseDataService } from './base-data.service';
import * as geofirex from 'geofirex';
import * as firebase from 'firebase/app';


@Injectable({
  providedIn: 'root'
})
export class BusinessService extends BaseDataService <Business>{
  //ACTIVE_QUERY: any = {field: 'active', operation:'==', key: 1};
  ACTIVE_QUERY: any = null;
  geo = geofirex.init(firebase);

  constructor(private firestore: FirestoreService) {
    super('business');
  }

  private __randomArray(arr: Array<any>, n: number) {
    const result = new Array(n);
    let len = arr.length;
    const taken = new Array(len);

    if (n > len) {
        throw new RangeError('getRandom: more elements taken than available');
    }

    while (n--) {
        const random_value = Math.floor(Math.random() * len);
        result[n] = arr[random_value in taken ? taken[random_value] : random_value];
        taken[random_value] = --len in taken ? taken[len] : len;
    }
    return result;
  }

  public getAll(): Observable<Business[]> {
    const query :FirestoreQuery= {
      where : this.ACTIVE_QUERY
    };
    return this.firestore.runQuery<Business>(this.baseCollection, query);
  }

  public getFirstOrderBy(orderBy: any, limit:number =20): Observable<Business[]> {
    const query :FirestoreQuery = {
      orderBy,
      limit,
      where : this.ACTIVE_QUERY
    };
    return this.firestore.runQuery<Business>(this.baseCollection, query);
  }

  public getRandom(limit:number = 20){
    const randomObserver = new Observable( observer => {
      this.getAll().subscribe( data => {
        observer.next(this.__randomArray(data, limit));
      });
    })
    return randomObserver;
  }

  public getByTag(tag: string, orderBy: any, limit:number = 25){
    const query :FirestoreQuery = {
      orderBy,
      where : { field :'tags', operation:'array-contains', key: tag},
      limit,
    };
    return this.firestore.runQuery<Business>(this.baseCollection, query);
  }

  public getByLocation(lat: number, lng: number , kilometers = 3){
    const byLocation = new Observable( observer => {
      const collection = this.geo.collection(this.baseCollection);
      const center = this.geo.point(lat, lng);
      collection.within(center, kilometers, 'geo').subscribe( response => {
        observer.next(response);
      });
    });
    return byLocation;
  }

  public getDetails(slug: string){
    const query :FirestoreQuery = {
      where : { field :'slug', operation:'==', key: slug},
      limit : 1,
    };
    return this.firestore.runQuery<Business>(this.baseCollection, query);
  }
  
 
}
