import { Component, Inject, OnInit } from '@angular/core'
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog'
import { MatSnackBar } from '@angular/material/snack-bar'
import { CartService } from 'src/app/core/services/cart.service'
import { ConfirmDialogComponent } from 'src/app/shared/components/confirm-dialog/confirm-dialog.component'
import { CartItem } from 'src/app/shared/interfaces/cart-item'
interface DialogData {
  positionRelativeToElement: any
}

@Component({
  selector: 'app-cart-dialog',
  templateUrl: './cart-dialog.component.html',
  styleUrls: ['./cart-dialog.component.scss'],
})
export class CartDialogComponent implements OnInit {
  cartData: CartItem[] = []

  constructor(
    private cartService: CartService,
    private snackbar: MatSnackBar,
    public dialogRef: MatDialogRef<CartDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    const btn =
      this.data?.positionRelativeToElement.nativeElement.getBoundingClientRect()
    this.dialogRef.updatePosition({
      right: `${btn.right - btn.left}px`,
      top: `${btn.bottom + 2}px`,
    })

    this.cartData = this.cartService.cartItems
  }

  /**
   * Opens a snackbar at the bottom of the screen
   * @param name string to be displayed in the snackbar
   */
  openSnackBar(name: string): void {
    this.snackbar.open(`${name} removed from Cart`, 'Dismiss', {
      duration: 1000,
    })
  }

  /**
   * Opens the confirmation dialog at the center of screen
   * @param item selected element to delete from cart
   *
   * @usageNotes
   * Confirm dialog contains `ok` and `cancel` buttons
   */
  openDialog(item: CartItem): void {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: `400px`,
      data: {
        title: 'Are you sure ?!',
        body: `Delete ${item.name} from your cart.`,
        buttonOne: 'Go Back',
        buttonTwo: 'Ok',
      },
    })

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.removeItemFromCart(item)
      }
    })
  }

  /**
   * Removes item from the cartItems array
   * @param item element to be removed from the cart
   */
  removeItemFromCart(item: CartItem): void {
    const index = this.cartService.getIndexOfCartItem(item.id)
    this.cartService.removeItemFromCart(index)
    this.openSnackBar(item.name)
  }
}
