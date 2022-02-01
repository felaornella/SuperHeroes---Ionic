import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SuperHeroeService {
  constructor(private http: HttpClient, private router: Router) {}

  buscarSuperheroeNombre(nombre): Observable<Object> {
    return this.http.get<Object>(
      `https://www.superheroapi.com/api.php/7374955662544922/search/${nombre}`
    );
  }

  buscarSuperheroeId(id): Observable<Object> {
    return this.http.get<Object>(
      `https://www.superheroapi.com/api.php/7374955662544922/${id}`
    );
  }
}