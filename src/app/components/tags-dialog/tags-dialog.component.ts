import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-tags-dialog',
  templateUrl: './tags-dialog.component.html',
  styleUrls: ['./tags-dialog.component.css']
})
export class TagsDialogComponent {
  constructor(public dialogRef: MatDialogRef<TagsDialogComponent>) {
  }

  /**
   * Closes currently opened dialog.
   */
  public closeDialog(): void {
    this.dialogRef.close();
  }
}