import { NgModule, isDevMode } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TestComponent } from './components/test/test.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { CommonModule } from '@angular/common';
import { LottieAnimModule } from 'lottie-anim';
import { FormsModule } from '@angular/forms';
import { DestinationsComponent } from './components/destinations/destinations.component';
import { DownloadComponent } from './components/download/download.component';
import { HomeComponent } from './components/home/home.component';
import { PrivacyComponent } from './components/privacy/privacy.component';
import { SharedModule } from './modules/shared/shared.module';
import { ServiceWorkerModule } from '@angular/service-worker';



@NgModule({
  declarations: [
    AppComponent,
    SidebarComponent,
    ListDialogComponent,
    TagsDialogComponent,
    DestinationDialogComponent,
    AnimDialogComponent,
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
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})


export class AppModule {   constructor(
  private listsService: ListsService,
  private tagsService: TagsService,
  private destinationsService: DestinationService) {
}}
// AoT erfordert eine exportierte Funktion für Factories.  
// LDie Lokalisierung wird aus dem Ordner assets/localization geladen.
// Benennungsschema: en.json | de.json | fr.json
export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/localization/', '.json');
}

