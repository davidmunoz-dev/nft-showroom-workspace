import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NftListComponent } from './modules/nft-list/nft-list.component';
import {NftService} from '@workspace/nft/services/nft.service';
import {HttpClientModule} from '@angular/common/http';
import {ReactiveFormsModule} from '@angular/forms';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {WantlistService} from '@workspace/wantlist/services/wantlist.service';
import {UserService} from '@workspace/user/services/user.service';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { NftComponent } from './modules/nft-list/nft/nft.component';
import { ToolbarComponent } from './modules/layouts/toolbar/toolbar.component';
import {AvatarModule} from 'ngx-avatar';
import { WantlistComponent } from './modules/nft-list/wantlist/wantlist.component';
import {MatDividerModule} from '@angular/material/divider';
import {MatMenuModule} from '@angular/material/menu';

@NgModule({
  declarations: [
    AppComponent,
    NftListComponent,
    NftComponent,
    ToolbarComponent,
    WantlistComponent,
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    AvatarModule,
    MatProgressSpinnerModule,
    MatDividerModule,
    MatMenuModule
  ],
  providers: [
    NftService,
    WantlistService,
    UserService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
