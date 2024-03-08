import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ClientService } from '../../services/client.service';
import { Client } from '../../models/client';

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
  
  constructor(private service: ClientService){
    this.clientForm = new FormGroup({
      name: new FormControl("", Validators.required),
      phone: new FormControl("", Validators.required),
      email: new FormControl("", [Validators.required, Validators.email])
    })
  }

  save(client: Client){
    return this.service.save(client).subscribe(client =>{
      this.clientForm.reset()
    })
  }
  
}
