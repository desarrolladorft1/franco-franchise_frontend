import { Routes } from '@angular/router';
import { PruebaComponent } from './home/pages/prueba/prueba.component';
import { ContactoComponent } from './home/contacto/contacto.component';
import { NosotrosComponent } from './home/nosotros/nosotros.component';
import { TestComponent } from './home/test/test.component';
import { FinanciamientoComponent } from './home/financiamiento/financiamiento.component';
import { CitasComponent } from './home/pages/citas/citas.component';
import { CarritoComponent } from './home/carrito/carrito.component';

export const routes: Routes = [



    {
        path: 'inicio',
        loadComponent: () => import('./home/inicio/inicio.component'),
        children:[
            
        ]
    },
    {
        path: 'prueba',
        title: 'Prueba HTTP',
        component: PruebaComponent
    },
    {
        path: 'contacto',
        title: 'Contactanos',
        component: ContactoComponent
    },
    {
        path: 'nosotros',
        title: 'Nosotros',
        component: NosotrosComponent
    },
    {
        path: 'test',
        title: 'Formulario',
        component: TestComponent
    },
    {
        path: 'financiamiento',
        title: 'Financiamiento',
        component: FinanciamientoComponent
    },
    {
        path: 'citas',
        title: 'Citas',
        component: CitasComponent
    },
    {
        path: 'carrito',
        title: 'Carrito',
        component: CarritoComponent
    },
    {
        path: '',
        redirectTo: '/inicio',
        pathMatch: 'full'
    }
];
