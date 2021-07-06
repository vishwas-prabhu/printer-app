import { Component, OnInit } from '@angular/core'
import { of, Subject } from 'rxjs'
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
  sortedColumn!: string

  searchTerms = new Subject<string>()

  constructor(
    private userService: UserService,
    private sortService: SortService
  ) {}

  /**
   * Load the user data from the API
   */
  loadUserData(): void {
    this.userService.getUsersData().subscribe((data: UserResponse) => {
      this.allUsers = data.userList
      this.userData = this.allUsers
    })
  }

  /**
   * Clears the previous search key and updates with new key
   * @param term key term for filtering the data
   *
   * Function used for updating the subject variable searchTerms
   */
  search(term: string): void {
    this.searchTerms.next(term)
  }

  /**
   * Sorts the user table data based on key
   * @param key represents the column on which sorting should be done
   */
  sort(key: string): void {
    // tslint:disable-next-line: whitespace
    ;[this.userData, this.sortedColumn] = this.sortService.sortData<User>(
      this.userData,
      key,
      this.sortedColumn
    )
  }

  ngOnInit(): void {
    this.loadUserData()

    // Subscribe to the subject variable
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
