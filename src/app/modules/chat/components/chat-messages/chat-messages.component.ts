import {
  AfterViewChecked,
  Component,
  DoCheck,
  ElementRef,
  OnChanges,
  OnInit,
  ViewChild,
} from '@angular/core'
import { ActivatedRoute, Params } from '@angular/router'
import { AuthService } from 'src/app/core/services/auth.service'
import { ChatService } from 'src/app/core/services/chat.service'

@Component({
  selector: 'app-chat-messages',
  templateUrl: './chat-messages.component.html',
  styleUrls: ['./chat-messages.component.scss'],
})
export class ChatMessagesComponent implements OnInit, AfterViewChecked {
  message!: string
  typing!: string
  messages: any[] = []
  isEmojiPickerVisible = false
  roomId = ''
  roomname = ''

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
    this.chatService
      .listen('message')
      .subscribe(data => this.updateMessage(data))
    this.chatService.listen('typing').subscribe(data => this.updateTyping(data))
    this.chatService
      .listen('allmessage')
      .subscribe(data => this.updatePreviousMessages(data))

    this.chatService.selectedRoomName.subscribe(data => (this.roomname = data))

    this.route.paramMap.subscribe((data: Params) => {
      if (this.roomId) {
        this.chatService.emitEvent('leaveRoom', this.roomId)
      }
      this.typing = ''
      this.messages = []
      this.roomId = data.params.id
      this.chatService.emitEvent('joinroom', this.roomId)
      this.chatService.emitEvent('allmessage', this.roomId)
    })

    this.scrollToBottom()
  }

  ngAfterViewChecked(): void {
    this.scrollToBottom()
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

  updateMessage(data: any): void {
    this.messages.push(JSON.parse(data))
  }

  updateTyping(data: any): void {
    this.typing = JSON.parse(data).message
  }

  updatePreviousMessages(data: any): void {
    this.messages.unshift(...JSON.parse(data).messages)
  }

  get useremail(): string {
    return this.authService.loggedInUserEmail
  }
}
