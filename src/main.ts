import {
  HttpClient,
  HttpClientModule
} from '@angular/common/http'
import {
  enableProdMode,
  importProvidersFrom
} from '@angular/core'
import { AngularFireModule } from '@angular/fire/compat'
import { AngularFireAuthModule } from '@angular/fire/compat/auth'
import {
  AngularFireDatabase,
  AngularFireDatabaseModule
} from '@angular/fire/compat/database'
import { AngularFirestoreModule } from '@angular/fire/compat/firestore'
import { AngularFireStorageModule } from '@angular/fire/compat/storage'
import {
  FormsModule,
  ReactiveFormsModule
} from '@angular/forms'
import { bootstrapApplication } from '@angular/platform-browser'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import {
  provideRouter,
  RouteReuseStrategy
} from '@angular/router'
import {
  IonicModule,
  IonicRouteStrategy
} from '@ionic/angular'
import { IonicStorageModule } from '@ionic/storage-angular'
import { StoreModule } from '@ngrx/store'
import { AppComponent } from 'src/app/app.component'
import { routes } from 'src/app/app.routes'
import { ROOT_REDUCERS } from 'src/app/shared/state/app.state'
import { AuthUserRepository } from 'src/package/authentication/domain/repository/auth-user-repository'
import { AuthUserFirebase } from 'src/package/authentication/infrastructure/auth-user-firebase'
import { ChatDao } from 'src/package/chat/domain/dao/chat-dao'
import { ChatDaoApi } from 'src/package/chat/infrastructure/chat-dao-api'
import { CountryDao } from 'src/package/country-api/domain/dao/country-dao'
import { CountryDaoRestCountries } from 'src/package/country-api/infrastructure/rest-countries/country-dao-rest-countries'
import { DirectionRepository } from 'src/package/direction-api/domain/repository/direction-repository'
import { DirectionMapBox } from 'src/package/direction-api/infrastructure/mapbox/direction-map-box'
import { LocationDao } from 'src/package/location/domain/dao/location-dao'
import { LocationDaoApi } from 'src/package/location/infrastructure/location-dao-api'
import { MapRepository } from 'src/package/map-api/domain/repository/map-repository'
import { MapBox } from 'src/package/map-api/infrastructure/map-box'
import { PassengerDao } from 'src/package/passenger/domain/dao/passenger-dao'
import { Passenger } from 'src/package/passenger/domain/models/passenger'
import { PassengerDaoFirebase } from 'src/package/passenger/infrastructure/passenger-dao-firebase'
import { PositionRepository } from 'src/package/position-api/domain/repository/position-repository'
import { Geolocation } from 'src/package/position-api/infrastructure/capacitor/geolocation'
import { GenderEnum } from 'src/package/shared/domain/models/gender'
import { StreetRepository } from 'src/package/street-api/domain/repository/street-repository'
import { StreetMapBox } from 'src/package/street-api/infrastructure/map-box/street-map-box'
import { TripDao } from 'src/package/trip/domain/dao/trip-dao'
import { TripDaoApi } from 'src/package/trip/infrastructure/trip-dao-api'
import { UserDao } from 'src/package/user/domain/dao/user-dao'
import { UserDaoFirebase } from 'src/package/user/infrastructure/user-dao-firebase'
import { environment } from './environments/environment'


if ( environment.production ) {
  enableProdMode()
}

export const defaultPassangers: Passenger[] = [
  {
    id         : {
      value: 'abc'
    },
    userID     : {
      value: 'abc'
    } ,
    name       : {
      value: 'hola'
    },
    lastName   : {
      value: 'last'
    },
    description: {
      value: 'descdescdescdesc'
    },
    phone      : {
      value: '123456788'
    },
    birthDay   : {
      value: new Date( '1990-03-25' )
    },
    country    : {
      value: 'Argentina'
    },
    gender     : GenderEnum.Male,
    preferences: [{
        value: 'a1'
      }
    ]
  }
]

bootstrapApplication( AppComponent, {
  providers: [
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    {
      provide: AuthUserRepository,
      // useFactory: () => {
      // return new AuthMemory(defaultUsers)
      // },
      // useFactory: (storage : Storage) => {
      // return new AuthLocalStorage(storage)
      // },
      // deps      : [Storage]
      useFactory: ( firebase: AngularFireDatabase ) => {
        return new AuthUserFirebase( firebase )
      },
      deps      : [ AngularFireDatabase ]
    },
    {
      provide: UserDao,
      // useFactory: (storage : Storage) => {
      //   return new UserDaoLocalStorage(storage)
      // },
      // deps      : [Storage]
      useFactory: ( firebase: AngularFireDatabase ) => {
        return new UserDaoFirebase( firebase )
      },
      deps      : [ AngularFireDatabase ]
    },
    {
      provide   : TripDao,
      useFactory: ( http: HttpClient ) => {
        return new TripDaoApi( http )
      },
      deps      : [ HttpClient ]
    },
    {
      provide   : CountryDao,
      useFactory: ( http: HttpClient ) => {
        return new CountryDaoRestCountries( http )
      },
      deps      : [ HttpClient ]
    },
    {
      provide   : LocationDao,
      useFactory: ( http: HttpClient ) => {
        return new LocationDaoApi( http )
      },
      deps      : [ HttpClient ]
    },
    {
      provide   : ChatDao,
      useFactory: ( http: HttpClient ) => {
        return new ChatDaoApi( http )
      },
      deps      : [ HttpClient ]
    },
    {
      provide   : PassengerDao,
      useFactory: ( firebase: AngularFireDatabase ) => {
        return new PassengerDaoFirebase( firebase )
      },
      deps      : [ AngularFireDatabase ]
    },
    {
      provide   : PositionRepository,
      useFactory: () => {
        return new Geolocation()
      },
      deps      : []
    },
    {
      provide   : MapRepository,
      useFactory: () => {
        return new MapBox()
      },
      deps      : []
    },
    {
      provide   : DirectionRepository,
      useFactory: ( http: HttpClient ) => {
        return new DirectionMapBox( http )
      },
      deps      : [ HttpClient ]
    },
    {
      provide   : StreetRepository,
      useFactory: ( http: HttpClient ) => {
        return new StreetMapBox( http )
      },
      deps      : [ HttpClient ]
    },
    importProvidersFrom(
      [ IonicModule.forRoot( {} ),
        FormsModule,
        ReactiveFormsModule,
        HttpClientModule,
        BrowserAnimationsModule,
        StoreModule.forRoot( ROOT_REDUCERS ),
        AngularFireModule.initializeApp( environment.firebaseConfig ),
        AngularFireAuthModule,
        AngularFireDatabaseModule,
        AngularFirestoreModule,
        AngularFireStorageModule,
        IonicStorageModule.forRoot()
      ]
    ),
    provideRouter( routes )
  ]
} )
