import { Injectable } from '@angular/core';
import { IBlog } from './models/Blog';
import { Observable, catchError, map, retry, throwError } from 'rxjs';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class BlogService {
  API_URL: string = 'http://localhost:6868/'

  headers = new HttpHeaders().set('Content-Type', 'text/plain;charset=utf-8')
  requestOptions: Object = {
    header: this.headers,
    responseType: 'Text'
  }

  headers2 = new HttpHeaders().set('Content-Type', 'application/json;charset=utf-8')
  requestOptions2: Object = {
    header: this.headers2,
    responseType: 'Text'
  }

  constructor(private _http: HttpClient) { }

  getBlogsList(page: any): Observable<any> {
    if (!page) page = 1
    return this._http.get<any>(`${this.API_URL}/blogs-sorted?page=${page}`, this.requestOptions).pipe(
      map(res => JSON.parse(res) as Array<IBlog>),
      retry(3),
      catchError(this.handleError)
    )
  }
  getBlogsOutstanding(): Observable<any> {
    return this._http.get<any>(`${this.API_URL}/blogs-outstanding`, this.requestOptions).pipe(
      map(res => JSON.parse(res) as Array<IBlog>),
      retry(3),
      catchError(this.handleError)
    )
  }

  getABlog(cusId: any): Observable<any> {
    return this._http.get<any>(`${this.API_URL}/blog/` + cusId, this.requestOptions).pipe(
      map(res => JSON.parse(res) as IBlog),
      retry(3),
      catchError(this.handleError)
    )
  }
postABlog(blog: any): Observable<any> {
    const fd = new FormData()
    fd.append('Title', blog.Title)
    fd.append('Writer', blog.Writer)
    fd.append('Content', blog.Content)
    fd.append('Image', blog.Image)
    fd.append('Outstanding', blog.Outstanding)
    return this._http.post<any>(`${this.API_URL}/blogs`, fd).pipe(
      map(res => res as Array<IBlog>),
      retry(3),
      catchError(this.handleError)
    )
  }

  putABlog(blog: any): Observable<any> {
    const fd = new FormData()
    fd.append('Title', blog.Title)
    fd.append('Writer', blog.Writer)
    fd.append('Content', blog.Content)
    fd.append('Image', blog.Image)
    fd.append('Outstanding', blog.Outstanding)
    return this._http.put<any>(`${this.API_URL}/blogs`, fd).pipe(
      map(res => res as Array<IBlog>),
      retry(3),
      catchError(this.handleError)
    )
  }

  deleteBlog(cusId: any): Observable<any> {
    return this._http.delete<any>(`${this.API_URL}/blogs/` + cusId, this.requestOptions2).pipe(
      map(res => res as Array<IBlog>),
      retry(3),
      catchError(this.handleError)
    )
  }

  handleError(error: HttpErrorResponse) {
    return throwError(() => new Error(error.message))
  }
}
