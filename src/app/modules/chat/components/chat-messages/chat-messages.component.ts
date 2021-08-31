import {
  AfterViewChecked,
  Component,
  DoCheck,
  ElementRef,
  OnChanges,
  OnInit,
  Output,
  ViewChild,
  EventEmitter,
  OnDestroy,
} from '@angular/core'
import { ActivatedRoute, Params } from '@angular/router'
import { AuthService } from 'src/app/core/services/auth.service'
import { ChatService } from 'src/app/core/services/chat.service'

@Component({
  selector: 'app-chat-messages',
  templateUrl: './chat-messages.component.html',
  styleUrls: ['./chat-messages.component.scss'],
})
export class ChatMessagesComponent
  implements OnInit, AfterViewChecked, OnDestroy
{
  message!: string
  typing!: string
  // messages: any[] = []
  isEmojiPickerVisible = false
  roomId = ''
  roomname = ''
  allMessageSubs: any

  @Output() showTab: EventEmitter<any> = new EventEmitter<any>()

  @ViewChild('chatMessages') public chatMessageRef!: ElementRef

  constructor(
    private chatService: ChatService,
    private authService: AuthService,
    private route: ActivatedRoute
  ) {}

  addEmoji(event: any): void {
    this.message = `${this.message}${event.emoji.native}`
  }

  ngOnInit(): void {
    this.message = ''
    this.typing = ''
    this.chatService.listen('message').subscribe(data => {
      this.chatService.updateMessage(data)
      this.chatService.updateLastMessage(this.roomId, data)
    })
    this.chatService.listen('typing').subscribe(data => this.updateTyping(data))
    this.allMessageSubs = this.chatService
      .listen('allmessage')
      .subscribe(data => this.chatService.updatePreviousMessages(data))

    this.chatService.selectedRoomName.subscribe(data => (this.roomname = data))

    this.route.queryParamMap.subscribe((data: Params) => {
      if (this.roomId) {
        this.chatService.emitEvent('leaveRoom', this.roomId)
      }
      this.typing = ''
      this.chatService.resetMessages()
      this.roomId = data.params.chatId

      if (this.roomId) {
        this.chatService.emitEvent('joinroom', this.roomId)
        this.chatService.emitEvent('allmessage', this.roomId)
      } else {
        this.showRoomTab()
      }
    })

    this.scrollToBottom()
  }

  ngAfterViewChecked(): void {
    this.scrollToBottom()
  }

  ngOnDestroy(): void {
    this.allMessageSubs.unsubscribe()
  }

  scrollToBottom(): void {
    try {
      this.chatMessageRef.nativeElement.scrollTop =
        this.chatMessageRef.nativeElement.scrollHeight
    } catch (e) {}
  }

  resetTyping(): void {
    this.chatService.emitEvent('typing', {
      roomid: this.roomId,
      message: '',
    })
  }

  sendMessage($event?: any): void {
    this.message = this.message.trim()
    if ($event) {
      $event.preventDefault()
    }
    if (!this.message.length) {
      return
    }
    this.chatService.emitEvent('message', {
      message: this.message,
      username: this.authService.loggedInUser,
      email: this.authService.loggedInUserEmail,
      roomid: this.roomId,
      sentTime: new Date().toISOString(),
    })
    this.resetTyping()
    this.isEmojiPickerVisible = false
    this.typing = ''
    this.message = ''
  }

  sendTyping(): void {
    this.chatService.emitEvent('typing', {
      roomid: this.roomId,
      message: `${this.authService.loggedInUser} is typing...`,
    })
  }

  showRoomTab(): void {
    this.showTab.emit()
  }

  updateTyping(data: any): void {
    this.typing = JSON.parse(data).message
  }

  get useremail(): string {
    return this.authService.loggedInUserEmail
  }

  get messages(): any {
    return this.chatService.messages
  }
}
