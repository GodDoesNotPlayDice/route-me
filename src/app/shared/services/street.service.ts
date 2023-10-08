import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core';
import { environment } from '@env/environment.prod'

@Injectable({
  providedIn: 'root'
})
export class StreetService {

  constructor(private http: HttpClient) { }

  async getStreet(searchTerm : string, center : {lat: number, lng: number}) {
    // return await this.http.get( `https://api.mapbox.com/geocoding/v5/mapbox.places/${lng},${lat}.json?access_token=pk.eyJ1IjoibWFyaW9uYXJpY2FkbyIsImEiOiJja3B1d2Z2Z2YwMzJzMnBvM2R3b3Z4cWJ4In0.2qRn0h9b7y0Z9e0z8hZrCQ`).toPromise()
    return await this.http.get( `https://api.mapbox.com/geocoding/v5/mapbox.places/${searchTerm}.json?proximity=${center.lng},${center.lat}&access_token=${environment.mapBoxApiKey}`).toPromise()
  }
}
