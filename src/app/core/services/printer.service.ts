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

  /**
   * @description
   * Fetches the Printers Data from the API
   * @param - none
   * @returns returns response from the API
   * @use fetches printerList end point of API
   */
  getPrintersData(): Observable<PrinterListResponse> {
    return this.http.get<PrinterListResponse>(
      `${environment.baseUrl}printerList`
    )
  }

  /**
   * @description
   * Fetches the Printers table data from the API based on page number
   * @param pageNo end point for the Request URL
   * @returns returns response from the API Request
   */
  getPrintersDataByPage(pageNo: number): Observable<PrinterListResponse> {
    return this.http.get<PrinterListResponse>(
      `${environment.baseUrl}printerList/${pageNo}`
    )
  }
}
