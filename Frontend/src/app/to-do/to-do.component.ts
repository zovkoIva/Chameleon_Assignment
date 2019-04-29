import { Component, OnInit, HostListener } from '@angular/core';
import { MatTableDataSource, MatDialog, MatMenu } from '@angular/material';
import { ItemService } from './item.service';
import { ImageService } from './image.service';
import { Item } from './item';
import { FormGroup, FormBuilder } from '@angular/forms';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop'
import { ModalDialogComponent } from '../modal-dialog/modal-dialog.component';
import { DeleteDialogComponent } from '../delete-dialog/delete-dialog.component';
import { $ } from 'protractor';



@Component({
  selector: 'app-to-do',
  templateUrl: './to-do.component.html',
  styleUrls: ['./to-do.component.css']
})
export class ToDoComponent implements OnInit {
  // displayedColumns: string[] = ['name', 'description', 'edit', 'delete'];
  //dataSource = new MatTableDataSource<any>();
  todoImg: any[] = new Array();
  //todo: Item[] = new Array();
  //done: Item[] = new Array();
  doneImg: any[] = new Array();
  itemsForm: any;
  selectedItem: Item = new Item();
  loading = false;
  checkboxFormGroup: FormGroup;
  imgURL: any;
  deleteAllDone: boolean = false;
  allowedAdd: boolean = true;
  innerWidth: number = 0;
  @HostListener('window:resize') onResize() {
    this.innerWidth = window.innerWidth;
    if (this.innerWidth < 600) {
      var element1 = document.getElementById("todo");
      var element2 = document.getElementById("done");
      var element3 = document.getElementById("container");
      var element4 = document.getElementById("subtitle");
      element4.classList.remove("subtitle");
      element3.classList.add("responsive_container");
      element1.classList.add("mobile");
      element2.classList.add("mobile");
    }
    else {

      var element1 = document.getElementById("todo");
      var element2 = document.getElementById("done");
      var element3 = document.getElementById("container");
      var element4 = document.getElementById("subtitle");
      element4.classList.add("subtitle");
      element3.classList.remove("responsive_container");
      element1.classList.remove("mobile");
      element2.classList.remove("mobile");
    }

  }
  constructor(public itemService: ItemService, public dialog: MatDialog, public imageService: ImageService) {
  }
  ngOnInit() {
    this.innerWidth = window.innerWidth;

    if (this.innerWidth < 600) {
      var element1 = document.getElementById("todo");
      var element2 = document.getElementById("done");
      var element3 = document.getElementById("container");
      var element4 = document.getElementById("subtitle");
      element4.classList.add("subtitle");
      element3.classList.add("responsive_container");
      element1.classList.add("mobile");
      element2.classList.add("mobile");
    }
    else {
      var element1 = document.getElementById("todo");
      var element2 = document.getElementById("done");
      var element3 = document.getElementById("container");
      var element4 = document.getElementById("subtitle");
      element4.classList.remove("subtitle");
      element3.classList.remove("responsive_container");
      element1.classList.remove("mobile");
      element2.classList.remove("mobile");
    }
    this.refresh();
  }
  openDialogImage(item_id): void {
    const dialogImage = this.dialog.open(ModalDialogComponent, {
      width: '500px'
    });
    dialogImage.afterClosed().subscribe(result => {
      this.todoImg.forEach(x => {
        if (x["item"].id == item_id)
          x["imgURL"] = result;
      });

      var itemIdImgURL = item_id + '_' + result;

      var images = JSON.parse(localStorage.getItem("images"));
      if (images == null) {
        images = [];
      }
      var editImage = false;
      images.forEach((x) => {
        if (x.substring(0, x.indexOf('_')) == item_id) {
          x = itemIdImgURL;
          editImage = true;
        }
      });
      if (!editImage)
        images.push(itemIdImgURL);
      localStorage.setItem("images", JSON.stringify(images));
    });

  }
  openDialogDelete(): void {
    const dialogDelete = this.dialog.open(DeleteDialogComponent, {
      width: '250px'
    });
    dialogDelete.afterClosed().subscribe(result => {
      this.deleteAllDone = result;
      if (this.deleteAllDone)
        this.deleteAllDoneItems();
    });

  }
  over(id: string) {
    var el = document.getElementById(id);
    if (el != null)
      el.hidden = false;

  }
  leave(id: string) {
    var el = document.getElementById(id);
    if (el != null)
      el.hidden = true;
  }

  async markFinish(itemID) {
    let index = -1;
    let editItem = new Item();
    let imgURL: any;
    this.todoImg.forEach((x, i) => {
      if (x['item'].id == itemID) {
        index = i;
        editItem = x['item'];
        editItem.isFinished = true;
        imgURL = x['imgURL']
      }
    });
    if (index > -1) this.todoImg.splice(index, 1);
    this.doneImg.push({ "item": editItem, "imgURL": imgURL });

    this.itemService.updateItem(editItem).subscribe();
  }
  async markUnFinish(itemID) {
    let index = -1;
    let editItem = new Item();
    let imgURL: any;
    this.doneImg.forEach((x, i) => {
      if (x['item'].id == itemID) {
        index = i;
        editItem = x['item'];
        editItem.isFinished = false;
        editItem.isInput = false;
        imgURL = x['imgURL']
      }
    });
    if (index > -1) this.doneImg.splice(index, 1);
    this.todoImg.push({ "item": editItem, "imgURL": imgURL });
    this.itemService.updateItem(editItem).subscribe();
  }
  async add() {
    this.allowedAdd = true;
    if ((this.selectedItem.name == '') || (this.selectedItem.name == undefined) || (this.selectedItem.name == null)) {
      if (this.todoImg[0]["item"].id == null) {
        this.todoImg.splice(0, 1);
      }
      else {
        var item;
        this.todoImg.forEach(x => {
          if (x['item'].id == null)
            item = x;
        });
        var i = this.todoImg['item'].indexOf(item);
        this.todoImg.splice(i, 1);
      }
    }
    else {
      //UPDATE
     
      if (this.selectedItem['item'] != undefined) {
        if (this.selectedItem['item'].id != '' || this.selectedItem['item'].id != undefined) {


          this.todoImg.forEach(x => {
            if (x['item'].id == this.selectedItem['item'].id) {
              x['item'].name = this.selectedItem.name;
              x['item'].isInput = false;
              this.itemService.updateItem(x['item']).subscribe(res => {
                console.log(res);
              });
            }

          });

        }
      }

      else {
        // CREATE
        console.log("create");
        this.selectedItem.isFinished = false;
        this.selectedItem.isInput = false;
        var newItem: any;
        this.itemService.createItem(this.selectedItem).subscribe(res => {
          newItem = res;
          this.selectedItem = new Item();
          this.todoImg.forEach(x => {
            if (x['item'].id == null || x['item'].id == '')
              x['item'].id = newItem.id;
          });
        });
      }
    }
  }
  async refresh() {
    this.loading = true;
    var data: any;
    this.itemService.getItems().subscribe(res => {
      data = res;
      var images = JSON.parse(localStorage.getItem("images"));
      data.forEach(x => {
        if (x.isFinished == true) {
          let y: "";
          let item = new Item();
          item.id = x.id;
          item.name = x.name;
          item.isFinished = x.isFinished;
          item.isInput = false,
            item.showMoreDetails = false;
          this.doneImg.push({ "item": x, "imgURL": y });
        }
        else {
          x.isInput = false;
          let y: any;
          this.todoImg.push({ "item": x, "imgURL": y });
        }
        var images = JSON.parse(localStorage.getItem("images"));
        if (images != null) {
          this.todoImg.forEach(x => {
            images.forEach(y => {
              if (x["item"].id == y.substring(0, y.indexOf('_'))) {
                x["imgURL"] = y.substring(y.indexOf('_') + 1);
              }
            });
          });
          this.doneImg.forEach(x => {
            images.forEach(y => {
              if (x["item"].id == y.substring(0, y.indexOf('_'))) {
                x["imgURL"] = y.substring(y.indexOf('_') + 1);
              }
            });
          });
        }
        this.loading = false;
      });
    });

  }
  deleteItem(item_id: string) {
    var i = 0, index = -1;
    this.todoImg.forEach(x => {
      if (x['item'].id == item_id) {
        index = i;
      }
      i++;
    });
    this.itemService.deleteItem(item_id).subscribe(res => {
      if (res)
        this.todoImg.splice(index, 1);
    });
  }
  async deleteAllDoneItems() {
    this.doneImg.forEach(x => {
      console.log(x['item']);
      this.itemService.deleteItem(x['item'].id).subscribe(res => {
        if (res)
          this.doneImg = new Array();
      });
    });
  }

  async drop(event: CdkDragDrop<string[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex);
      let editItem = new Item();
      if (event.previousContainer.id === 'cdk-drop-list-0') {
        this.doneImg[event.currentIndex]['item'].isFinished = !this.doneImg[event.currentIndex]['item'].isFinished;
        editItem = this.doneImg[event.currentIndex]['item'];
      }
      else {
        this.todoImg[event.currentIndex]["item"].isFinished = !this.todoImg[event.currentIndex]['item'].isFinished;
        this.todoImg[event.currentIndex]["item"].isInput = false;
        editItem = this.todoImg[event.currentIndex]['item'];
      }

       this.itemService.updateItem(editItem).subscribe(res=>{

       });
    }
  }
 
 
  editItem(item_id) {
    this.todoImg.forEach(x => {
      if (x['item'].id == item_id) {
        this.selectedItem = x;
        x['item'].isInput = true;
      }
    });
    console.log(this.todoImg);
  }
  addNewItemInToDoList() {
    this.allowedAdd = false;
    let model =
    {
      "item": { 'id': '', 'name': '', 'isFinished': false, 'isInput': true, 'showMoreDetails': false },
      "imgURL": ""
    };
    this.todoImg.unshift(model);
    this.selectedItem = model['item'];
  }


}
