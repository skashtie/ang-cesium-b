import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
/**ntgModel */
import { FormsModule } from '@angular/forms';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
// import { CesiumDirective } from './cesium.directive';
import { DashboardComponent } from './dashboard/dashboard.component';
import { MapComponent } from './map/map.component';
import { LoginComponent } from './login/login.component';
/**primeng  */
import {SidebarModule} from 'primeng/sidebar';
import {ButtonModule} from 'primeng/button';
import {MenubarModule} from 'primeng/menubar';


/**primeng animation */
// import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { CesiumMapComponent } from './cesium-map/cesium-map.component';

@NgModule({
  declarations: [
    AppComponent,
    // CesiumDirective,
    DashboardComponent,
    MapComponent,
    LoginComponent,
    CesiumMapComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SidebarModule,
    BrowserAnimationsModule,
    ButtonModule,
    MenubarModule,
    FormsModule
    ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
