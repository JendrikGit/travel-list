import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/modules/shared/shared.module';
import { DestinationRoutingModule } from './destinations-routing.module';
import { DestinationsComponent } from './destinations.component';


@NgModule({
  declarations: [
    DestinationsComponent
  ],
  imports: [
    DestinationRoutingModule,
    SharedModule
  ],
  providers: [],
  bootstrap: []
})
export class DestinationModule { }