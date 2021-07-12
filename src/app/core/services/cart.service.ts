import { Injectable } from '@angular/core'
import { CartItem } from 'src/app/shared/interfaces/cart-item'
import { ShopTableData } from 'src/app/shared/interfaces/shop-data'

@Injectable({
  providedIn: 'root',
})
export class CartService {
  cartItems: CartItem[] = []

  constructor() {}

  /**
   * Finds the index of the element which matches with `id`
   * @param id id of the element to find in the array
   * @returns index of the found element, if `id` is not present -1 is returned
   */
  getIndexOfCartItem(id: number): number {
    return this.cartItems.findIndex(item => item.id === id)
  }

  /**
   * Adds item to the cart
   * @param data item to be added to the cart
   */
  addItemToCart(data: ShopTableData): void {
    this.cartItems.push({ name: data.substrate_name, id: data.id })
  }

  /**
   * Removes an item from the array
   * @param index index of item to delete from array
   */
  removeItemFromCart(index: number): void {
    this.cartItems.splice(index, 1)
  }
}
