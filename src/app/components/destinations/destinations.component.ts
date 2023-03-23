import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { IDestination } from 'src/app/models/destination.interface';
import { IList } from 'src/app/models/list.interface';
import { ITag } from 'src/app/models/tag.interface';
import { DestinationService } from 'src/app/services/destination.service';
import { ListsService } from 'src/app/services/lists.service';
import { TagsService } from 'src/app/services/tags.service';
import { AnimDialogComponent } from '../dialogs/anim-dialog/anim-dialog.component';
import { trigger, state, style, animate, transition } from '@angular/animations';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-destinations',
  templateUrl: './destinations.component.html',
  styleUrls: ['./destinations.component.css'],
  animations: [
    // the scale/fade-in/fade-out animation.
    trigger('scaleFadeAnimation', [

      // the "in" style determines the "resting" state of the element when it is visible.
 state('in', style({ opacity: 1 })),

      // fade in when created. this could also be written as transition('void => *')
      transition(':enter', [
 style({ opacity: 0 }),
        animate(200)
      ]),

      // fade out when destroyed. this could also be written as transition('void => *')
      transition(':leave',
animate(300, style({ opacity: 0, transform: 'scale(0.7)' })))
    ])
  ]
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

      setTimeout(() => {
        this.isLoading = false;
        this.initializeData(type, id);
      }, 1000);

    });
 }

  public ngOnInit(): void {
  }
 private initializeData(type: string | undefined = undefined, id: string | undefined = undefined): void {
    this.getUpcomingDestinations(type, id);
    this.getPastDestinations(type, id);


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
  private getUpcomingDestinations(type: string | undefined = undefined, id: string | undefined = undefined): void {
    this.destinationsService.getUpcomingDestinations(type, id).subscribe(result => {
      this.upcomingDestinations = result.map((val) => {
        return val._data;
      });

      if(type != undefined) {
        this.upcomingDestinations = this.upcomingDestinations.filter(x => type == 'list' ? (x.list.id == id) : (x.tag.id == id));
      }

      this.selectedDestination = this.upcomingDestinations[0];
    });
  }

  /**
   * Gets upcoming destinations.
   */
 private getPastDestinations(type: string | undefined = undefined, id: string | undefined = undefined): void {
    this.destinationsService.getPastDestinations(type, id).subscribe(result => {
      this.pastDestinations = result.map((val) => {
        return val._data;
      });

      if(type != undefined) {
        this.upcomingDestinations = this.upcomingDestinations.filter(x => type == 'list' ? (x.list.id == id) : (x.tag.id == id));
      }
    });
  }

  /**
   * Deletes selected destination.
   */
  public deleteDestination(): void {
    this.destinationsService.deleteDestination(this.selectedDestination!);
    // Play animation
    this.dialog.open(AnimDialogComponent, {
      data: 'delete'
    });
  }
  /**
   * Completes selected destination.
   */
  public completeDestination(destination: IDestination, complete: boolean): void {
    this.destinationsService.completeDestination(destination, complete);
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
}