import { Component, OnInit } from '@angular/core'
import { User, UserResponse } from 'src/app/interfaces/user'
import { UserService } from 'src/app/services/user.service'

@Component({
  selector: 'app-user-table',
  templateUrl: './user-table.component.html',
  styleUrls: ['./user-table.component.scss'],
})
export class UserTableComponent implements OnInit {
  usersData: User[] = []

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.loadUserData()
  }

  loadUserData(): void {
    this.userService.getUsersData().subscribe((data: UserResponse) => {
      this.usersData = data.userList
    })
  }
}
