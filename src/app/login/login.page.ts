import {Component, OnInit, ViewChild} from '@angular/core';
import {AuthService} from "../services/auth/auth.service";
import {
  InputTextComponent
} from "../shared/components/input-text/input-text.component";
import {match} from "oxide.ts";
import {Router} from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  constructor(private authService : AuthService, private router : Router) { }

  @ViewChild('user') userInput!: InputTextComponent
  @ViewChild('password') passwordInput!: InputTextComponent

  ngOnInit() {
  }

  async submit($event: SubmitEvent) {
    $event.preventDefault()
    console.log("submit")
    if(
      typeof this.userInput.textControl.value === null &&
      typeof this.passwordInput.textControl.value === null
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
        return "error msg"
      }
    })

    console.log(response)
  }
}
