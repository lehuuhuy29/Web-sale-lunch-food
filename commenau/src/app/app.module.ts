import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FooterComponent } from './footer/footer.component';
import { BodyComponent } from './body/body.component';
import { HeaderMenuComponent } from './header-menu/header-menu.component';
import { HeaderVipComponent } from './header-vip/header-vip.component';

@NgModule({
  declarations: [
    AppComponent,
    FooterComponent,
    BodyComponent,
    HeaderMenuComponent,
    HeaderVipComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
