import {
  Component,
  OnInit,
  Output,
  EventEmitter,
  ViewChild,
  ElementRef,
  HostListener,
} from '@angular/core'
import { MatDialog } from '@angular/material/dialog'
import { Router, Event, NavigationStart } from '@angular/router'
import { CartDialogComponent } from '../cart-dialog/cart-dialog.component'

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  constructor(private router: Router, private dialog: MatDialog) {}
  notifications!: string[]
  pageName!: string
  showDropdown!: string

  @Output() openSideBar = new EventEmitter<any>()

  @ViewChild('cartButton') public cartButton!: ElementRef

  @HostListener('window:click', ['$event'])
  onClick($event: any): void {
    // console.log($event.path[1].classList[0])
    if (
      this.showDropdown &&
      $event.path[1].classList[0] !== 'header__rightOption'
    ) {
      this.showDropdown = ''
    }
  }

  /**
   * Function will load the notifications from API
   * and saves it in local variable
   */
  loadNotifications(): void {
    this.notifications = ['Printer Down', 'Notifications blocked']
  }

  /**
   * Function will set the showDropdown variable value
   * @param menuType type of menu to be displayed,
   * `menuType` value can be 'notifications' or 'profile'
   * @returns void
   */
  openDropdown(menuType: string): void {
    if (menuType === this.showDropdown) {
      this.showDropdown = ''
      return
    }
    this.showDropdown = menuType
  }

  /**
   * Function will emit the openSideBar event in the parent component
   * @emits openSideBar event
   */
  openMenu(): void {
    this.openSideBar.emit()
  }

  /**
   * Opens cart dialog and displays the cart items
   */
  openDialog(): void {
    this.showDropdown = ''
    this.dialog.open(CartDialogComponent, {
      width: `400px`,
      data: {
        positionRelativeToElement: this.cartButton,
      },
    })
  }

  ngOnInit(): void {
    this.loadNotifications()

    // Subscribe to router event and update the header with current route path
    this.router.events.subscribe((event: Event) => {
      if (event instanceof NavigationStart) {
        this.pageName = event.url.slice(1)
      }
    })
  }
}
