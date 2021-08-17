import { Injectable } from '@angular/core'
import { BehaviorSubject, Observable } from 'rxjs'
import { io } from 'socket.io-client'
import { environment } from 'src/environments/environment'

@Injectable({
  providedIn: 'root',
})
export class ChatService {
  // websocket: SocketIOClient.Socket
  websocket!: any
  selectedRoomName: BehaviorSubject<string> = new BehaviorSubject<string>('')
  messages: any[] = []
  rooms: any[] = []

  constructor() {
    this.websocket = io(environment.baseUrl, {
      transports: ['websocket'],
    })
  }

  listen(eventName: string): Observable<any> {
    return new Observable(subscribe => {
      this.websocket.on(eventName, (data: any): any => {
        subscribe.next(data)
      })
    })
  }

  emitEvent(eventName: string, data: any): void {
    this.websocket.emit(eventName, data)
  }

  setRoomName(name: string): void {
    this.selectedRoomName.next(name)
  }

  updateMessage(data: any): void {
    this.messages.push(JSON.parse(data))
  }

  updatePreviousMessages(data: any): void {
    this.messages.unshift(...JSON.parse(data).messages)
  }

  resetMessages(): void {
    this.messages = []
  }

  updateRooms(data: any): void {
    this.rooms.push(...data.rooms)
  }

  addRoom(data: any): void {
    this.rooms.push(data)
  }

  updateLastMessage(id: string, data: any): void {
    const index = this.rooms.findIndex(item => item._id === id)
    this.rooms[index].lastChat = JSON.parse(data)
  }
}
