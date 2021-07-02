import { Component, OnInit, Output, EventEmitter } from '@angular/core'
import { Router, Event, NavigationStart } from '@angular/router'

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  notifications!: string[]
  pageName!: string
  showDropdown!: string
  @Output() openSideBar = new EventEmitter<any>()

  constructor(private router: Router) {}

  /**
   * This function will load the notifications from API
   * And saves it in local variable
   * Invoked when component is created
   */
  loadNotifications(): void {
    this.notifications = ['Printer Down', 'Notifications blocked']
  }

  /**
   * Function will set the showDropdown variable value
   * @param menuType type of menu to be displayed
   * menuType value can be notifications or profile
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
   * Function will emit the openSidebar event in the parent component
   */
  openMenu(): void {
    this.openSideBar.emit()
  }

  ngOnInit(): void {
    this.loadNotifications()

    // Update the header with current route path
    this.router.events.subscribe((event: Event) => {
      if (event instanceof NavigationStart) {
        this.pageName = event.url.slice(1)
      }
    })
  }
}
