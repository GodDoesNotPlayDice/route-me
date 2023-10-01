import { HttpClientModule } from '@angular/common/http'
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
import { AuthRepository } from 'src/package/authentication/domain/repository/auth-repository'
import { AuthFirebase } from 'src/package/authentication/infrastructure/auth-firebase'
import { PassengerDao } from 'src/package/passenger/domain/dao/passenger-dao'
import { PassengerDaoMemory } from 'src/package/passenger/infrastructure/passenger-dao-memory'
import {
  newUser,
  User
} from 'src/package/user/domain/models/user'
import { UserDao } from 'src/package/user/domain/repository/user-dao'
import { UserDaoFirebase } from 'src/package/user/infrastructure/user-dao-firebase'
import { UserDaoLocalStorage } from 'src/package/user/infrastructure/user-dao-local-storage'
import { environment } from './environments/environment'
import { Storage } from '@ionic/storage-angular'


if ( environment.production ) {
  enableProdMode()
}

export const defaultUsers: User[] = [
  newUser( {
    id: 'abc',
    email: 'hola@gmail.com',
  })
]

bootstrapApplication( AppComponent, {
  providers: [
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    {
      provide: AuthRepository,
      // useFactory: () => {
        // return new AuthMemory(defaultUsers)
      // },
      // useFactory: (storage : Storage) => {
        // return new AuthLocalStorage(storage)
      // },
      // deps      : [Storage]
      useFactory: ( firebase: AngularFireDatabase ) => {
        return new AuthFirebase( firebase )
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
