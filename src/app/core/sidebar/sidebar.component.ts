import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core'

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent implements OnInit {
  @Input() showSideBar!: boolean
  @Output() closeSideBar = new EventEmitter<any>()

  constructor() {}

  /**
   * Function will emit the closeSidebar event in parent component
   * @emits closeSideBar event
   */
  closeMenu(): void {
    this.closeSideBar.emit()
  }

  /**
   * Angular life hook - called when component is loaded
   */
  ngOnInit(): void {}
}
