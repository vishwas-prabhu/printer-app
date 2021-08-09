import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { CartItem } from 'src/app/shared/interfaces/cart-item'
import { ShopTableData } from 'src/app/shared/interfaces/shop-data'
import { environment } from 'src/environments/environment'

@Injectable({
  providedIn: 'root',
})
export class CartService {
  cartItems: CartItem[] = []

  constructor(private http: HttpClient) {}

  /**
   * Finds the index of the element which matches with `id`
   * @param id id of the element to find in the array
   * @returns index of the found element, if `id` is not present -1 is returned
   */
  getIndexOfCartItem(id: string): number {
    return this.cartItems.findIndex(item => item.id === id)
  }

  /**
   * Adds item to the cart
   * @param data item to be added to the cart
   */
  addItemToCart(data: ShopTableData): void {
    this.http
      .post<any>(`${environment.baseUrl}addToCart`, {
        item: { name: data.substrate_name, id: data._id },
      })
      .subscribe((response: any) => {
        if (response.status === 200) {
          this.cartItems.push({ name: data.substrate_name, id: data._id })
        }
      })
  }

  clearCart(): void {
    this.cartItems = []
  }

  /**
   * Removes an item from the array
   * @param index index of item to delete from array
   */
  removeItemFromCart(index: number): void {
    this.http
      .post<any>(`${environment.baseUrl}deleteFromCart`, {
        item: this.cartItems[index],
      })
      .subscribe(response => {
        if (response.status === 200) {
          this.cartItems.splice(index, 1)
        }
      })
  }

  getCartItemsOfUser(): void {
    if (!this.cartItems.length) {
      this.http.get<any>(`${environment.baseUrl}cartItems`).subscribe(data => {
        this.cartItems = data.cartItems
      })
    }
  }
}
