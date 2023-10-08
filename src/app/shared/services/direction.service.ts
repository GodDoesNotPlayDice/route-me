import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { environment } from '@env/environment'

@Injectable( {
  providedIn: 'root'
} )
export class DirectionService {

  constructor( private http: HttpClient ) { }

  async getDirection(inicio: { lng: number, lat: number },
    final: { lng: number, lat: number }) {
    const start = `${inicio.lng},${inicio.lat}`
    const end = `${final.lng},${final.lat}`
    return await this.http.get(
      `https://api.mapbox.com/directions/v5/mapbox/driving/${start};${end}?alternatives=true&geometries=geojson&overview=simplified&steps=false&access_token=${environment.mapBoxApiKey}` ).toPromise()
  }
}
