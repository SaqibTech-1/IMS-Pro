import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/app/environment';
import { ApiResponse, Role, User } from '../Interfaces/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  // private baseUrl = `${environment.apiBaseUrl}`;

  //   constructor(private http: HttpClient) {}

  //   getRoles(): Observable<{ data: Role[] }> {
  //     return this.http.get<{ data: Role[] }>(`${this.baseUrl}/Role`);
  //   }

  //   createUser(formData: FormData): Observable<any> {
  //     return this.http.post(`${this.baseUrl}/User`, formData);
  //   }

  //   updateUser(id: number, formData: FormData): Observable<any> {
  //     return this.http.put(`${this.baseUrl}/User/${id}`, formData);
  //   }

  //   getUserById(id: number): Observable<{ data: User }> {
  //     return this.http.get<{ data: User }>(`${this.baseUrl}/User/${id}`);
  //   }

  //   getUsers(page = 1, size = 5): Observable<{ data: User[]; totalItems: number }> {
  //     return this.http.get<{ data: User[]; totalItems: number }>(
  //       `${this.baseUrl}/User?page=${page}&size=${size}`
  //     );
  //   }

  //   deleteUser(id: number): Observable<void> {
  //     return this.http.delete<void>(`${this.baseUrl}/User/${id}`);
  //   }


  private baseUrl = `${environment.apiBaseUrl}/users`;

  constructor(private http: HttpClient) { }

  // GET: Fetch all users
  getUsers(): Observable<ApiResponse<User[]>> {
    return this.http.get<ApiResponse<User[]>>(`${this.baseUrl}/get-all`);
  }

  // GET: Fetch user by numeric ID
  getUserById(id: number): Observable<ApiResponse<User>> {
    return this.http.get<ApiResponse<User>>(`${this.baseUrl}/get-by-id/${id}`);
  }

  // GET: Fetch user by Global GUID
  getUserByGuid(guid: string): Observable<ApiResponse<User>> {
    return this.http.get<ApiResponse<User>>(`${this.baseUrl}/get-by-globalId/${guid}`);
  }

  // POST: Create a new user
  createUser(formData: FormData): Observable<ApiResponse<User>> {
    return this.http.post<ApiResponse<User>>(`${this.baseUrl}/create`, formData);
  }

  // PUT: Update existing user by ID
  updateUser(id: number, formData: FormData): Observable<ApiResponse<User>> {
    return this.http.put<ApiResponse<User>>(`${this.baseUrl}/update/${id}`, formData);
  }

  // DELETE: Remove user by ID
  deleteUser(id: number): Observable<ApiResponse<string>> {
    return this.http.delete<ApiResponse<string>>(`${this.baseUrl}/delete/${id}`);
  }

  // GET: Fetch roles (assuming endpoint exists under `/roles`)
  getRoles(): Observable<ApiResponse<Role[]>> {
    return this.http.get<ApiResponse<Role[]>>(`${environment.apiBaseUrl}/Role/get-all`);
  }


}
