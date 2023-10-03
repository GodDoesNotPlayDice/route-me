import {
  HttpClient,
  HttpClientModule
} from '@angular/common/http'
import {
  enableProdMode,
  importProvidersFrom
} from '@angular/core'
import { AngularFireModule } from '@angular/fire/compat'
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
import { AuthPassengerRepository } from 'src/package/authentication/domain/repository/auth-passenger-repository'
import { AuthUserRepository } from 'src/package/authentication/domain/repository/auth-user-repository'
import { AuthPassengerFirebase } from 'src/package/authentication/infrastructure/passenger/auth-passenger-firebase'
import { AuthUserFirebase } from 'src/package/authentication/infrastructure/user/auth-user-firebase'
import { PassengerDao } from 'src/package/passenger/domain/dao/passenger-dao'
import {
  newPassenger,
  Passenger
} from 'src/package/passenger/domain/models/passenger'
import { PassengerDaoMemory } from 'src/package/passenger/infrastructure/passenger-dao-memory'
import { newPreferenceID } from 'src/package/preference/domain/models/preference-id'
import { newGender } from 'src/package/shared/domain/models/gender'
import { TripDao } from 'src/package/trip/domain/dao/trip-dao'
import { TripDaoApi } from 'src/package/trip/infrastructure/trip-dao-api'
import {
  newUser,
  User
} from 'src/package/user/domain/models/user'
import { newUserID } from 'src/package/user/domain/models/user-id'
import { UserDao } from 'src/package/user/domain/repository/user-dao'
import { UserDaoFirebase } from 'src/package/user/infrastructure/user-dao-firebase'
import { environment } from './environments/environment'


if ( environment.production ) {
  enableProdMode()
}

export const defaultUsers: User[] = [
  newUser( {
    id: 'abc',
    email: 'hola@gmail.com',
  })
]

export const defaultPassangers: Passenger[] = [
  newPassenger({
    id: 'abc',
    userID: newUserID({
      value: 'abc'
    }),
    name: 'hola',
    lastName: 'last',
    description: 'descdescdescdesc',
    phone: '123456788',
    birthDay: new Date( '1990-03-25' ),
    country: 'Argentina',
    gender: newGender({
      value: 'Female'
    }),
    preferences: [
      newPreferenceID({
        value: 'a1'
      })
    ]
  })
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
      provide: AuthPassengerRepository,
      useFactory: ( firebase: AngularFireDatabase ) => {
        return new AuthPassengerFirebase( firebase )
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
      provide: TripDao,
      useFactory: ( http: HttpClient ) => {
        return new TripDaoApi( http)
      },
      deps      : [ HttpClient ]
    },
    {
      provide: PassengerDao,
      useFactory: () => {
        return new PassengerDaoMemory([])
      },
      deps      : []
    },
    importProvidersFrom(
      [ IonicModule.forRoot( {} ),
        FormsModule,
        ReactiveFormsModule,
        HttpClientModule,
        BrowserAnimationsModule,
        StoreModule.forRoot( ROOT_REDUCERS ),
        AngularFireModule.initializeApp( environment.firebaseConfig ),
        AngularFireDatabaseModule,
        AngularFirestoreModule,
        AngularFireStorageModule,
        IonicStorageModule.forRoot()
      ]
    ),
    provideRouter( routes )
  ]
} )
