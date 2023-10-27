import {
	ComponentFixture,
	TestBed,
	waitForAsync
} from '@angular/core/testing'
import { IonicModule } from '@ionic/angular'

import { InputTextComponent } from 'src/app/shared/components/input-text/input-text.component'

describe( 'InputTextComponent', () => {
	let component: InputTextComponent
	let fixture: ComponentFixture<InputTextComponent>

	beforeEach( waitForAsync( () => {
		TestBed.configureTestingModule( {
			declarations: [ InputTextComponent ],
			imports     : [ IonicModule.forRoot() ]
		} )
		       .compileComponents()

		fixture   = TestBed.createComponent( InputTextComponent )
		component = fixture.componentInstance
		fixture.detectChanges()
	} ) )

	it( 'should create', () => {
		expect( component )
			.toBeTruthy()
	} )

	describe( 'Verify Type Text', () => {
		it( 'should pass with correct text input', () => {
			component.textControl.patchValue( 'hola' )
			component.textControl.updateValueAndValidity()

			expect( component.textControl.valid )
				.toBeTruthy()
		} )

		it( 'should error with empty text input', () => {
			component.textControl.patchValue( '' )
			component.textControl.updateValueAndValidity()

			expect( component.textControl.hasError( 'required' ) )
				.toBeTruthy()
		} )
	} )
	describe( 'Verify Type Email', () => {
		it( 'should pass with correct email input', () => {
			component.type = 'email'

			component.textControl.patchValue( 'hola@gmail.com' )
			component.textControl.updateValueAndValidity()

			expect( component.textControl.valid )
				.toBeTruthy()
		} )

		it( 'should error with invalid email input', () => {
			component.type = 'email'

			component.textControl.patchValue( '' )
			component.textControl.updateValueAndValidity()

			expect( component.textControl.hasError( 'email' ) )
				.toBeTruthy()
		} )
	} )
	describe( 'Verify Type Password', () => {
		it( 'should pass with correct password input', () => {
			component.type = 'password'

			component.textControl.patchValue( '12345678' )
			component.textControl.updateValueAndValidity()

			expect( component.textControl.valid )
				.toBeTruthy()
		} )

		it( 'should error with invalid password input', () => {
			component.type = 'password'

			component.textControl.patchValue( '1' )
			component.textControl.updateValueAndValidity()

			expect( component.textControl.hasError( 'minlength' ) )
				.toBeTruthy()
		} )
	} )
	describe( 'Verify Type Phone', () => {
		it( 'should pass with correct phone input', () => {
			component.type = 'phone'

			component.textControl.patchValue( '12345678' )
			component.textControl.updateValueAndValidity()

			expect( component.textControl.valid )
				.toBeTruthy()
		} )

		it( 'should error with required invalid phone input', () => {
			component.type = 'phone'

			component.textControl.patchValue( '' )
			component.textControl.updateValueAndValidity()

			expect( component.textControl.hasError( 'required' ) )
				.toBeTruthy()
		} )

		it( 'should error with min length invalid phone input', () => {
			component.type = 'phone'

			component.textControl.patchValue( '1' )
			component.textControl.updateValueAndValidity()

			expect( component.textControl.hasError( 'minlength' ) )
				.toBeTruthy()
		} )

		it( 'should error with max length invalid phone input', () => {
			component.type = 'phone'

			component.textControl.patchValue( '111122223333' )
			component.textControl.updateValueAndValidity()

			expect( component.textControl.hasError( 'maxlength' ) )
				.toBeTruthy()
		} )

		it( 'should error with caracters invalid phone input', () => {
			component.type = 'phone'

			component.textControl.patchValue( 'qwertyabc' )
			component.textControl.updateValueAndValidity()

			expect( component.textControl.hasError( 'number' ) )
				.toBeTruthy()
		} )

		it( 'should error with emojis phone input', () => {
			component.type = 'phone'

			component.textControl.patchValue( '🎈🎈🎈🎈' )
			component.textControl.updateValueAndValidity()

			expect( component.textControl.hasError( 'number' ) )
				.toBeTruthy()
		} )
	} )
	describe( 'Verify Type Number', () => {
		it( 'should pass with correct number input', () => {
			component.type = 'number'

			component.textControl.patchValue( '4' )
			component.textControl.updateValueAndValidity()

			expect( component.textControl.valid )
				.toBeTruthy()
		} )

		it( 'should error with empty invalid number input', () => {
			component.type = 'number'

			component.textControl.patchValue( '' )
			component.textControl.updateValueAndValidity()

			expect( component.textControl.hasError( 'number' ) )
				.toBeTruthy()
		} )

		it( 'should error with caracter invalid number input', () => {
			component.type = 'number'

			component.textControl.patchValue( 'ab' )
			component.textControl.updateValueAndValidity()

			expect( component.textControl.hasError( 'number' ) )
				.toBeTruthy()
		} )
	} )
} )
