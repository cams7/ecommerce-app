import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AboutUsComponent } from './about-us/about-us.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

const routes: Routes = [
  { path: 'about-us', component: AboutUsComponent },
  {
    path: 'home',
    loadChildren: 'app/home/home.module#HomeModule'
  },
  {
    path: 'blog',
    loadChildren: 'app/blog/blog.module#BlogModule'
  },
  {
    path: 'contact',
    loadChildren: 'app/contact/contact.module#ContactModule'
  },
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash: true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
