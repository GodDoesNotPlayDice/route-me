import {
  Component,
  ViewChild
} from '@angular/core'
import { InputTextComponent } from 'src/app/shared/components/input-text/input-text.component'
import {AuthService} from "../services/auth/auth.service";
import {match} from "oxide.ts";
import {Router} from "@angular/router";
import {AlertController, ViewDidEnter} from "@ionic/angular";
import {
  CheckboxComponent
} from "../shared/components/checkbox/checkbox.component";
import {FormGroup} from "@angular/forms";

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements ViewDidEnter{

  constructor(
  private authService : AuthService,
  private router : Router,
  private alertController: AlertController
  ) { }

  @ViewChild('user') userInput!: InputTextComponent
  @ViewChild('password') passwordInput!: InputTextComponent
  @ViewChild( 'check') checkbox!: CheckboxComponent

  formGroup! : FormGroup

  async presentAlert() {
    const alert = await this.alertController.create({
      header: 'Error',
      subHeader: 'Credenciales no existen',
      message: '',
      buttons: ['OK'],
    });

    await alert.present();
  }

  ionViewDidEnter() {
    this.formGroup = new FormGroup([
        this.userInput.textControl,
        this.passwordInput.textControl
    ])
  }

  async submit($event: SubmitEvent) {
    $event.preventDefault()

    this.formGroup.updateValueAndValidity()
    this.formGroup.markAllAsTouched()

    if(
      !this.formGroup.valid
    ) return

    // si el checkbox esta marcado
    // this.checkbox.checkboxControl.value

    const result = await this.authService.login(
      this.userInput.textControl.value!,
      this.passwordInput.textControl.value!
    )

    const response = match(result, {
      Ok: (value:boolean) => {
        this.router.navigate(['/tabs'])
        return "exito"
      },
      Err: (error:string) => {
        this.presentAlert()
        return "error msg"
      }
    })
  }
}
