import { Component } from '@angular/core';
import { IDestination } from 'src/app/models/destination.interface';
import { IList } from 'src/app/models/list.interface';
import { ITag } from 'src/app/models/tag.interface';
import { DestinationService } from 'src/app/services/destination.service';
import { ListsService } from 'src/app/services/lists.service';
import { TagsService } from 'src/app/services/tags.service';

@Component({
  selector: 'app-destinations',
  templateUrl: './destinations.component.html',
  styleUrls: ['./destinations.component.css']
})
export class DestinationsComponent {
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
    private listsService: ListsService,
    private tagsService: TagsService,
    private destinationsService: DestinationService) {
    setTimeout(() => {
      this.initializeData();
    }, 1000);
  }

  public ngOnInit(): void {
  }

  private initializeData(): void {
    this.getUpcomingDestinations();
    this.getPastDestinations();

    this.listsService.getLists().subscribe(result => {
      this.availableLists = result.map((item) => {
        return item._data;
      })
    });

    this.tagsService.getTags().subscribe(result => {
      this.availableTags = result.map((item) => {
        return item._data;
      })
    });
  }

  /**
   * Gets upcoming destinations.
   */
  private getUpcomingDestinations(): void {
    this.destinationsService.getUpcomingDestinations().subscribe(result => {
      this.upcomingDestinations = result.map((val) => {
        return val._data;
      });
    });
  }

  /**
   * Gets upcoming destinations.
   */
  private getPastDestinations(): void {
    this.destinationsService.getUpcomingDestinations().subscribe(result => {
      this.upcomingDestinations = result.map((val) => {
        return val._data;
      });
    });
  }
}
