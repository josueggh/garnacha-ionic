import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TimeService {

  constructor() { }

  schedule(business, lang: string = 'es') {
    if (!business) {
      return false;
    }
    const [lng, ...[] ] = lang.split('-');

    function checkTime(t) {
      if(!t || t === '-') {
        return lng === 'en' ? 'Close' : 'Cerrado';
      }
      return t;
    }

    let daysName = null;

    if (lng.includes('es')) {
      daysName = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo'];
    } else {
      daysName = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
    }

    const days = [
      business.monday,
      business.tuesday,
      business.wednesday,
      business.thursday,
      business.friday,
      business.saturday,
      business.sunday
    ];

    const groups = [];
    let init = 0, last = 0;
    for (let i = 0 ; i < days.length; i++){
      if (days[ i + 1 ] && days[i] === days[ i + 1 ]) {
        last = i;
      } else {
        last = i;
        groups.push({ init , last, time : checkTime(days[i])});
        init = i + 1;
        last = i + 1;
      }
    }

    const daysWeek =  groups.map( day => {

      if (day.init === day.last ) {
        return `${daysName[day.last]} : ${day.time}`;
      } else {
        return `${daysName[day.init]} - ${daysName[day.last]} : ${day.time}`;
      }

    });

    return daysWeek;

  }

  isOpen(business) {
    if (!business) {
      return false;
    }

    const today = new Date();
    const day = today.getDay();
    const days = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'];

    if (days[day] && business[days[day]]) {
      const [startTime, endTime] = business[days[day]].split('-');
      const currentDate = new Date();

      const startDate = new Date(currentDate.getTime());
      startDate.setHours(startTime.split(':')[0]);
      startDate.setMinutes(startTime.split(':')[1]);

      const endDate = new Date(currentDate.getTime());
      if (endTime) {
        if ( +endTime.split(':')[0]  < 9) {
          endDate.setDate(endDate.getDate() + 1);
        }
        endDate.setHours(endTime.split(':')[0]);
        endDate.setMinutes(endTime.split(':')[1]);
      }

      if (startDate < currentDate && endDate > currentDate) {
        return 'open';
      }
    }
    return 'closed';
  }
}
