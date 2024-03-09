import { Component } from '@angular/core';
import { ClientService } from '../../services/client.service';
import { Client } from '../../models/client';
import { RouterLink } from '@angular/router';
import { FormTypes } from '../../enums/form-types';

@Component({
  selector: 'app-list-client',
  standalone: true,
  imports: [
    RouterLink
  ],
  templateUrl: './list-client.component.html',
  styleUrl: './list-client.component.css'
})
export class ListClientComponent {
  clientList: Client[] = []
  selectedClientId!: number
  formTypes = FormTypes

  constructor(private service: ClientService){}

  list():void{
    this.service.list().subscribe(clientList =>{
      this.clientList = clientList
    })
  }
  
  delete(id: number): void {
    this.service.delete(id).subscribe(() => {
      console.log(`Cliente com ID ${id} excluído com sucesso.`);
      // Codigo abaixo é algo a ser feito após exclusão com sucesso como atualizar a lista de clientes após a exclusão ou redirecionar para outra tela
      this.list()
    }, (error) => {
      console.error('Erro ao excluir cliente:', error);
    });
  }

  ngOnInit(): void{
    this.list()
  }

}
