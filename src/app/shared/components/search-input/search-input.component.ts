import { CommonModule } from '@angular/common'
import {
  Component,
  ElementRef,
  ViewChild
} from '@angular/core'
import { ReactiveFormsModule } from '@angular/forms'
import { IonicModule } from '@ionic/angular'
import {
  BehaviorSubject,
  Observable
} from 'rxjs'
import { AutoFocoDirective } from 'src/app/shared/directives/auto-foco.directive'

@Component( {
  standalone : true,
  selector   : 'app-search-input',
  templateUrl: './search-input.component.html',
  styleUrls  : [ './search-input.component.scss' ],
  imports    : [
    IonicModule,
    CommonModule,
    ReactiveFormsModule,
    AutoFocoDirective
  ]
} )
export class SearchInputComponent {

  constructor() { }

  @ViewChild( 'search' ) inputSearch!: ElementRef<HTMLInputElement>

  private searchText = new BehaviorSubject<string>( '' )

  public searchText$: Observable<string> = this.searchText.asObservable()

  onInput( $event: Event ): void {
    console.log( 'send' )
    this.searchText.next( this.inputSearch.nativeElement.value )
  }
}
