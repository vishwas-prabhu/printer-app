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

  constructor() {
    this.websocket = io('https://backup-server-app.herokuapp.com/', {
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
}
