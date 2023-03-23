import { Component } from '@angular/core';
import { DestinationService } from 'src/app/services/destination.service';
import { Guid } from 'guid-ts';
import { MatDialog } from '@angular/material/dialog';
import { DestinationDialogComponent } from '../dialogs/destination-dialog/destination-dialog.component';
import { IDestination } from 'src/app/models/destination.interface';
import * as moment from 'moment';
import { DetailsDialogComponent } from '../dialogs/details-dialog/details-dialog.component';
import { trigger, state, style, animate, transition } from '@angular/animations';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent {
  /**
   * Gets or sets if data is being loaded.
   */
  public isLoading: boolean = false;
  /**
   * Gets or sets name of the new destination.
   */
  public newDestinationName: string  | undefined;
  /**
   * Gets or sets list of upcoming destinations.
   */
  public upcomingDestinations: IDestination[] = [];
  /**
   * Gets or sets current date.
   */
  public currentDate: Date = new Date();
  constructor(
    private destinationsService: DestinationService,
    public dialog: MatDialog) {
      this.isLoading = true;
      this.getUpcomingDestinations();
  }
  public ngOnInit(): void {   
  }
  /**
   * Gets upcoming destinations.
   */
  private getUpcomingDestinations(): void {
    setTimeout(() => {
      this.destinationsService.getUpcomingDestinations().subscribe(result => {
        this.upcomingDestinations = result.map((val) => {
          return val._data;
        });
      });
      this.isLoading = false;
    }, this.destinationsService.isInitialized ? 0 : 1000);
  }
  /**
   * Opens dialog for adding new destination.
   */
  public openDestinationsDialog(): void {
    const dialogRef = this.dialog.open(DestinationDialogComponent, {
      data: { destination: this.newDestinationName }
    });
  }

  /**
   * Gets current day name.
   */
  public getCurrentDay(): string {
    return moment(this.currentDate).format('ddd')
  }
  /**
   * Gets current date.
   */
  public getCurrentDate(): string {
    return moment(this.currentDate).format('DD')
  }
  /**
   * Gets current month name.
   */
  public getCurrentMonth(): string {
    return moment(this.currentDate).format('MMMM')
  }
  /**
   * Opens details dialog about destination.
   * @param destination 
   */
  public openDetailsDialog(destination: IDestination): void {
    const dialogRef = this.dialog.open(DetailsDialogComponent, {
      data: { destination: destination }
    });
 }

  /**
   * Completes selected destination.
   */
  public completeDestination(destination: IDestination, complete: boolean): void {
    this.destinationsService.completeDestination(destination, complete);
  }
}