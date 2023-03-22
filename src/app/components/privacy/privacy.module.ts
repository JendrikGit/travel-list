import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/modules/shared/shared.module';
import { PrivacyRoutingModule } from './privacy-routing.module';
import { PrivacyComponent } from './privacy.component';


@NgModule({
  declarations: [
    PrivacyComponent
  ],
  imports: [
    PrivacyRoutingModule,
    SharedModule
  ],
  providers: [],
  bootstrap: []
})
export class PrivacyModule { }