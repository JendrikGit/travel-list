import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { IDestination } from 'src/app/models/destination.interface';
import { IList } from 'src/app/models/list.interface';
import { ITag } from 'src/app/models/tag.interface';
import { DestinationService } from 'src/app/services/destination.service';
import { ListsService } from 'src/app/services/lists.service';
import { TagsService } from 'src/app/services/tags.service';
import { trigger, state, style, animate, transition } from '@angular/animations';
import { ActivatedRoute } from '@angular/router';
import { DetailsDialogComponent } from '../dialogs/details-dialog/details-dialog.component';

@Component({
  selector: 'app-destinations',
  templateUrl: './destinations.component.html',
  styleUrls: ['./destinations.component.css']
})

export class DestinationsComponent {
  /**
 * Gets or sets if data is being loaded.
 */
  public isLoading: boolean = false;
  /**
   * Gets or sets list of all available lists.
   */
  public availableLists: IList[] = [];
  /**
   * Gets or sets list if all available tags.
   */
  public availableTags: ITag[] = [];
  /**
   * Gets or sets list of upcoming destinations.
   */
  public upcomingDestinations: IDestination[] = [];
  /**
 * Gets or sets list of upcoming destinations.
 */
  public pastDestinations: IDestination[] = [];
  /**
   * Gets or sets selected destination.
   */
  public selectedDestination: IDestination | undefined;
  constructor(
    private route: ActivatedRoute,
    private listsService: ListsService,
    private tagsService: TagsService,
    private destinationsService: DestinationService,
    public dialog: MatDialog) {
    // Check passed query params to check if we 
    // need to load all destinations or from specified list / tag.
    this.route.queryParams.subscribe(params => {
      this.isLoading = true;
      let type = params['type'];
      let id = params['id'];
      this.selectedDestination = undefined;
      
      this.initializeData(type, id);
    });
  }
  public ngOnInit(): void {
  }
  private initializeData(type: string | undefined = undefined, id: string | undefined = undefined): void {
    this.getUpcomingDestinations(type, id);
    this.getPastDestinations(type, id);
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
  }
  /**
   * Gets upcoming destinations.
   */
  private getUpcomingDestinations(type: string | undefined = undefined, id: string | undefined = undefined): void {
    setTimeout(() => {
      this.destinationsService.getUpcomingDestinations(type, id).subscribe(result => {
        this.upcomingDestinations = result.map((val) => {
          return val._data;
        });

      }, this.destinationsService.isInitialized ? 0 : 1000);

      if(type != undefined) {
        this.upcomingDestinations = this.upcomingDestinations.filter(x => type == 'list' ? (x.list.id == id) : (x.tag.id == id));
      }
  });
  }

  /**
   * Gets upcoming destinations.
   */
  private getPastDestinations(type: string | undefined = undefined, id: string | undefined = undefined): void {
    setTimeout(() => {
      this.destinationsService.getPastDestinations(type, id).subscribe(result => {
        this.pastDestinations = result.map((val) => {
          return val._data;
        });

        this.isLoading = false;
      }, this.destinationsService.isInitialized ? 0 : 1000);

      if(type != undefined) {
 this.pastDestinations = this.pastDestinations.filter(x => type == 'list' ? (x.list.id == id) : (x.tag.id == id));
      }
    });
  }
  /**
   * Deletes selected destination.
   */
  public deleteDestination(): void {
    this.destinationsService.deleteDestination(this.selectedDestination!);

  }
  /**
   * Completes selected destination.
   */
  public completeDestination(destination: IDestination, complete: boolean): void {
    this.destinationsService.completeDestination(destination, complete);
    this.selectedDestination = undefined;
  }

  /**
   * Sets tag for the destination.
   * @param tag 
   */
  public updateTag(tag: ITag): void {
    this.destinationsService.setTag(this.selectedDestination!, tag);
  }
  /**
   * Sets list for the destination.
   * @param list 
   */
  public updateList(list: IList): void {
    this.destinationsService.setList(this.selectedDestination!, list);
  }
  /**
   * Sets notes for the destination.
   * @param list 
   */
  public updateNotes(newValue: string): void {
    this.destinationsService.setNotes(this.selectedDestination!, newValue);
  }
  /**
   * Shows details dialog about selected destination
   * if display is in narrow mode.
   */
  public showDetailsDialog(destination: IDestination): void {
    let width = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
    if(width > 1200)
      return;
    this.dialog.open(DetailsDialogComponent, {
      data: { destination: destination}
    });
  }
}
