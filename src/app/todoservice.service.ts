import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type' : 'application/json'
  })
};

@Injectable({
  providedIn: 'root'
})
export class TodoserviceService {
  url = 'https://jsonplaceholder.typicode.com/todos';
  limit = '?_limit=10';

  constructor(private http: HttpClient) { }

  getData(): Observable<any> {
    return this.http.get(`${this.url}${this.limit}`);
  }

  toggleCompleted(data): Observable<any> {
    const urls = `${this.url}/${data.id}`;
    return this.http.put(urls, data, httpOptions);
  }

  deleteData(data): Observable<any> {
    const delUrl = `${this.url}/${data.id}`;
    return this.http.delete(delUrl, httpOptions);
  }

}
