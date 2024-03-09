import { Routes } from '@angular/router';
import { ClientFormComponent } from './components/client-form/client-form.component';
import { ListClientComponent } from './components/list-client/list-client.component';

export const routes: Routes = [
    {
        component: ClientFormComponent,
        path: "formulario"
    },
    {
        component: ClientFormComponent,
        path: "formulario/:id"
    },
    {
        component: ListClientComponent,
        path: "listar"
    },
    {
        component: ListClientComponent,
        path: "",
        pathMatch: "full"
    }
];
