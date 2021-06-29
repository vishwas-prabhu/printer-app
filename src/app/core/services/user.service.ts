import { Injectable } from '@angular/core'
import { Observable } from 'rxjs'
import {
  DashboardDataResponse,
  UserResponse,
} from '../../shared/interfaces/user'
import { environment } from 'src/environments/environment'
import { HttpClient } from '@angular/common/http'

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpClient) {}

  getUsersData(): Observable<UserResponse> {
    return this.http.get<UserResponse>(`${environment.baseUrl}userList`)
  }

  getDashboardData(): Observable<DashboardDataResponse> {
    return this.http.get<DashboardDataResponse>(`${environment.baseUrl}kpiData`)
  }
}
