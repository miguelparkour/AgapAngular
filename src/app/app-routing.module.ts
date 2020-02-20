import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// ----- componentes en las rutas --------
import { LibrosComponent } from './componentes/Tienda/libros.component';
import { VistalibroComponent } from './componentes/Tienda/vistalibro.component';
import { Error404Component } from './componentes/Tienda/error404.component';

import { MiPerfilComponent } from './componentes/ZonaCliente/miperfil.component';
import { MisDireccionesComponent } from './componentes/ZonaCliente/misdirecciones.component';
import { PedidoComponent } from './componentes/ZonaCliente/pedido.component';
import { LoginComponent } from './componentes/ZonaCliente/login.component';
import { RegistroComponent } from './componentes/ZonaCliente/registro.component';
import { AuthguardGuard } from './servicios/authguard.guard';
import { FinpedidoComponent } from "./componentes/ZonaCliente/finpedido.component";
import { MisComprasComponent } from './componentes/ZonaCliente/mis-compras.component';
import { DetallepedidoComponent } from './componentes/ZonaCliente/detallepedido.component';

;const routes: Routes = [
  { path: 'Libros/:idMateria', component: LibrosComponent },
  { path: '', redirectTo: 'Libros/0', pathMatch: 'full' },
  { path: 'DetalleLibro/:param', component: VistalibroComponent },
  {path:'Tienda/Pedido',component:PedidoComponent},
  { path: 'Cliente',children:[
              { path:'Login', component: LoginComponent},
              { path:'Registro', component: RegistroComponent},
              { path:'MiPanel', canActivate: [AuthguardGuard], children:[
                { path: 'MiPerfil', component: MiPerfilComponent },
                { path: 'MisCompras', component: MisComprasComponent },
                { path: 'MisPedidos', component: PedidoComponent },
                { path: 'DetallePedido/:idPedido', component: DetallepedidoComponent },
                { path: 'FinalizarPedido/:idPedido', component: FinpedidoComponent },
                { path: 'MisDirecciones', component: MisDireccionesComponent }  
              ]}
        ]
  },
  { path: '**', component: Error404Component }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
