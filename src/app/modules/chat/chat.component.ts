import { Component, OnDestroy, OnInit } from '@angular/core'
import { ChatService } from 'src/app/core/services/chat.service'

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss'],
})
export class ChatComponent implements OnInit, OnDestroy {
  constructor(private chatService: ChatService) {}

  ngOnInit(): void {
    // this.chatService.openWebSocket()
  }

  ngOnDestroy(): void {}
}
