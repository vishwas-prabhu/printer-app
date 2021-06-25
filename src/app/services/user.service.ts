import { Injectable } from '@angular/core'
import { Observable, of } from 'rxjs'
import { User } from '../interfaces/user'
import { USERS_DATA } from '../mocks/mockData'

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor() {}

  getUsersData(): Observable<User[]> {
    return of(USERS_DATA)
  }
}
