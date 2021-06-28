import { Component, Input, OnInit } from '@angular/core'
import {
  PrinterData,
  PrinterListResponse,
} from 'src/app/interfaces/printerData'
import { PrinterService } from 'src/app/services/printer.service'

@Component({
  selector: 'app-print-table',
  templateUrl: './print-table.component.html',
  styleUrls: ['./print-table.component.scss'],
})
export class PrintTableComponent implements OnInit {
  @Input() paginate!: boolean
  printerData: PrinterData[] = []

  constructor(private printerService: PrinterService) {}

  ngOnInit(): void {
    this.loadPrinterData()
  }

  loadPrinterData(): void {
    this.printerService
      .getPrintersData()
      .subscribe((data: PrinterListResponse) => {
        console.log(data.printerList)
        this.printerData = data.printerList
      })
  }
}
