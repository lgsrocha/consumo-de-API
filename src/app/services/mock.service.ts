import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class MockService {
  apiUrl = 'https://jsonplaceholder.typicode.com/users';
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }

  constructor(private httpClient: HttpClient) { }

  // C.R.U.D - CREATE, READ, UPDATE, DELETE

  // Retorna a lista de usuarios READ
  mockGetUsers():Observable<User[]> {
    return this.httpClient.get<User[]>(this.apiUrl);
  }

  // Salva usuario no banco CREATE
  mockPostUser(user: User):Observable<User> {
    return this.httpClient.post<User>(this.apiUrl, user, this.httpOptions);
  }

  // Exclui o usuario do banco DELETE
  mockDeleteUser(id: number):Observable<User> {
    return this.httpClient.delete<User>(`${this.apiUrl}/${id}`)
  }

  // Edita usuario UPDATE
  mockUpdateUser(id: string, user: User):Observable<User> {
    return this.httpClient.put<User>(`${this.apiUrl}/${id}`, user, this.httpOptions);
  }

  // Lista usuario unico
  mockGetUser(id: string):Observable<User[]> {
    return this.httpClient.get<User[]>(`${this.apiUrl}/${id}`)
  }
}

