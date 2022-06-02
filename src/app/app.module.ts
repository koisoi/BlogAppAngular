import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { AuthModule } from './auth/auth.module';
import { AppRoutingModule } from './app-routing.module';

import { UsersService } from './shared/services/users.service';
import { SystemModule } from './system/system.module';
import { DatePipe } from '@angular/common';
import { PostsService } from './shared/services/posts.service';
import { SharedModule } from './shared/shared.module';
import { SystemRoutingModule } from './system/system-routing.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AuthModule,
    AppRoutingModule,
    SystemModule,
    SystemRoutingModule,
    HttpClientModule,
    SharedModule
  ],
  providers: [
    UsersService,
    PostsService,
    DatePipe
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
