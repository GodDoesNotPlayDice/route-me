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
	AngularFireAuth,
	AngularFireAuthModule
} from '@angular/fire/compat/auth'
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
import { AuthUserFirebaseSignin } from 'src/package/authentication/infrastructure/auth-user-firebase-signin'
import { ChatDao } from 'src/package/chat/domain/dao/chat-dao'
import { ChatDaoFirebase } from 'src/package/chat/infrastructure/chat-dao-firebase'
import { CountryDao } from 'src/package/country-api/domain/dao/country-dao'
import { CountryDaoRestCountries } from 'src/package/country-api/infrastructure/rest-countries/country-dao-rest-countries'
import { DirectionRepository } from 'src/package/direction-api/domain/repository/direction-repository'
import { DirectionMapBox } from 'src/package/direction-api/infrastructure/mapbox/direction-map-box'
import { DriverCarDao } from 'src/package/driver-car/domain/dao/driver-car-dao'
import { DriverCarDaoApi } from 'src/package/driver-car/infrastructure/driver-car-dao-api'
import { DriverCarDaoFirebase } from 'src/package/driver-car/infrastructure/driver-car-dao-firebase'
import { DriverDocumentDao } from 'src/package/driver-document/domain/dao/driver-document-dao'
import { DriverDocumentDaoFirebase } from 'src/package/driver-document/infrastructure/driver-document-dao-firebase'
import { DriverDao } from 'src/package/driver/domain/dao/driver-dao'
import { DriverDaoFirebase } from 'src/package/driver/infrastructure/driver-dao-firebase'
import { MapRepository } from 'src/package/map-api/domain/repository/map-repository'
import { MapBox } from 'src/package/map-api/infrastructure/map-box'
import { PassengerDao } from 'src/package/passenger/domain/dao/passenger-dao'
import { PassengerDaoFirebase } from 'src/package/passenger/infrastructure/passenger-dao-firebase'
import { PositionRepository } from 'src/package/position-api/domain/repository/position-repository'
import { Geolocation } from 'src/package/position-api/infrastructure/capacitor/geolocation'
import { StreetRepository } from 'src/package/street-api/domain/repository/street-repository'
import { StreetMapBox } from 'src/package/street-api/infrastructure/map-box/street-map-box'
import { LocationDao } from 'src/package/trip-location/domain/dao/location-dao'
import { LocationDaoFirebase } from 'src/package/trip-location/infrastructure/location-dao-firebase'
import { TripDao } from 'src/package/trip/domain/dao/trip-dao'
import { TripRepository } from 'src/package/trip/domain/repository/trip-repository'
import { TripDaoApi } from 'src/package/trip/infrastructure/trip-dao-api'
import { TripDaoFirebase } from 'src/package/trip/infrastructure/trip-dao-firebase'
import { TripRepositoryApi } from 'src/package/trip/infrastructure/trip-repository-api'
import { UserDao } from 'src/package/user/domain/dao/user-dao'
import { UserDaoFirebase } from 'src/package/user/infrastructure/user-dao-firebase'
import { environment } from './environments/environment'


if ( environment.production ) {
	enableProdMode()
}

bootstrapApplication( AppComponent, {
	providers: [
		{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
		{
			provide   : AuthUserRepository,
			useFactory: ( auth: AngularFireAuth, firebase: AngularFireDatabase ) => {
				return new AuthUserFirebaseSignin( auth, firebase )
			},
			deps      : [ AngularFireAuth, AngularFireDatabase ]
		},
		{
			provide   : DriverDao,
			useFactory: ( firebase: AngularFireDatabase ) => {
				return new DriverDaoFirebase( firebase )
			},
			deps      : [ AngularFireDatabase ]
		},
		{
			provide   : DriverCarDao,
			useFactory: ( firebase: AngularFireDatabase ) => {
				// useFactory: ( http: HttpClient ) => {
				// 	return new DriverCarDaoApi( http )
					return new DriverCarDaoFirebase( firebase )
			},
			// deps      : [ HttpClient ]
			deps      : [ AngularFireDatabase ]
		},
		{
			provide   : DriverDocumentDao,
			useFactory: ( firebase: AngularFireDatabase ) => {
				return new DriverDocumentDaoFirebase( firebase )
			},
			deps      : [ AngularFireDatabase ]
		},
		{
			provide   : UserDao,
			useFactory: ( firebase: AngularFireDatabase ) => {
				return new UserDaoFirebase( firebase )
			},
			deps      : [ AngularFireDatabase ]
		},
		{
			provide   : PassengerDao,
			useFactory: ( firebase: AngularFireDatabase ) => {
				return new PassengerDaoFirebase( firebase )
			},
			deps      : [ AngularFireDatabase ]
		},
		{
			provide   : TripDao,
			// useFactory: ( firebase: AngularFireDatabase ) => {
			// 	return new TripDaoFirebase( firebase )
			// deps      : [ AngularFireDatabase ]
			useFactory: ( http: HttpClient ) => {
				return new TripDaoApi(http)
			},
			deps      : [ HttpClient ]
		},
		{
			provide   : TripRepository,
			useFactory: ( http: HttpClient ) => {
				return new TripRepositoryApi( http )
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
			useFactory: ( firebase: AngularFireDatabase ) => {
				return new LocationDaoFirebase( firebase )
			},
			deps      : [ AngularFireDatabase ]
		},
		{
			provide   : ChatDao,
			useFactory: ( firebase: AngularFireDatabase ) => {
				return new ChatDaoFirebase( firebase )
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
