import { Component } from '@angular/core';
import { DestinationService } from 'src/app/services/destination.service';
import { Guid } from 'guid-ts';
import { MatDialog } from '@angular/material/dialog';
import { DestinationDialogComponent } from '../destination-dialog/destination-dialog.component';
import { IDestination } from 'src/app/models/destination.interface';
import * as moment from 'moment';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
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
      setTimeout(() => {
        this.getUpcomingDestinations();
      }, 1000);
  }

  public ngOnInit(): void {

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
   * Opens dialog for adding new destination.
   */
  public openDestinationsDialog(): void {
    const dialogRef = this.dialog.open(DestinationDialogComponent, {
      data: { destination: this.newDestinationName }
    });

    dialogRef.afterClosed().subscribe(result => {
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

}
