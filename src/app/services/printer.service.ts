import { Injectable } from '@angular/core'
import { Observable, of } from 'rxjs'
import { PrinterData } from '../interfaces/printerData'
import { PRINTER_DATA } from '../mocks/mockData'

@Injectable({
  providedIn: 'root',
})
export class PrinterService {
  constructor() {}

  getPrintersData(): Observable<PrinterData[]> {
    return of(PRINTER_DATA)
  }
}
