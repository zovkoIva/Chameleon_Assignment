import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Item } from './item';

const baseUrl = 'http://localhost:4201';

@Injectable({
  providedIn: 'root'
})
export class ItemService {

  constructor(private http: HttpClient) {
  }

  getItems() {
    return this.http.get(`${baseUrl}/item`);
  }

  getItem(id: string) {
    return this.http.get(`${baseUrl}/item/${id}`);
  }

  createItem(item: Item) {
    console.log('createItem ' + JSON.stringify(item));
    return this.http.post(`${baseUrl}/item`, item);
  }

  updateItem(item: Item) {
    console.log('updateItem ' + JSON.stringify(item));
    return this.http.post(`${baseUrl}/item/${item.id}`, item);
  }

  deleteItem(id: string) {
    return this.http.delete(`${baseUrl}/item/${id}`);
  }
 
}