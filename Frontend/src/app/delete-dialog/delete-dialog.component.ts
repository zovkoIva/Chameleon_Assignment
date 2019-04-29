import { Component, OnInit } from '@angular/core';
import {MatDialog, MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
@Component({
  selector: 'app-delete-dialog',
  templateUrl: './delete-dialog.component.html',
  styleUrls: ['./delete-dialog.component.css']
})
export class DeleteDialogComponent implements OnInit {

  deleteAllDone: boolean=false;
  constructor(public dialogRef: MatDialogRef<DeleteDialogComponent>) { }

  ngOnInit() {
  }
  onNoClick(): void {
    this.dialogRef.close();
  }
  onYesClick(){
   this.deleteAllDone=true;
   this.dialogRef.close(this.deleteAllDone);
  };
}
