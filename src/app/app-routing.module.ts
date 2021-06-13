import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { UserComponent } from './user/user.component';
import { HomeComponent } from './home/home.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BookmarksComponent } from './bookmarks/bookmarks.component';
import { SearchComponent } from './search/search.component';
import { LoggedInGuard } from 'ngx-auth-firebaseui';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },

  { path: 'home', component: HomeComponent,
   data: { animationState: 'One' }},

  { path: 'search',
   component: SearchComponent,
   canActivate: [LoggedInGuard],
    data: { animationState: 'Two' }},

  { path: 'bookmarks',
   component: BookmarksComponent,
   canActivate: [LoggedInGuard],
   data: { animationState: 'Three' }},

  { path: 'user',
  component: UserComponent,
  canActivate: [LoggedInGuard],
  data: { animationState: 'Four' }},

  { path: 'register',
  component: RegisterComponent,
  data: { animationState: 'Five' }},

  { path: 'login',
  component: LoginComponent,
  data: { animationState: 'Six' }},

];

@NgModule({
  imports: [RouterModule.forRoot(routes, {onSameUrlNavigation: 'reload'})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
