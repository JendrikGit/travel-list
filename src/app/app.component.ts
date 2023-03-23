import { Component } from '@angular/core';
import { DestinationService } from './services/destination.service';
import { ListsService } from './services/lists.service';
import { TagsService } from './services/tags.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent { 
  /**
 * Gets or sets if sidebar is toggled in narrow mode.
 */
  public static isSidebarToggled: boolean = false;

  get isSidebarToggled(): boolean {
    return AppComponent.isSidebarToggled;
  }
    /**
   * Toggles sidebar on or off.
   */
    public toggleSidebar(): void {
      AppComponent.isSidebarToggled = !AppComponent.isSidebarToggled;
    }
}

