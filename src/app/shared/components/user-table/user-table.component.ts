import { Component, OnInit } from '@angular/core'
import { Observable, of, Subject } from 'rxjs'
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators'
import { User, UserResponse } from 'src/app/shared/interfaces/user'
import { UserService } from 'src/app/core/services/user.service'

@Component({
  selector: 'app-user-table',
  templateUrl: './user-table.component.html',
  styleUrls: ['./user-table.component.scss'],
})
export class UserTableComponent implements OnInit {
  allUsers: User[] = []
  usersData!: Observable<User[]>

  private searchTerms = new Subject<string>()

  constructor(private userService: UserService) {}

  loadUserData(): void {
    this.userService.getUsersData().subscribe((data: UserResponse) => {
      this.allUsers = data.userList
      this.search('')
    })
  }

  search(term: string): void {
    this.searchTerms.next(term)
  }

  ngOnInit(): void {
    this.loadUserData()
    this.usersData = this.searchTerms.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      switchMap((term: string) =>
        of(this.allUsers.filter(item => item.userName.includes(term)))
      )
    )
  }
}
