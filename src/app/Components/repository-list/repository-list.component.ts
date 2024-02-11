import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-repository-list',
  templateUrl: './repository-list.component.html',
  styleUrls: ['./repository-list.component.scss'],
})
export class RepositoryListComponent implements OnInit {
  constructor(private route: ActivatedRoute, private apiService: ApiService) {}

  loading: boolean = false;
  username: string = '';
  user: any = {};
  currentPage: number = 1;
  selectedPageSize: number = 10;
  pageSizes: number[] = [10, 20, 50, 100];
  totalPages: number = 0;

  ngOnInit(): void {
    this.route.params.subscribe((data) => {
      this.username = data['username'];
      this.loadcheck();
    });
  }

  loadcheck(page: number = 1) {
    this.loading = true;
    this.apiService.getUser(this.username).subscribe(
      (userData: any) => {
        console.log('User API Response:', userData);
        this.user = userData;

        this.apiService
          .getRepos(this.username, page, this.selectedPageSize)
          .subscribe(
            (reposData: any[]) => {
              console.log('Repos API Response:', reposData);
              this.user.repositories = reposData;
              this.currentPage = page;
              this.totalPages = Math.ceil(
                userData.public_repos / this.selectedPageSize
              );
              this.loading = false;
            },
            (error) => {
              console.error('Repos API Error:', error);
              this.loading = false;
            }
          );
      },
      (error) => {
        console.error('User API Error:', error);
        this.loading = false;
      }
    );
  }

  getPageNumbers(): number[] {
    const totalPages = this.totalPages;
    const pages: number[] = [];

    for (let i = 1; i <= Math.min(totalPages, 10); i++) {
      pages.push(i);
    }

    return pages;
  }
}
