import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { Observable, of } from 'rxjs'
import { tap } from 'rxjs/operators'
import { ShopDataResponse } from 'src/app/shared/interfaces/shop-data'
import { environment } from 'src/environments/environment'
import { PrinterListResponse } from '../../shared/interfaces/printer-data'

@Injectable({
  providedIn: 'root',
})
export class PrinterService {
  pageNumber = 0
  totalPages = 1
  isDataLoading = false

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

  /**
   * Requests the shop table data from the API
   * @param pageNo respresents param for API call
   * @returns response from the API
   */
  getProductsData(pageNo: number): Observable<ShopDataResponse> {
    if (pageNo === 1) {
      this.pageNumber = 0
    }
    if (!this.isDataLoading && this.pageNumber < this.totalPages) {
      this.isDataLoading = true
      return this.http
        .get<ShopDataResponse>(
          `${environment.baseUrl}shopTableData/${++this.pageNumber}`
        )
        .pipe(
          tap(data => {
            this.pageNumber = data.pageNumber
            this.totalPages = data.totalPages
            this.isDataLoading = false
          })
        )
    }
    return of({ productList: [], totalPages: 0, pageNumber: 0 })
  }
}
