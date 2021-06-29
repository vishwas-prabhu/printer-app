import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { Observable } from 'rxjs'
import { environment } from 'src/environments/environment'
import { PrinterListResponse } from '../../shared/interfaces/printer-data'

@Injectable({
  providedIn: 'root',
})
export class PrinterService {
  constructor(private http: HttpClient) {}

  getPrintersData(): Observable<PrinterListResponse> {
    return this.http.get<PrinterListResponse>(
      `${environment.baseUrl}printerList`
    )
  }

  getPrintersDataByPage(pageNo: number): Observable<PrinterListResponse> {
    return this.http.get<PrinterListResponse>(
      `${environment.baseUrl}printerList/${pageNo}`
    )
  }
}
