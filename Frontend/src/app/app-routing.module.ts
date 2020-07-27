import {NgModule} from '@angular/core';
import {Routes, RouterModule, ExtraOptions} from '@angular/router';

const routes: Routes = [
  {path: 'home', loadChildren: () => import('./main/home/home.module').then(m => m.HomeModule)},
  {path: 'plans', loadChildren: () => import('./main/plan/plan.module').then(m => m.PlanModule)},
  {path: 'auth', loadChildren: () => import('./main/auth/auth.module').then(m => m.AuthModule)},
  {path: 'tag', loadChildren: () => import('./main/tag/tag.module').then(m => m.TagModule)},
  {path: 'users', loadChildren: () => import('./main/user/user.module').then(m => m.UserModule)},
  {path: '', redirectTo: 'home', pathMatch: 'full'}
];

const routerOption: ExtraOptions = {
  useHash: false,
  anchorScrolling: 'enabled'
};

@NgModule({
  imports: [RouterModule.forRoot(routes, routerOption)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
