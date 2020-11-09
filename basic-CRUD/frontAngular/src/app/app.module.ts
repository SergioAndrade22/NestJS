import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FlexLayoutModule } from '@angular/flex-layout';

// Material Components
import { MatButtonModule } from "@angular/material/button";
import { MatDividerModule } from "@angular/material/divider";
import { MatIconModule } from "@angular/material/icon";
import { MatMenuModule } from "@angular/material/menu";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";
import { MatTableModule } from "@angular/material/table";
import { MatToolbarModule } from "@angular/material/toolbar";
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

// Okta Authentication
import { OKTA_CONFIG, OktaAuthModule } from '@okta/okta-angular';

// Aplication imports
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ProductsComponent } from './components/products/products.component';
import { HomeComponent } from './components/home/home.component';
import { ProductsService } from './services/products.service';

const config = {
  clientId: '0oalvb0qvYCWjX6xf5d5',
  issuer: 'https://dev-6803287.okta.com/oauth2/default',
  redirectUri: 'http://localhost:4200/implicit/callback',
  scopes: ['openid', 'profile', 'email'],
  pkce: true
};

@NgModule({
  declarations: [
    AppComponent,
    ProductsComponent,
    HomeComponent
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FlexLayoutModule,
    MatToolbarModule,
    MatMenuModule,
    MatIconModule,
    MatButtonModule,
    MatTableModule,
    MatDividerModule,
    MatProgressSpinnerModule,
    FormsModule,
    OktaAuthModule
  ],
  providers: [
    { provide: OKTA_CONFIG, useValue: config },
    ProductsService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }