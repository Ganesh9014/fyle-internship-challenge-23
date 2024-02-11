import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-search',
  templateUrl: './user-search.component.html',
  styleUrls: ['./user-search.component.scss'],
})
export class UserSearchComponent {
  public searchUsername: string = '';
  public userNotFound: boolean = false;

  constructor(private router: Router) {}

  public search() {
    if (this.searchUsername.trim() !== '') {
      this.router.navigate(['/repositories', this.searchUsername]);
    } else {
      this.userNotFound = true;
    }
  }
}
