import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
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

save(client: Client): Observable<Client>{
  return this.httpClient.post<Client>(this.API, client)
}

}
