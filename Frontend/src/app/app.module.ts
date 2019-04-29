import { BrowserModule } from '@angular/platform-browser';
import { NgModule, Directive } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FlexLayoutModule } from '@angular/flex-layout';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { MatDialogModule } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import {ImageService} from './to-do/image.service';
import {ItemService} from './to-do/item.service';
import {
  MatButtonModule,
  MatDividerModule,
  MatIconModule,
  MatMenuModule,
  MatProgressSpinnerModule,
  MatTableModule,
  MatToolbarModule,
  MatCheckboxModule,
  MatListModule,
  MatCardModule,
} from '@angular/material';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ToDoComponent } from './to-do/to-do.component';
import { ModalDialogComponent } from './modal-dialog/modal-dialog.component';
import { DeleteDialogComponent } from './delete-dialog/delete-dialog.component';

@NgModule({
  declarations: [
    AppComponent,
    ToDoComponent,
    ModalDialogComponent,
    DeleteDialogComponent,
  ],
  entryComponents: [
    ModalDialogComponent,
    DeleteDialogComponent],

  imports: [
    CommonModule,
    AppRoutingModule,
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FlexLayoutModule,
    MatToolbarModule,
    MatMenuModule,
    MatIconModule,
    MatButtonModule,
    MatTableModule,
    MatDividerModule,
    MatProgressSpinnerModule,
    MatCheckboxModule,
    MatListModule,
    MatCardModule,
    FormsModule,
    DragDropModule,
    MatDialogModule,
  ],
  providers: [ItemService,ImageService],
  bootstrap: [AppComponent]
})
export class AppModule { }