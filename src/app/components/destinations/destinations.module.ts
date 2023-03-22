import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/modules/shared.module';
import { DestinationRoutingModule } from './destination-routing.module';
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