import { Component, OnInit } from '@angular/core'
import { BehaviorSubject, Observable, of, Subject } from 'rxjs'
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators'
import { User, UserResponse } from 'src/app/shared/interfaces/user'
import { UserService } from 'src/app/core/services/user.service'
import { SortService } from 'src/app/core/services/sort.service'

@Component({
  selector: 'app-user-table',
  templateUrl: './user-table.component.html',
  styleUrls: ['./user-table.component.scss'],
})
export class UserTableComponent implements OnInit {
  allUsers: User[] = []
  userData!: User[]
  sortingColumn!: string

  private searchTerms = new Subject<string>()

  constructor(
    private userService: UserService,
    private sortService: SortService
  ) {}

  loadUserData(): void {
    this.userService.getUsersData().subscribe((data: UserResponse) => {
      this.allUsers = data.userList
      this.userData = this.allUsers
    })
  }

  search(term: string): void {
    this.searchTerms.next(term)
  }

  sort(key: string): void {
    let reverse = false
    if (this.sortingColumn === key) {
      reverse = true
      this.sortingColumn = ''
    } else {
      this.sortingColumn = key
    }

    this.userData = this.sortService.sortData<User>(this.userData, key, reverse)
  }

  ngOnInit(): void {
    this.loadUserData()
    this.searchTerms
      .pipe(
        debounceTime(300),
        distinctUntilChanged(),
        switchMap((term: string) =>
          of(this.allUsers.filter(item => item.userName.includes(term)))
        )
      )
      .subscribe(data => (this.userData = data))
  }
}
