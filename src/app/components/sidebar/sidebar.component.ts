import { Component, ViewChild, NgZone } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { LottieAnimComponent } from 'lottie-anim';
import { AppComponent } from 'src/app/app.component';
import { IList } from 'src/app/models/list.interface';
import { ITag } from 'src/app/models/tag.interface';
import { DestinationService } from 'src/app/services/destination.service';
import { ListsService } from 'src/app/services/lists.service';
import { TagsService } from 'src/app/services/tags.service';
import { ListDialogComponent } from '../dialogs/list-dialog/list-dialog.component';
import { TagsDialogComponent } from '../dialogs/tags-dialog/tags-dialog.component';
@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent {
  /**
   * Light theme by default.
   */
  public isLightTheme: boolean = true;
  /**
   * Gets or sets list of all available lists.
   */
  public availableLists: IList[] = [];
  /**
   * Gets or sets list if all available tags.
   */
  public availableTags: ITag[] = [];
  /**
   * Gets or sets number of upcoming destinations.
   */
  public destinationCount: number = 0;
  constructor(
    private listsService: ListsService,
    private tagsService: TagsService,
    private destinationsService: DestinationService,
    public dialog: MatDialog) {
    // Get theme
    let settings = localStorage.getItem('theme');
    if (settings != undefined) {
      this.isLightTheme = settings == 'light' ? true : false;
      document.querySelector('html')?.setAttribute('data-theme', this.isLightTheme == true ? 'light' : 'dark');
    }

 this.initializeSidebar();
  }

  public ngAfterViewInit(): void {
  }

  private initializeSidebar(): void {
setTimeout(() => {
      this.listsService.getLists().subscribe(result => {
        this.availableLists = result.map((item) => {
          return item._data;
        })
      });
    }, this.listsService.isInitialized ? 0 : 1000);
setTimeout(() => {
      this.tagsService.getTags().subscribe(result => {
        this.availableTags = result.map((item) => {
          return item._data;
        })
      });
    }, this.tagsService.isInitialized ? 0 : 1000);

    setTimeout(() => {     
      this.destinationsService.getUpcomingDestinations().subscribe(result => {
        this.destinationCount = result.length;
      });
    }, this.destinationsService.isInitialized ? 0 : 1000);
}

  /**
   * Opens dialog for adding new list.
   */
  public openListDialog(): void {
    const dialogRef = this.dialog.open(ListDialogComponent);
    
  }
  /**
   * Opens dialog for adding new tag.
   */
  public openTagsDialog(): void {
    const dialogRef = this.dialog.open(TagsDialogComponent);
   
  }
  /**
   * Closes sidebar in narrow mode.
   */
  public closeSidebar(): void {
    AppComponent.isSidebarToggled = false;
  }
  /**
   * Toggles application theme.
   */
  public toggleTheme(light: boolean): void {
    this.isLightTheme = light;
    localStorage.setItem('theme', this.isLightTheme == true ? 'light' : 'dark');
    document.querySelector('html')?.setAttribute('data-theme', this.isLightTheme == true ? 'light' : 'dark');
  }
}