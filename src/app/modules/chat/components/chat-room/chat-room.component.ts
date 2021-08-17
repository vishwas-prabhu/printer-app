import { Component, OnDestroy, OnInit } from '@angular/core'
import { ActivatedRoute, Router } from '@angular/router'
import { ChatService } from 'src/app/core/services/chat.service'

@Component({
  selector: 'app-chat-room',
  templateUrl: './chat-room.component.html',
  styleUrls: ['./chat-room.component.scss'],
})
export class ChatRoomComponent implements OnInit, OnDestroy {
  // rooms: any[] = []
  newRoomname = ''

  constructor(
    private chatService: ChatService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  getLastMessage(lastChat: any): string {
    if (lastChat) {
      return `${lastChat.username}: ${lastChat.message}`
    } else {
      return ''
    }
  }

  ngOnInit(): void {
    const roomId = this.router.url.split('/')[3]
    this.chatService.emitEvent('allroom', '')
    this.chatService.listen('allroom').subscribe((data: any) => {
      data = JSON.parse(data)
      this.chatService.updateRooms(data)
      if (roomId) {
        const room = this.chatService.rooms.find(item => roomId === item._id)
        this.chatService.setRoomName(room.roomname)
      }
    })
    this.chatService.listen('addroom').subscribe((data: any) => {
      data = JSON.parse(data)
      this.chatService.addRoom(data)
    })
  }

  createNewRoom(): void {
    if (this.newRoomname) {
      this.chatService.emitEvent('addroom', this.newRoomname)
    }
    this.newRoomname = ''
  }

  loadChatMessages(roomname: string, id: string): void {
    this.chatService.setRoomName(roomname)
    this.router.navigate([`./${id}`], { relativeTo: this.route })
  }

  get rooms(): any {
    return this.chatService.rooms
  }

  ngOnDestroy(): void {
    this.chatService.setRoomName('')
  }
}
