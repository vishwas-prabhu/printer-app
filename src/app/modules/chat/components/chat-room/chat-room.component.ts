import { Component, OnInit } from '@angular/core'
import { ActivatedRoute, Params, Router } from '@angular/router'
import { ChatService } from 'src/app/core/services/chat.service'

@Component({
  selector: 'app-chat-room',
  templateUrl: './chat-room.component.html',
  styleUrls: ['./chat-room.component.scss'],
})
export class ChatRoomComponent implements OnInit {
  rooms: any[] = []
  roomname = ''

  constructor(
    private chatService: ChatService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    const roomId = this.router.url.split('/')[3]
    this.chatService.emitEvent('allroom', '')
    this.chatService.listen('allroom').subscribe((data: any) => {
      data = JSON.parse(data)
      this.rooms.push(...data.rooms)
      if (roomId) {
        const room = this.rooms.find(item => roomId === item._id)
        this.chatService.setRoomName(room.roomname)
      }
    })
    this.chatService.listen('addroom').subscribe((data: any) => {
      data = JSON.parse(data)
      this.rooms.push(data)
    })
  }

  createNewRoom(): void {
    this.chatService.emitEvent('addroom', this.roomname)
    this.roomname = ''
  }

  loadChatMessages(roomname: string, id: string): void {
    this.chatService.setRoomName(roomname)
    this.router.navigate([`./${id}`], { relativeTo: this.route })
  }
}
