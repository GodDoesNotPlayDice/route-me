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
import { AuthService } from 'src/app/services/auth.service'
import { ROOT_REDUCERS } from 'src/app/state/app.state'
import {
  AuthDAO,
  AuthDaoLocalStorage,
  AuthFirebase,
  AuthLocalStorage,
  AuthMemory,
  GetAllUsers
} from 'src/package/user'
import { LoginUser } from 'src/package/user/application/LoginUser'
import { RegisterUser } from 'src/package/user/application/RegisterUser'
import { AuthRepository } from 'src/package/user/domain/repository/AuthRepository'
import { environment } from './environments/environment'
import { Storage } from '@ionic/storage-angular'


if ( environment.production ) {
  enableProdMode()
}

bootstrapApplication( AppComponent, {
  providers: [
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    {
      provide: AuthRepository,
      useFactory: () => {
      // useFactory: (storage : Storage) => {
      // useFactory: ( firebase: AngularFireDatabase ) => {
        return new AuthMemory()
        // return new AuthFirebase( firebase )
        // return new AuthLocalStorage(storage)
      },
      // deps      : [ AngularFireDatabase ]
      // deps      : [Storage]
    },
    {
      provide: AuthDAO,
      useFactory: (storage : Storage) => {
        return new AuthDaoLocalStorage(storage)
      },
      deps      : [Storage]
    },
    {
      provide   : GetAllUsers,
      useFactory: ( authDao: AuthDAO ) => {
        return new GetAllUsers( authDao )
      },
      deps      : [ AuthDAO ]
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
