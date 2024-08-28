import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class JsonserverService {
  private apiUrl = 'http://localhost:3000';
  comparisonBooksArrayJson: any = [];
  updateBookSelectedObj!: any;
  bookdetailfrombooklist!: any;

  constructor(private http: HttpClient) { }

  getUserById(id: string) {
    return this.http.get(`${this.apiUrl}/${id}`);
  }
  getAllUsers() {
    return this.http.get(`${this.apiUrl}/users`);
  }

  login(username: string) {
    return this.http.get(`${this.apiUrl}/users?username=${username}`).pipe(
      map((users: any) => users.length > 0 ? users[0] : null)
    )
  }

  updateUser(user: any) {
    return this.http.put(`${this.apiUrl}/users/${user.id}`, user);
  }
  addUser(user: any) {
    return this.http.post(`${this.apiUrl}/users`, user);
  }




  //book list
  getAllbooks() {
    return this.http.get(`${this.apiUrl}/books`);
  }
  getBooks(page: number, limit: number) {
    const url = `${this.apiUrl}/books?_page=${page}&_limit=${limit}`;
    return this.http.get(url);
  }
  addbook(book: any) {
    return this.http.post(`${this.apiUrl}/books`, book);
  }
  updateBook(bookData: any) {
    return this.http.put(`${this.apiUrl}/books/${bookData.id}`, bookData);
  }


  //transactions
  getAllBorrowed() {
    return this.http.get(`${this.apiUrl}/borrowed`);
  }
  getAllreturned() {
    return this.http.get(`${this.apiUrl}/returned`);
  }
}