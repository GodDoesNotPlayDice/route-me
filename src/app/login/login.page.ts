import {Component, OnInit, ViewChild} from '@angular/core';
import {AuthService} from "../services/auth/auth.service";
import {
  InputTextComponent
} from "../shared/components/input-text/input-text.component";
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
        this.passwordInput.textControl,
        this.checkbox.checkboxControl
    ])
  }

  async submit($event: SubmitEvent) {
    $event.preventDefault()
    console.log("submit")
    this.formGroup.markAllAsTouched()
    if(
      !this.userInput.textControl.valid &&
      !this.passwordInput.textControl.valid
    ) return

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

    console.log(response)
  }
}
