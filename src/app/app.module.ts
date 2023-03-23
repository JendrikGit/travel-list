import { NgModule, isDevMode } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { CommonModule } from '@angular/common';
import { LottieAnimModule } from 'lottie-anim';
import { FormsModule } from '@angular/forms';
import { SharedModule } from './modules/shared/shared.module';
import { ListDialogComponent } from './components/dialogs/list-dialog/list-dialog.component';
import { TagsDialogComponent } from './components/dialogs/tags-dialog/tags-dialog.component';
import { DestinationDialogComponent } from './components/dialogs/destination-dialog/destination-dialog.component';
import { ListsService } from './services/lists.service';
import { TagsService } from './services/tags.service';
import { DestinationService } from './services/destination.service';
import { DetailsDialogComponent } from './components/dialogs/details-dialog/details-dialog.component';
import { ServiceWorkerModule } from '@angular/service-worker';

@NgModule({
  declarations: [
    AppComponent,
    SidebarComponent,
    ListDialogComponent,
    TagsDialogComponent,
    DestinationDialogComponent,
 DetailsDialogComponent
 ],
  imports: [
    CommonModule,
    SharedModule,
    FormsModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    // Module needed for translation
    TranslateModule.forRoot({
      defaultLanguage: 'en',
      loader: {
        provide: TranslateLoader,
        useFactory: (createTranslateLoader),
        deps: [HttpClient]
      }
    }),
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: !isDevMode(),
      // Register the ServiceWorker as soon as the application is stable
      // or after 30 seconds (whichever comes first).
      registrationStrategy: 'registerWhenStable:30000'
    }),
  
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { 

}
// AoT requires an exported function for factories.
// Localization will be loaded from assets/localization folder.
// Naming scheme: en.json | de.json | fr.json
export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/localization/', '.json');
}