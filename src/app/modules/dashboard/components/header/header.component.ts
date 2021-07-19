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
import { ConfirmDialogComponent } from 'src/app/shared/components/confirm-dialog/confirm-dialog.component'
import { CartDialogComponent } from '../../../../core/cart-dialog/cart-dialog.component'
import { AuthService } from '../../../../core/services/auth.service'

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  notifications!: string[]
  pageName!: string
  showDropdown!: string

  constructor(
    private router: Router,
    private dialog: MatDialog,
    private authService: AuthService
  ) {}

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

  /**
   * Opens the confirmation dialog at the center of screen
   *
   * @usageNotes
   * Confirm dialog contains `ok` and `cancel` buttons
   */
  openLogoutDialog(): void {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: `400px`,
      data: {
        title: 'Confirm Logout !',
        body: `Your filters will reset and cookies will be deleted. Are you sure you want to Logout ?`,
        buttonOne: 'Go Back',
        buttonTwo: 'Ok',
      },
    })

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.logout()
      }
    })
  }

  ngOnInit(): void {
    this.loadNotifications()
    this.pageName = this.router.url.slice(1)

    // Subscribe to router event and update the header with current route path
    this.router.events.subscribe((event: Event) => {
      if (event instanceof NavigationStart) {
        this.pageName = event.url.slice(1)
      }
    })
  }

  logout(): void {
    this.authService.logout()
  }
}
