import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'

import { DashboardRoutingModule } from './dashboard-routing.module'
import { DashboardComponent } from './dashboard.component'
import { SharedModule } from 'src/app/shared/shared.module'
import { SidebarComponent } from 'src/app/modules/dashboard/components/sidebar/sidebar.component'
import { HeaderComponent } from 'src/app/modules/dashboard/components/header/header.component'

@NgModule({
  declarations: [DashboardComponent, SidebarComponent, HeaderComponent],
  imports: [CommonModule, SharedModule, DashboardRoutingModule],
})
export class DashboardModule {}
