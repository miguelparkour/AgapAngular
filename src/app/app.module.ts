// --------- modulos a IMPORTS --------------------
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
//import { AngularFireModule  } from '@angular/fire';
//import { AngularFirestore } from '@angular/fire/firestore';
//import { AngularFireStorageModule } from '@angular/fire/storage';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

// --------- componentes a DECLARATIONS -----------------
import { AppComponent } from './componentes/app.component';
import { LibrosComponent } from './componentes/Tienda/libros.component';
import { VistalibroComponent } from './componentes/Tienda/vistalibro.component';
import { MiPerfilComponent } from './componentes/ZonaCliente/miperfil.component';
import { MisDireccionesComponent } from './componentes/ZonaCliente/misdirecciones.component';
import { Error404Component } from './componentes/Tienda/error404.component';
import { TreeviewmateriasComponent } from './componentes/Tienda/treeviewmaterias.component';
import { MinilibroComponent } from './componentes/Tienda/minilibro.component';
import { PedidoComponent } from './componentes/ZonaCliente/pedido.component';
import { LoginComponent } from './componentes/ZonaCliente/login.component';

// ---------- servicios a PROVIDERS ------------------
import { RestfullfirebaseService } from './servicios/restfullfirebase.service';
import { LocalstorageService } from './servicios/localstorage.service';
import { AuthguardGuard } from './servicios/authguard.guard';

//-------modulos y servicios para FIREBASE ----------
import { environment } from 'src/environments/environment';
import { AngularFireModule } from '@angular/fire';
import { AngularFireAnalyticsModule } from '@angular/fire/analytics';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { RegistroComponent } from './componentes/ZonaCliente/registro.component';
import { CargarthumbnailDirective } from './directivas/cargarthumbnail.directive';
import { MinilibropedidoComponent } from './componentes/ZonaCliente/minilibropedido.component';
import { FinpedidoComponent } from './componentes/ZonaCliente/finpedido.component';



@NgModule({
  declarations: [
    AppComponent,
    LibrosComponent,
    VistalibroComponent,
    MiPerfilComponent,
    MisDireccionesComponent,
    Error404Component,
    TreeviewmateriasComponent,
    MinilibroComponent,
    PedidoComponent,
    LoginComponent,
    RegistroComponent,
    CargarthumbnailDirective,
    MinilibropedidoComponent,
    FinpedidoComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAnalyticsModule, // dynamically imports firebase/analytics
    AngularFirestoreModule, // imports firebase/firestore, only needed for database features
    AngularFireAuthModule, // imports firebase/auth, only needed for auth features,
    AngularFireStorageModule // imports firebase/storage only needed for storage features  
  ],
  providers: [
    RestfullfirebaseService,
    LocalstorageService,
    AuthguardGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
