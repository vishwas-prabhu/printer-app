export interface PrinterData {
  id: string
  name: string
  status: string
}

export interface PrinterListResponse {
  printerList: PrinterData[]
  totalPages: number
  pageNumber: number
}
