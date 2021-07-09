import {
  AfterViewInit,
  Component,
  ElementRef,
  Input,
  OnInit,
  Output,
  ViewChild,
  EventEmitter,
} from '@angular/core'
import { MatDialog } from '@angular/material/dialog'
import { MatSnackBar } from '@angular/material/snack-bar'
import { MatSort } from '@angular/material/sort'
import { CartService } from 'src/app/core/services/cart.service'
import { ConfirmDialogComponent } from 'src/app/shared/components/confirm-dialog/confirm-dialog.component'
import { PrinterTableData } from 'src/app/shared/interfaces/printer-data'

@Component({
  selector: 'app-print-table',
  templateUrl: './print-table.component.html',
  styleUrls: ['./print-table.component.scss'],
})
export class PrintTableComponent implements OnInit, AfterViewInit {
  @Input() dataSource: any
  @Input() columnsToDisplay!: string[]
  @Output() loadNextPage = new EventEmitter<any>()

  @ViewChild(MatSort) sort!: MatSort

  constructor(
    private snackbar: MatSnackBar,
    private cart: CartService,
    private dialog: MatDialog
  ) {}

  /**
   * Adds or removes item to/from the cart
   *
   * @param element item to be added to the cart
   *
   * @usageNotes if `element` already exists
   * then it will be removed from the cart
   */
  addToCart(element: PrinterTableData): void {
    const index = this.cart.getIndexOfCartItem(element.id)
    if (index >= 0) {
      this.openDialog(index, element.substrate_name)
    } else {
      this.cart.addItemToCart(element)
      this.openSnackBar(`${element.substrate_name} added to cart.`)
    }
  }

  /**
   * Returns the sign to display in badge
   * @param id id of the element
   * @returns string to be displayed in the badge
   *
   * @usageNotes
   * If id is present in cart `-` will be returned else `+` is returned
   */
  getSign(id: number): string {
    return this.cart.cartItems.some(item => item.id === id) ? '-' : '+'
  }

  /**
   * Opens the confirmation dialog at the center of screen
   * @param index index of element to delete from cart
   * @param productName name of the element to be deleted
   *
   * @usageNotes
   * Confirm dialog contains `ok` and `cancel` buttons
   */
  openDialog(index: number, productName: string): void {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: `400px`,
      data: {
        title: 'Are you sure ?!',
        body: `Delete ${productName} from your cart.`,
        buttonOne: 'Go Back',
        buttonTwo: 'Ok',
      },
    })

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.cart.removeItemFromCart(index)
        this.openSnackBar(`${productName} removed from the cart.`)
      }
    })
  }

  /**
   * Opens a snackbar at the bottom of the screen
   * @param name string to be displayed in the snackbar
   */
  openSnackBar(message: string): void {
    this.snackbar.open(message, 'Dismiss', {
      duration: 1000,
    })
  }

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort
  }
}
