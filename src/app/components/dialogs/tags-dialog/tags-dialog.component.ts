import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Guid } from 'guid-ts';
import { TagsService } from 'src/app/services/tags.service';

@Component({
  selector: 'app-tags-dialog',
  templateUrl: './tags-dialog.component.html',
  styleUrls: ['./tags-dialog.component.css']
})
export class TagsDialogComponent {
    /**
   * Gets or sets name of the tag.
   */
    public name: string = '';


    constructor(
      private tagsService: TagsService,
      public dialogRef: MatDialogRef<TagsDialogComponent>) {
  }

  /**
   * Closes currently opened dialog.
   */
  public closeDialog(): void {
    this.dialogRef.close();
  }
  
  /**
   * Creates new tag and saves it to database.
   */
  public createTag(): void {
    // Check if list with the same name already exists.
    this.tagsService.getTagByName(this.name).subscribe(result => {
      if(result != null || result != undefined) {
        return;
      }

      this.tagsService.addTag({
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