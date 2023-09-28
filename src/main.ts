import { HttpClientModule } from '@angular/common/http'
import {
  enableProdMode,
  importProvidersFrom
} from '@angular/core'
import { AngularFireModule } from '@angular/fire/compat'
import {
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
import { AuthService } from 'src/app/shared/services/auth.service'
import { ROOT_REDUCERS } from 'src/app/shared/state/app.state'
import {
  AuthMemory,
  AuthRepository,
  LoginUser,
  RegisterUser
} from 'src/package/authentication'
import {
  GetAllUsers,
  newUser,
  User,
  UserDao,
  UserDaoLocalStorage
} from 'src/package/user'
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
      useFactory: () => {
      // useFactory: (storage : Storage) => {
      // useFactory: ( firebase: AngularFireDatabase ) => {
        return new AuthMemory(defaultUsers)
        // return new AuthFirebase( firebase )
        // return new AuthLocalStorage(storage)
      },
      // deps      : [ AngularFireDatabase ]
      // deps      : [Storage]
    },
    {
      provide: UserDao,
      useFactory: (storage : Storage) => {
        return new UserDaoLocalStorage(storage)
      },
      deps      : [Storage]
    },
    {
      provide   : GetAllUsers,
      useFactory: ( authDao: UserDao ) => {
        return new GetAllUsers( authDao )
      },
      deps      : [ UserDao ]
    },
    {
      provide   : LoginUser,
      useFactory: ( authRepository: AuthRepository ) => {
        return new LoginUser( authRepository )
      },
      deps      : [ AuthRepository ]
    },
    {
      provide   : RegisterUser,
      useFactory: ( authRepository: AuthRepository ) => {
        return new RegisterUser( authRepository )
      },
      deps      : [ AuthRepository ]
    },
    {
      provide   : AuthService,
      useFactory: (
        registerUser: RegisterUser,
        loginUser: LoginUser
      ) => {
        return new AuthService(
          loginUser,
          registerUser
        )
      },
      deps      : [ RegisterUser, LoginUser ]
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
