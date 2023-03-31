import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Risk } from '../models/risk.model';

const API_URL = 'http://localhost:5288/api/Risk/';

@Injectable({
  providedIn: 'root',
})
export class RiskService {
  constructor(private http: HttpClient) {}

  getRisks(id:number) 
  {
    return this.http.get<Array<Risk>>('http://localhost:5288/api/Risk/GetRisks/'+id) ;
  }
  getRiskById(id:number) 
  {

    return this.http.get<Risk>('http://localhost:5288/api/Risk/GetRiskById/'+id) ;
  }
addRisk(risk:Risk)
{
  return this.http.post<Risk>('http://localhost:5288/api/Risk/CreateRisk',risk)
}
editRisk(risk:Risk)
{
  return this.http.put<Risk>('http://localhost:5288/api/Risk/UpdateRisk',risk)
}
deleteRisk(id:number)
{
  return this.http.delete('http://localhost:5288/api/Risk/DeleteRisk/'+id)
}
  getUserBoard(): Observable<any> {
    return this.http.get(API_URL + 'user', { responseType: 'text' });
  }
  
  getModeratorBoard(): Observable<any> {
    return this.http.get(API_URL + 'mod', { responseType: 'text' });
  }

  getAdminBoard(): Observable<any> {
    return this.http.get(API_URL + 'admin', { responseType: 'text' });
  }
}
