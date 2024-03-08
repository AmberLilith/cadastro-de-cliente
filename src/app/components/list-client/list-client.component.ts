import { Component } from '@angular/core';
import { ClientService } from '../../services/client.service';
import { Client } from '../../models/client';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-list-client',
  standalone: true,
  imports: [],
  templateUrl: './list-client.component.html',
  styleUrl: './list-client.component.css'
})
export class ListClientComponent {
  clientList: Client[] = []

  constructor(private service: ClientService){}

  list():void{
    this.service.list().subscribe(clientList =>{
      this.clientList = clientList
    })
  }

  ngOnInit(): void{
    this.list()
  }

}
