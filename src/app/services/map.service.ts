import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from './../services/constants.service'

@Injectable({
  providedIn: 'root'
})
export class MapService {

  constructor(private http: HttpClient) { }

  getMapByCity(cityName: string){
    return this.http.get<any>(environment.map_by_city + cityName + '&limit=1&format=json');
  }
}
