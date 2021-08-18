import {
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core'
import { ActivatedRoute, Router } from '@angular/router'
import { ChatService } from 'src/app/core/services/chat.service'

@Component({
  selector: 'app-chat-room',
  templateUrl: './chat-room.component.html',
  styleUrls: ['./chat-room.component.scss'],
})
export class ChatRoomComponent implements OnInit, OnDestroy {
  newRoomname = ''
  roomId = ''
  allRoomSubscription: any

  @Output() hideTab: EventEmitter<any> = new EventEmitter<any>()

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

  createNewRoom(): void {
    if (this.newRoomname) {
      this.chatService.emitEvent('addroom', this.newRoomname)
    }
    this.newRoomname = ''
  }

  hideRoomTab(): void {
    this.hideTab.emit()
  }

  loadChatMessages(roomname: string, id: string): void {
    this.chatService.setRoomName(roomname)
    this.hideRoomTab()
    this.router.navigate(['./'], {
      queryParams: { chatId: id },
      relativeTo: this.route,
    })
  }

  ngOnInit(): void {
    this.route.queryParamMap.subscribe((data: any) => {
      this.roomId = data.params.chatId
    })

    this.chatService.emitEvent('allroom', '')
    this.allRoomSubscription = this.chatService
      .listen('allroom')
      .subscribe((data: any) => {
        data = JSON.parse(data)
        this.chatService.updateRooms(data)
        if (this.roomId) {
          const room = this.chatService.rooms.find(
            item => this.roomId === item._id
          )
          this.chatService.setRoomName(room.roomname)
        }
      })

    this.chatService.listen('addroom').subscribe((data: any) => {
      data = JSON.parse(data)
      this.chatService.addRoom(data)
    })
  }

  ngOnDestroy(): void {
    this.allRoomSubscription.unsubscribe()
    this.chatService.setRoomName('')
    this.chatService.resetRooms()
  }

  get rooms(): any {
    return this.chatService.rooms
  }
}
