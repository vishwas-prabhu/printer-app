import { Component, Input, OnInit } from '@angular/core'
import {
  PrinterData,
  PrinterListResponse,
} from 'src/app/shared/interfaces/printer-data'
import { PrinterService } from 'src/app/core/services/printer.service'

@Component({
  selector: 'app-print-table',
  templateUrl: './print-table.component.html',
  styleUrls: ['./print-table.component.scss'],
})
export class PrintTableComponent implements OnInit {
  @Input() paginate!: boolean
  printerData: PrinterData[] = []
  pageNo!: number
  totalPages: number[] = []

  constructor(private printerService: PrinterService) {}

  loadPrinterData(pageNo: number): void {
    if (this.paginate && pageNo !== this.pageNo) {
      this.pageNo = pageNo
      this.printerData = []
      this.printerService
        .getPrintersDataByPage(pageNo)
        .subscribe((data: PrinterListResponse) => {
          this.printerData = data.printerList
          this.populateTotalPages(data.totalPages)
        })
    } else if (!this.paginate) {
      this.printerService
        .getPrintersData()
        .subscribe((data: PrinterListResponse) => {
          this.printerData = data.printerList
        })
    }
  }

  populateTotalPages(totalPages: number): void {
    if (totalPages === this.totalPages.length) {
      return
    }
    this.totalPages.splice(0)
    for (let num = 1; num <= totalPages; num++) {
      this.totalPages.push(num)
    }
  }

  ngOnInit(): void {
    this.loadPrinterData(1)
  }
}
