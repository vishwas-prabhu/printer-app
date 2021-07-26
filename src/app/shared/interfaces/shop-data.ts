export interface ShopTableData {
  added_to_cart: boolean
  date_modified: string
  installed_in: boolean
  manufacturer: string
  model_supported: string
  source: string
  substrate_name: string
  id: number
}

export interface ShopDataResponse {
  productList: ShopTableData[]
  totalPages: number
  pageNumber: number
}
