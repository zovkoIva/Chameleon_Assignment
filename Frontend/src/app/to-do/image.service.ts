import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

const baseUrl = 'http://localhost:4201';
@Injectable({
  providedIn: 'root'
})
export class ImageService {

  constructor(private http: HttpClient) { }


  upload(image: FormData) {
    return this.http.post(`${baseUrl}/upload`, image);
  }
}
