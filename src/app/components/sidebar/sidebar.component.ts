import { Component, ViewChild, NgZone } from '@angular/core';
import { LottieAnimComponent } from 'lottie-anim';


@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent {

  @ViewChild('homeAnimation') homeAnimation: LottieAnimComponent | undefined;
  @ViewChild('listAnimation') listAnimation: LottieAnimComponent | undefined;
  @ViewChild('privacyAnimation') privacyAnimation: LottieAnimComponent | undefined;
  @ViewChild('downloadAnimation') downloadAnimation: LottieAnimComponent | undefined;

  constructor() {
  }

  public ngAfterViewInit(): void {
    this.attachHoverEvents();
  }

  private attachHoverEvents(): void {
    document.getElementById('home-item')?.addEventListener('mouseover', () => {
      this.homeAnimation?.goToAndPlay(0);
    });

    document.getElementById('list-item')?.addEventListener('mouseover', () => {
      this.listAnimation?.goToAndPlay(0);
    });

    document.getElementById('privacy-item')?.addEventListener('mouseover', () => {
      this.privacyAnimation?.goToAndPlay(0);
    });

    document.getElementById('download-item')?.addEventListener('mouseover', () => {
      this.downloadAnimation?.goToAndPlay(0);
    });
  }

}
