import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { Guid } from 'guid-ts';
import { IList } from 'src/app/models/list.interface';
import { ITag } from 'src/app/models/tag.interface';
import { DestinationService } from 'src/app/services/destination.service';
import { ListsService } from 'src/app/services/lists.service';
import { TagsService } from 'src/app/services/tags.service';
import * as moment from 'moment';

@Component({
  selector: 'app-destination-dialog',
  templateUrl: './destination-dialog.component.html',
  styleUrls: ['./destination-dialog.component.css']
})
export class DestinationDialogComponent {
  /**
   * Gets or sets name of the destination.
   */
  public destinationName: string = '';

  /**
   * Gets or sets name of the continent.
   */
  public continentName: string = '';

  /**
   * Gets or sets selected list.
   */
  public list: IList | undefined;

  /**
   * Gets or sets selected tag.
   */
  public tag: ITag | undefined;

  /**
   * Gets or sets list of all available lists.
   */
  public availableLists: IList[] = [];

  /**
   * Gets or sets list if all available tags.
   */
  public availableTags: ITag[] = [];

  constructor(
    private destinationsService: DestinationService,
    private listsService: ListsService,
    private tagsService: TagsService,
    public dialogRef: MatDialogRef<DestinationDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {

    this.initializeDialog();
  }

  private initializeDialog(): void {
    this.destinationName = this.data.destination; // We use name that was passed from home page.

    this.listsService.getLists().subscribe(result => {
      this.availableLists = result.map((item) => {
        return item._data;
      })
      console.log(this.availableLists);
    });

    this.tagsService.getTags().subscribe(result => {
      this.availableTags = result.map((item) => {
        return item._data;
      })
    });
  }

  /**
   * Closes currently opened dialog.
   */
  public closeDialog(): void {
    this.dialogRef.close();
  }

  /**
   * Saves destination to database.
   */
  public saveDestination(): void {
    // Check if required fields are provided.
    if (this.destinationName == '' || this.continentName == '' ||
      this.tag == undefined || this.list == undefined) {
      return;
    }

    this.destinationsService.addDestination({
      id: Guid.newGuid().toString(),
      createdAt: moment().format('DD.MM.yyyy hh:mm:ss'),
      destination: this.destinationName,
      done: false,
      tag: this.tag!,
      list: this.list!,
      continent: this.continentName!,
      notes: ''
    });

    this.closeDialog();
  }

  /**
   * Gets if destination can be saved.
   * @returns 
   */
  public canSave(): boolean {
    if (this.destinationName == '' || this.continentName == '' ||
      this.tag == undefined || this.list == undefined) {
      return false;
    }

    return true;
  }
}