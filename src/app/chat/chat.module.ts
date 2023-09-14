import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';
import { LoginPageModule } from 'src/app/login/login.module'
import { BubbleChatComponent } from 'src/app/shared/components/bubble-chat/bubble-chat.component'
import { ChatInputComponent } from 'src/app/shared/components/chat-input/chat-input.component'

import { ChatPageRoutingModule } from './chat-routing.module';

import { ChatPage } from './chat.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ChatPageRoutingModule,
    LoginPageModule
  ],
  declarations: [ ChatPage, BubbleChatComponent, ChatInputComponent ]
})
export class ChatPageModule {}
