// app-routing.module.ts

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserSearchComponent } from './Components/user-search/user-search.component';
import { RepositoryListComponent } from './Components/repository-list/repository-list.component';
const routes: Routes = [
  { path: '', redirectTo: '/user-search', pathMatch: 'full' },

  { path: 'user-search', component: UserSearchComponent },
  { path: 'repositories/:username', component: RepositoryListComponent },
  { path: '**', redirectTo: '/user-search', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
