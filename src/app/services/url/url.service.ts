import { Injectable } from '@angular/core';
import {
  BehaviorSubject,
  Observable
} from 'rxjs'

@Injectable({
  providedIn: 'root'
})
export class UrlService {

  constructor() { }

  private previousUrl = new BehaviorSubject<string>("");
  public previousUrl$: Observable<string> = this.previousUrl.asObservable();

  private currentUrl = new BehaviorSubject<string>("");
  public currentUrl$: Observable<string> = this.currentUrl.asObservable();

  setPreviousUrl(url: string){
    this.previousUrl.next(this.currentUrl.value)
    this.currentUrl.next(url)
  }
}
