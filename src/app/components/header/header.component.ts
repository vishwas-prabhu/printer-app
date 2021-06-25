import { Component, OnInit, Output, EventEmitter } from '@angular/core'
import { Router, Event, NavigationStart } from '@angular/router'

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  showDropdown!: string
  notifications!: string[]
  pageName!: string
  @Output() openSideBar = new EventEmitter<any>()

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.loadNotifications()
    this.router.events.subscribe((event: Event) => {
      if (event instanceof NavigationStart) {
        this.pageName = event.url.slice(1)
      }
    })
  }

  openDropdown(menuType: string): void {
    if (menuType === this.showDropdown) {
      this.showDropdown = ''
      return
    }
    this.showDropdown = menuType
  }

  loadNotifications(): void {
    this.notifications = ['Printer Down', 'Notifications blocked']
  }

  openMenu(): void {
    this.openSideBar.emit()
  }
}
