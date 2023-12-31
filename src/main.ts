import { registerLocaleData } from '@angular/common'
import {
	HttpClient,
	HttpClientModule
} from '@angular/common/http'
import localeEs from '@angular/common/locales/es'
import {
	enableProdMode,
	importProvidersFrom,
	LOCALE_ID
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
import {
	AngularFireStorage,
	AngularFireStorageModule
} from '@angular/fire/compat/storage'
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
import { environment } from '@env/environment'
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
import { CurrencyDao } from 'src/package/currency-api/domain/dao/currency-dao'
import { CurrencyDaoCurrencyExchange } from 'src/package/currency-api/infrastructure/currency-exchange/currency-dao-currency-exchange'
import { DirectionRepository } from 'src/package/direction-api/domain/repository/direction-repository'
import { DirectionMapBox } from 'src/package/direction-api/infrastructure/mapbox/direction-map-box'
import { DriverCarDao } from 'src/package/driver-car/domain/dao/driver-car-dao'
import { DriverCarDaoFirebase } from 'src/package/driver-car/infrastructure/driver-car-dao-firebase'
import { DriverDocumentDao } from 'src/package/driver-document/domain/dao/driver-document-dao'
import { DriverDocumentDaoFirebase } from 'src/package/driver-document/infrastructure/driver-document-dao-firebase'
import { DriverDao } from 'src/package/driver/domain/dao/driver-dao'
import { DriverDaoFirebase } from 'src/package/driver/infrastructure/driver-dao-firebase'
import { ImageUploadRepository } from 'src/package/image-upload-api/domain/repository/image-upload-repository'
import { ImageUploadFirestorage } from 'src/package/image-upload-api/infrastructure/image-upload-firestorage'
import { IpDao } from 'src/package/ip-api/domain/dao/ip-dao'
import { IpDaoIpApi } from 'src/package/ip-api/infrastructure/ipapi/ip-dao-ip-api'
import { MapRepository } from 'src/package/map-api/domain/repository/map-repository'
import { MapBox } from 'src/package/map-api/infrastructure/map-box'
import { NearTripRepository } from 'src/package/near-trip/domain/repository/near-trip-repository'
import { NearTripRepositoryFirebase } from 'src/package/near-trip/infrastructure/near-trip-repository-firebase'
import { PassengerTripDao } from 'src/package/passenger-trip/domain/dao/passenger-trip-dao'
import { PassengerTripDaoFirebase } from 'src/package/passenger-trip/infrastructure/passenger-trip-dao-firebase'
import { PassengerDao } from 'src/package/passenger/domain/dao/passenger-dao'
import { PassengerDaoFirebase } from 'src/package/passenger/infrastructure/passenger-dao-firebase'
import { PositionRepository } from 'src/package/position-api/domain/repository/position-repository'
import { Geolocation } from 'src/package/position-api/infrastructure/capacitor/geolocation'
import { PreferenceDao } from 'src/package/preference/domain/dao/preference-dao'
import { PreferenceDaoFirebase } from 'src/package/preference/infrastructure/preference-dao-firebase'
import { RatingDao } from 'src/package/rating/domain/dao/rating-dao'
import { RatingDaoFirebase } from 'src/package/rating/infrastructure/rating-dao-firebase'
import { ReportDao } from 'src/package/report/domain/dao/report-dao'
import { ReportDaoFirebase } from 'src/package/report/infrastructure/report-dao-firebase'
import { StreetRepository } from 'src/package/street-api/domain/repository/street-repository'
import { StreetMapBox } from 'src/package/street-api/infrastructure/map-box/street-map-box'
import { TripHistoryDao } from 'src/package/trip-history/domain/dao/trip-history-dao'
import { TripHistoryDaoFirebase } from 'src/package/trip-history/infrastructure/trip-history-dao-firebase'
import { TripInProgressDao } from 'src/package/trip-in-progress/domain/dao/trip-in-progress-dao'
import { TripInProgressDaoFirebase } from 'src/package/trip-in-progress/infrastructure/trip-in-progress-dao-firebase'
import { LocationDao } from 'src/package/trip-location/domain/dao/location-dao'
import { LocationDaoFirebase } from 'src/package/trip-location/infrastructure/location-dao-firebase'
import { TripDao } from 'src/package/trip/domain/dao/trip-dao'
import { TripRepository } from 'src/package/trip/domain/repository/trip-repository'
import { TripDaoFirebase } from 'src/package/trip/infrastructure/trip-dao-firebase'
import { TripRepositoryApi } from 'src/package/trip/infrastructure/trip-repository-api'
import { UserDao } from 'src/package/user/domain/dao/user-dao'
import { UserDaoFirebase } from 'src/package/user/infrastructure/user-dao-firebase'

if ( environment.production ) {
	enableProdMode()
}
registerLocaleData( localeEs, 'es' )

bootstrapApplication( AppComponent, {
	providers: [
		{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
		{ provide: LOCALE_ID, useValue: 'es' },
		// {
		// 	provide   : 'Supabase',
		// 	useFactory: () => {
		// 		return createClient( environment.supabaseUrl, environment.supabaseKey )
		//
		// 	}
		// },
		{
			provide   : AuthUserRepository,
			useFactory: ( auth: AngularFireAuth, firebase: AngularFireDatabase ) => {
				return new AuthUserFirebaseSignin( auth, firebase )
			},
			deps      : [ AngularFireAuth, AngularFireDatabase ]
		},
		{
			provide   : TripInProgressDao,
			useFactory: ( firebase: AngularFireDatabase ) => {
				return new TripInProgressDaoFirebase( firebase )
			},
			deps      : [ AngularFireDatabase ]
		},
		{
			provide   : PassengerTripDao,
			useFactory: ( firebase: AngularFireDatabase ) => {
				return new PassengerTripDaoFirebase( firebase )
			},
			deps      : [ AngularFireDatabase ]
		},
		{
			provide   : NearTripRepository,
			useFactory: ( firebase: AngularFireDatabase ) => {
				return new NearTripRepositoryFirebase( firebase )
			},
			deps      : [ AngularFireDatabase ]
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
				return new DriverCarDaoFirebase( firebase )
			},
			deps      : [ AngularFireDatabase ]
		},
		{
			provide   : PreferenceDao,
			useFactory: ( firebase: AngularFireDatabase ) => {
				return new PreferenceDaoFirebase( firebase )
			},
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
			provide   : ReportDao,
			useFactory: ( firebase: AngularFireDatabase ) => {
				return new ReportDaoFirebase( firebase )
			},
			deps      : [ AngularFireDatabase ]
		},
		{
			provide   : RatingDao,
			useFactory: ( firebase: AngularFireDatabase ) => {
				return new RatingDaoFirebase( firebase )
			},
			deps      : [ AngularFireDatabase ]
		},
		{
			provide   : TripDao,
			useFactory: ( firebase: AngularFireDatabase ) => {
				return new TripDaoFirebase( firebase )
			},
			deps      : [ AngularFireDatabase ]
		},
		{
			provide   : TripHistoryDao,
			useFactory: ( firebase: AngularFireDatabase ) => {
				return new TripHistoryDaoFirebase( firebase )
			},
			deps      : [ AngularFireDatabase ]
		},
		{
			provide   : TripRepository,
			useFactory: ( http: HttpClient ) => {
				return new TripRepositoryApi( http )
			},
			deps      : [ HttpClient ]
		},
		{
			provide   : ImageUploadRepository,
			useFactory: ( fireStorage: AngularFireStorage ) => {
				return new ImageUploadFirestorage( fireStorage )
			},
			deps      : [ AngularFireStorage ]
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
			provide   : IpDao,
			useFactory: ( http: HttpClient ) => {
				return new IpDaoIpApi( http )
			},
			deps      : [ HttpClient ]
		},
		{
			provide   : CurrencyDao,
			useFactory: ( http: HttpClient ) => {
				return new CurrencyDaoCurrencyExchange( http )
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
		importProvidersFrom( [
				IonicModule.forRoot( {} ),
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
