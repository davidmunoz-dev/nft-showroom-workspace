import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {NftListComponent} from './modules/nft-list/nft-list.component';
import {WantlistComponent} from './modules/nft-list/wantlist/wantlist.component';

const routes: Routes = [
  {path: '', pathMatch: 'full', redirectTo: 'auth/login'},
  {path: 'nft-list', component: NftListComponent},
  {path: 'nft-list/wantlist', component: WantlistComponent},
  {
    path: 'auth',
    loadChildren: () => import('./modules/auth/auth.module').then(m => m.AuthModule),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
