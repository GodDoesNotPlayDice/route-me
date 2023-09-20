import {Component} from '@angular/core';
import * as mapboxgl from 'mapbox-gl';
import {environment} from "@env/environment.prod";
import {ViewDidEnter} from "@ionic/angular";
import {Geolocation, Position} from '@capacitor/geolocation'

@Component({
  standalone: true,
  selector: 'app-map-box',
  templateUrl: './map-box.component.html',
  styleUrls: ['./map-box.component.scss'],
})
export class MapBoxComponent implements ViewDidEnter{
  mapbox = (mapboxgl as typeof mapboxgl);
  map !: mapboxgl.Map;
  style = `mapbox://styles/mapbox/streets-v11`;
  currentMarker : mapboxgl.Marker | undefined

  position : Position | undefined

  constructor() {
    this.mapbox.accessToken = environment.mapBoxApiKey;
  }

  async ionViewDidEnter() {

    Geolocation.requestPermissions()
    Geolocation.watchPosition( {}, ( position, err ) => {
      console.log( 'new position', position )
      console.log( 'error', err )
      if ( err !== undefined ) return
      if ( !position ) return
      this.position = position
      this.map.panTo({
        lat: this.position.coords.latitude,
        lng: this.position.coords.longitude
      })
      if (this.currentMarker !== undefined){
        this.currentMarker.remove()
      }
      this.currentMarker = new mapboxgl.Marker({color:"black"})
        .setLngLat([
          this.position.coords.longitude,
          this.position.coords.latitude
        ])
        .addTo(this.map);
    } )

    this.map = new mapboxgl.Map({
      container: 'mapa-box',
      style: this.style,
      zoom: 15,
      center: [
        this.position?.coords.latitude ?? -2.4125,
        this.position?.coords.longitude ?? 43.1746
      ]
    });
    this.map.addControl(new mapboxgl.NavigationControl());

    this.map.on('click', (e) => {
      const lngLat = e.lngLat;

      console.log('Clic en coordenadas:', lngLat);

      const marker = new mapboxgl.Marker({color:"red"})
        .setLngLat(lngLat)
        .addTo(this.map);
    });
  }
}
