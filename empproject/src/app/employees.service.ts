import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class EmployeeService {
  private apiUrl = 'http://localhost:9999/employees';

  constructor(private http: HttpClient) {}

  getEmployees(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  getEmployeeById(uid: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${uid}`);
  }

  createEmployee(employee: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, employee);
  }

  updateEmployee(uid: string, employee: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${uid}`, employee);
  }

  deleteEmployee(uid: string): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${uid}`);
  }
}
