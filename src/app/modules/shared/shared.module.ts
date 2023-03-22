import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatInputModule} from '@angular/material/input'
import {MatRippleModule} from '@angular/material/core';
import {MatChipsModule} from '@angular/material/chips';
import {MatButtonModule} from '@angular/material/button';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatIconModule} from '@angular/material/icon';


/**
 * Shared module that is imported by lazy loaded modules.
 */
@NgModule({
  declarations: [],
  imports: [],
  exports: [
    CommonModule,
    TranslateModule,
    MatCheckboxModule,
    MatInputModule,
    MatRippleModule,
    MatChipsModule,
    MatButtonModule,
    MatExpansionModule,
    MatIconModule
  ],
  providers: [],
  bootstrap: []
})
export class SharedModule {
}