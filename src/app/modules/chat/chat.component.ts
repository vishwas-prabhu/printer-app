import { Component, OnInit } from '@angular/core'

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss'],
})
export class ChatComponent implements OnInit {
  roomTab = true

  constructor() {}

  ngOnInit(): void {}

  showRoomTab(): void {
    this.roomTab = true
  }

  hideRoomTab(): void {
    this.roomTab = false
  }
}
