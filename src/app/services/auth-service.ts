import { Injectable } from '@angular/core';
import {environment} from '../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';
import {Observable, tap} from 'rxjs';

interface AuthRequest { username: string; password: string; }
interface AuthResponse { token: string; }

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private api = `http://localhost:8080/api/authenticate`;

  constructor(private http: HttpClient) {}

  login(username: string, password: string): Observable<any> {
    return this.http.post(this.api, { username, password });
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  logout(): void {
    localStorage.removeItem('token');
  }
}
