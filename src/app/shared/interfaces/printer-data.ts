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

export interface PrinterTableData {
  added_to_cart: boolean
  date_modified: string
  installed_in: boolean
  manufacturer: string
  model_supported: string
  source: string
  substrate_name: string
  id: number
}

export interface PrinterDataResponse {
  printerList: PrinterTableData[]
  totalPages: number
  pageNumber: number
}
