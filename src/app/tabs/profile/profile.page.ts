import { Component } from '@angular/core';
import {AuthService} from "../../services/auth/auth.service";
import {User} from 'src/package/user/domain/entities/User';
import {
  defaultUsers
} from 'src/package/user/infrastructure/AuthDataMemory';
import {Some} from "oxide.ts";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage {

  constructor(private authService : AuthService) {
    if (authService.currentUser.isNone()){
      authService.currentUser = Some(defaultUsers[0])
    }

    this.user = authService.currentUser.unwrap()
    this.edad = new Date().getFullYear() - this.user.birthDay.value.getFullYear()
  }

  edad : number
  user : User
}
