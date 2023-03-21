import { NgModule } from '@angular/core';
import { LottieAnimComponent } from './lottie-anim.component';

import { LottieModule } from 'ngx-lottie';
import player from 'lottie-web';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    LottieAnimComponent
  ],
  imports: [
    LottieModule.forRoot({ player: playerFactory })
  ],
  exports: [
    LottieAnimComponent
  ]
})
export class LottieAnimModule { }

// Note we need a separate function as it's required
// by the AOT compiler.
export function playerFactory() {
  return player;
}