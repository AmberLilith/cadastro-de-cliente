import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component, Input } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ClientService } from '../../services/client.service';
import { Client } from '../../models/client';
import { ActivatedRoute, Router } from '@angular/router';
import { FormTypes } from '../../enums/form-types';
import { Observable } from 'rxjs';


@Component({
  selector: 'app-client-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  templateUrl: './client-form.component.html',
  styleUrl: './client-form.component.css'
})
export class ClientFormComponent {
  clientForm!: FormGroup
  clientIdToEdit!: any
  @Input() clientToEdit!: Client
  type?: any
  clientList : Client[] = []
  
  constructor(private service: ClientService, private route: ActivatedRoute,private router: Router){
    this.startForm()
  }

  startForm(){
    this.clientForm = new FormGroup({
      name: new FormControl(this.clientIdToEdit ? this.clientToEdit.name : "", Validators.required),
      phone: new FormControl(this.clientIdToEdit ? this.clientToEdit.phone : "", Validators.required),
      email: new FormControl(this.clientIdToEdit? this.clientToEdit.email : "", [Validators.required, Validators.email])
    })
  }

  cancelForm(){
    this.router.navigate(['/listar'])
  }

  save(){
    return this.service.save(this.clientForm.value).subscribe(client =>{
      this.clientForm.reset()
      this.router.navigate(['/listar'])
    })
  }

  update() {
    this.service.update(this.clientIdToEdit, this.clientForm.value)
      .subscribe(
        response => {
          console.log('Dados atualizados com sucesso:', response);
          this.router.navigate(['/listar'])
        },
        error => {
          console.error('Erro ao atualizar dados:', error);
          // Lide com o erro de alguma forma, se necessário
        }
      );
  }

  getOneClient(id: number) {
    this.service.getOneClient(id)
      .subscribe(
        client => {
          this.clientToEdit = client;
          this.startForm()
        },
        error => {
          console.error('Erro ao buscar cliente:', error);
        }
      );
  }


  ngOnInit(): void {
    this.clientIdToEdit = this.route.snapshot.paramMap.get('id');
    if(this.clientIdToEdit){
      this.getOneClient(this.clientIdToEdit)
    }
   
    
  }
  
}
