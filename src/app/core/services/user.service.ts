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

  /**
   * @description
   * Function fetches the Users data from the API
   * @returns returns response from the API
   * @use fetch userList end point of API
   */
  getUsersData(): Observable<UserResponse> {
    return this.http.get<UserResponse>(`${environment.baseUrl}userList`)
  }

  /**
   * @description
   * Function fetches the dashboard data from the API
   * @returns returns Observable response data from the API
   * @use fetch kpiData endpoint of API
   */
  getDashboardData(): Observable<DashboardDataResponse> {
    return this.http.get<DashboardDataResponse>(`${environment.baseUrl}kpiData`)
  }
}
