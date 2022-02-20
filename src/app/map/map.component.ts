import { AfterViewChecked, AfterViewInit, Component, OnInit } from '@angular/core';
import '../../../node_modules/leaflet/dist/leaflet.css';
import * as L from 'leaflet';
import { Icon } from 'leaflet';
import "leaflet/dist/images/marker-shadow.png";
import { MapService } from '../services/map.service';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {

  cities: any = [
    { id: 0, title: '' },
    { id: 1, title: 'New York' },
    { id: 2, title: 'Los Angeles' },
    { id: 3, title: 'San Francisco' },
    { id: 4, title: 'Las Vegas' },
    { id: 5, title: 'Austin' },
  ]

  map: any;
  latLong: any = [42.698334, 23.319941];
  currentCity: string = 'Choose a City';
  currentMarker: any;

  constructor(private data: MapService) { }

  ngOnInit() {
    this.map = L.map('map').setView(this.latLong, 7);
    this.getMap('Sofia');
  }

  getMap(currentCity: string) {
    this.map.setView(this.latLong);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }, { icon: Icon }).addTo(this.map);

    this.currentMarker = L.marker(this.latLong).addTo(this.map)
      .bindPopup(currentCity)
      .openPopup();
  }

  onGetMapByCity(cityName: string) {

    this.data.getMapByCity(cityName).subscribe(
      data => {
        console.log('data from nominatim', data[0].lat, data[0].lon)

        this.currentCity = cityName;
        this.latLong = [data[0].lat, data[0].lon];
        this.map.removeLayer(this.currentMarker);

        this.getMap(this.currentCity);
      },
      error => {
        alert("We have a problem with the server, please be patient!");
      }
    )

  }

}
