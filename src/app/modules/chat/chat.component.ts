import { Component, OnDestroy, OnInit } from '@angular/core'

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss'],
})
export class ChatComponent implements OnInit, OnDestroy {
  roomTab = false

  constructor() {}

  ngOnInit(): void {}

  ngOnDestroy(): void {}

  showRoomTab(): void {
    this.roomTab = true
  }

  hideRoomTab(): void {
    this.roomTab = false
  }
}
