import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'
import { ChatComponent } from './chat.component'
import { ChatMessagesComponent } from './components/chat-messages/chat-messages.component'

const routes: Routes = [
  {
    path: '',
    component: ChatComponent,
    children: [
      {
        path: ':id',
        component: ChatMessagesComponent,
      },
    ],
  },
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ChatRoutingModule {}
