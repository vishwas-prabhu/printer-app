import { Component, OnInit } from '@angular/core'
import { DashboardDataResponse } from 'src/app/shared/interfaces/user'
import { UserService } from 'src/app/core/services/user.service'

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  dashboardData = [
    { name: 'Users', number: 0, colorCode: '#79c179', icon: 'people' },
    { name: 'Printers', number: 0, colorCode: '#d41010', icon: 'storage' },
    { name: 'Jobs', number: 0, colorCode: '#d2c30e', icon: 'device_hub' },
    { name: 'Issues', number: 0, colorCode: '#5b81ec', icon: 'mode_standby' },
  ]

  constructor(private userService: UserService) {}

  updateDashboardData(): void {
    this.userService
      .getDashboardData()
      .subscribe((response: DashboardDataResponse) => {
        const { kpiData } = response
        this.dashboardData[0].number = kpiData.totalUsers
        this.dashboardData[1].number = kpiData.totalPrinters
        this.dashboardData[2].number = kpiData.totalJobs
        this.dashboardData[3].number = kpiData.totalIssues
      })
  }

  ngOnInit(): void {
    this.updateDashboardData()
  }
}
