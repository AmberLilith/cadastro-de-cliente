import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { Client } from '../models/client';

@Injectable({
  providedIn: 'root'
})
export class ClientService {
  API = "http://localhost:3000/clientes"
  constructor(private readonly httpClient: HttpClient) { }

  list(): Observable<Client[]> {
    return this.httpClient.get<Client[]>(this.API)
}

delete(id: number): Observable<void> {
  return this.httpClient.delete<void>(`${this.API}/${id}`);
}


save(client: Client): Observable<Client>{
  return this.httpClient.post<Client>(this.API, client)
}

update(id: string, client: Client): Observable<any> {
  return this.httpClient.put<any>(`${this.API}/${id}`, client);
}

getOneClient(id: number): Observable<any> {
  return this.httpClient.get(`${this.API}/${id}`).pipe(
   catchError(error => {
   console.error('Erro ao obter registro:', error);
     return throwError(() => new Error('Não foi possível recuperar o registro!'))
    })
  );
}


}
