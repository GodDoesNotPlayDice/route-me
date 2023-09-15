import { HttpClientModule } from '@angular/common/http'
import {
  enableProdMode,
  importProvidersFrom
} from '@angular/core'
import {
  FormsModule,
  ReactiveFormsModule
} from '@angular/forms'
import { bootstrapApplication } from '@angular/platform-browser'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import {
  RouteReuseStrategy,
  provideRouter
} from '@angular/router'
import {
  IonicModule,
  IonicRouteStrategy
} from '@ionic/angular'
import { StoreModule } from '@ngrx/store'
import { AppComponent } from 'src/app/app.component'
import { routes } from 'src/app/app.routes'
import { AuthService } from 'src/app/services/auth/auth.service'
import { ROOT_REDUCERS } from 'src/app/state/app.state'
import { LoginUser } from 'src/package/user/application/LoginUser'
import { RegisterUser } from 'src/package/user/application/RegisterUser'
import { AuthRepository } from 'src/package/user/domain/repository/AuthRepository'
import { AuthDataMemory } from 'src/package/user/infrastructure/AuthDataMemory'
import { environment } from './environments/environment'

if ( environment.production ) {
  enableProdMode()
}

bootstrapApplication( AppComponent, {
  providers: [
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    {
      provide   : AuthRepository,
      useFactory: () => {
        return new AuthDataMemory()
      },
      deps      : []
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
        StoreModule.forRoot( ROOT_REDUCERS )
      ]
    ),
    provideRouter( routes )
  ]
} )
