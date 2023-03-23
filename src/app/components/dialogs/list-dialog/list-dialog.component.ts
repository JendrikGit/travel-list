import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Guid } from 'guid-ts';
import { ListsService } from 'src/app/services/lists.service';

@Component({
  selector: 'app-list-dialog',
  templateUrl: './list-dialog.component.html',
  styleUrls: ['./list-dialog.component.css']
})
export class ListDialogComponent {
  /**
   * Gets or sets name of the list.
   */
  public name: string = '';

  constructor(
    private listsSerivice: ListsService,
    public dialogRef: MatDialogRef<ListDialogComponent>) {
  }

  /**
   * Closes currently opened dialog.
   */
  public closeDialog(): void {
    this.dialogRef.close();
  }
  
  /**
   * Creates new list and saves it to database.
   */
  public createList(): void {
    // Check if list with the same name already exists.
    this.listsSerivice.getListsByName(this.name).subscribe(result => {
      if(result != null || result != undefined) {
        return;
      }

      this.listsSerivice.addList({
        id: Guid.newGuid().toString(),
        name: this.name
      });

      this.closeDialog();
    });
  }

    /**
   * Gets if list can be saved.
   * @returns 
   */
  public canSave(): boolean {
    if (this.name == '') {
      return false;
    }

    return true;
  }
}