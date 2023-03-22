import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-list-dialog',
  templateUrl: './list-dialog.component.html',
  styleUrls: ['./list-dialog.component.css']
})
export class ListDialogComponent {
  constructor(public dialogRef: MatDialogRef<ListDialogComponent>) {
  }

  /**
   * Closes currently opened dialog.
   */
  public closeDialog(): void {
    this.dialogRef.close();
  }
}