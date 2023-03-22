import { Component, ViewChild, NgZone } from '@angular/core';
import { LottieAnimComponent } from 'lottie-anim';
import { MatDialog } from '@angular/material/dialog';
import { ListDialogComponent } from '../list-dialog/list-dialog.component';
import { TagsDialogComponent } from '../tags-dialog/tags-dialog.component';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent {


  constructor(public dialog: MatDialog) {
  
  }

  public ngAfterViewInit(): void {
   
}

public dialog: MatDialog

   /*Opens dialog for adding new list.
   */
  public openListDialog(): void {
    const dialogRef = this.dialog.open(ListDialogComponent);

    dialogRef.afterClosed().subscribe(result => {
    });
  }

    /*
    Opens dialog for adding new tag.
   */

    public openTagsDialog(): void {
      const dialogRef = this.dialog.open(TagsDialogComponent);

      dialogRef.afterClosed().subscribe(result => {
      });
    }
}
