import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { IDestination } from 'src/app/models/destination.interface';
import { IList } from 'src/app/models/list.interface';
import { ITag } from 'src/app/models/tag.interface';
import { DestinationService } from 'src/app/services/destination.service';
import { ListsService } from 'src/app/services/lists.service';
import { TagsService } from 'src/app/services/tags.service';

@Component({
  selector: 'app-details-dialog',
  templateUrl: './details-dialog.component.html',
  styleUrls: ['./details-dialog.component.css']
})
export class DetailsDialogComponent {
  /**
   * Gets or sets opened destination.
   */
  public selectedDestination: IDestination | undefined;

  /**
   * Gets or sets list of all available lists.
   */
  public availableLists: IList[] = [];

  /**
   * Gets or sets list if all available tags.
   */
  public availableTags: ITag[] = [];

  constructor(
    private listsService: ListsService,
    private tagsService: TagsService,
    private destinationsService: DestinationService,
    public dialogRef: MatDialogRef<DetailsDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
      this.selectedDestination = data.destination;
      this.initializeData();
  }

  private initializeData(type: string | undefined = undefined, id: string | undefined = undefined): void {
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
   * Closes currently opened dialog.
   */
  public closeDialog(dialogResult: any = undefined): void {
    this.dialogRef.close(dialogResult);
  }
  /*** Deletes selected destination.
   */
  public deleteDestination(): void {
    this.destinationsService.deleteDestination(this.selectedDestination!);
    this.closeDialog({ action: 'delete', value: true });
  }
  /*
    Completes selected destination.
   */
  public completeDestination(destination: IDestination, complete: boolean): void {
    this.destinationsService.completeDestination(destination, complete);
    this.closeDialog();
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