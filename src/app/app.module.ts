import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { RouteReuseStrategy } from "@angular/router";

import { IonicModule, IonicRouteStrategy } from "@ionic/angular";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { IonicStorageModule } from '@ionic/storage-angular';
import { StorageService } from "./services/storage.service";
import { PreviewPipe } from './commom/pipes/preview/preview.pipe';


@NgModule({
  declarations: [AppComponent, PreviewPipe],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule, IonicStorageModule.forRoot()],
  providers: [
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    StorageService,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
