import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'

import { ChatRoutingModule } from './chat-routing.module'
import { ChatComponent } from './chat.component'
import { ChatRoomComponent } from './components/chat-room/chat-room.component'
import { ChatMessagesComponent } from './components/chat-messages/chat-messages.component'
import { MaterialModule } from 'src/app/shared/material.module'
import { FormsModule } from '@angular/forms'
import { PickerModule } from '@ctrl/ngx-emoji-mart'
@NgModule({
  declarations: [ChatComponent, ChatRoomComponent, ChatMessagesComponent],
  imports: [
    CommonModule,
    ChatRoutingModule,
    MaterialModule,
    FormsModule,
    PickerModule,
  ],
})
export class ChatModule {}
