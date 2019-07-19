import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root"
})
export class AppService {
  constructor(private http: HttpClient) { }

  getFilms(param: string): Observable<any[]> {
    return this.http.get<any[]>("https://swapi.co/api/films/?search=" + param);
  }

  getPersons(param: string): Observable<any[]> {
    return this.http.get<any[]>("https://swapi.co/api/people/?search=" + param);
  }

  //Método que da um get em /peoples + o número que desejar
  getPersonsByFilms(param: number): Observable<any[]> {
    return this.http.get<any[]>("https://swapi.co/api/people/" + param);
  }

  getFilmsByPerson(param: number): Observable<any[]> {
    return this.http.get<any[]>("https://swapi.co/api/films/" + param);
  }

  getFilmsNames(url: string): Observable<any[]> {
    return this.http.get<string[]>(url)
  }

  getPersonNames(url: string): Observable<any[]> {
    return this.http.get<string[]>(url)
  }
}
