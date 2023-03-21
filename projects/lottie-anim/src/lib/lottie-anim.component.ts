import { Component, Input, NgZone } from '@angular/core';
import { AnimationItem } from 'lottie-web';
import { AnimationOptions } from 'ngx-lottie';

@Component({
  selector: 'lib-lottie-anim',
  template: `
    <ng-lottie (complete)="completed()" (animationCreated)="animationCreated($event)" [styles]="styles" [options]="options" [width]="width" [height]="height"></ng-lottie>
  `,
  styles: [
  ]
})
export class LottieAnimComponent {
  private animationItem: AnimationItem | undefined;
  private isCompleted: boolean = false;

  /**
   * Gets or sets styles for the animation container.
   */
  public styles: Partial<CSSStyleDeclaration> = {
    display: 'inline-block'
  };

  /**
   * Gets or sets animation options.
   */
  public options: AnimationOptions | null;

  /**
   * Gets or sets path to the animation file.
   */
  @Input() path: string | undefined;

  /**
   * Gets or sets width of the animation.
   */
  @Input() width: string | null;

  /**
   * Gets or sets height of the animation.
   */
  @Input() height: string | null;

  /**
   * Gets or sets if animation should be looped.
   */
  @Input() loop: boolean = false;

  /**
   * Gets or sets segments. 
   * First number is starting segment
   * Last number is ending segment.
   */
  @Input() segments: [number, number] | undefined;

  /**
   * Gets or sets if animation should be automatically played.
   */
  @Input() autoplay: boolean = true;

  constructor(private ngZone: NgZone) {
    this.options = null;
    this.width = null;
    this.height = null;
  }

  public ngAfterViewInit(): void {
    this.options = {
      path: this.path,
      loop: this.loop,
      initialSegment: this.segments,
      autoplay: this.autoplay
    }
  }

  /**
   * Event handler that is fired when last segment has been played.
   */
  public completed(): void {
    this.isCompleted = true;
  }

  /**
   * Event handler that is fired when animation has been created.
   * @param animationItem
   */
  public animationCreated(animationItem: AnimationItem): void {
    this.animationItem = animationItem;
  }

  /**
   * Goes to segment and plays animation from it.
   * @param segment 
   */
  public goToAndPlay(segment: number): void {
    if(this.isCompleted) {
      this.isCompleted = false;
      this.ngZone.runOutsideAngular(() => {
        this.animationItem?.goToAndPlay(segment);
      });  
    }
  }
}