import { NgModule } from '@angular/core';
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
import { ListDialogComponent } from './components/list-dialog/list-dialog.component';
import { TagsDialogComponent } from './components/tags-dialog/tags-dialog.component';
import { DestinationDialogComponent } from './components/destination-dialog/destination-dialog.component';
import { ListsService } from './services/lists.service';
import { TagsService } from './services/tags.service';
import { DestinationService } from './services/destination.service';



@NgModule({
  declarations: [
    AppComponent,
    TestComponent,
    SidebarComponent,
    ListDialogComponent,
    TagsDialogComponent,
    DestinationDialogComponent,
  ],


  imports: [
    BrowserModule,
    AppRoutingModule,
    SharedModule,
    BrowserAnimationsModule,
    CommonModule,
    FormsModule,
    HttpClientModule,
    // Wird für Übersetzung benötigt
    TranslateModule.forRoot({
      defaultLanguage: 'en',
      loader: {
        provide: TranslateLoader,
        useFactory: (createTranslateLoader),
        deps: [HttpClient]
      }
    }),
    LottieAnimModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(
    private listsService: ListsService,
    private tagsService: TagsService,
    private destinationsService: DestinationService) {
  } 
 }
// AoT erfordert eine exportierte Funktion für Factories.  
// LDie Lokalisierung wird aus dem Ordner assets/localization geladen.
// Benennungsschema: en.json | de.json | fr.json
export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/localization/', '.json');
}

