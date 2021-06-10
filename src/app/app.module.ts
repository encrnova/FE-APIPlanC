import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule, Routes } from '@angular/router';
import { MenuNavComponent } from './menu/menu.component';
import { PiePaginaComponent } from './pie-pagina/pie-pagina.component';
import { IniciarSesionComponent } from './iniciar-sesion/iniciar-sesion.component';
import { CerrarSesionComponent } from './menu/cerrar-sesion/cerrar-sesion.component';
import { InicioComponent } from './inicio/inicio.component';
import { AuthGuard } from './seguridad/auth.guard';
import { AuthInterceptor } from './seguridad/auth.interceptor';
import { UsuarioAuth } from './modelos/usuario-auth.model';
import { MaterialModule } from './material.module';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { ReporteComponent } from './movimiento/reporte/reporte.component';
import { AgregarComponent } from './movimiento/agregar/agregar.component';
import { MovimientoComponent } from './movimiento/Consultar/movimiento.component';
import { SexoPipe } from './pipes/sexo.pipe';
import { PuestoMigratorioPipe } from './pipes/puesto-migratorio.pipe';
import { TipoPasajeroPipe } from './pipes/tipo-pasajero.pipe';

const appRoutes: Routes = [
  { path: '', component: InicioComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    MenuNavComponent,
    PiePaginaComponent,
    IniciarSesionComponent,
    InicioComponent,
    CerrarSesionComponent,
    ReporteComponent,
    AgregarComponent,
    MovimientoComponent,
    SexoPipe,
    PuestoMigratorioPipe,
    TipoPasajeroPipe
  ],
  imports: [
    MaterialModule,
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    BrowserModule,
    BrowserAnimationsModule,
    RouterModule.forRoot(appRoutes, { useHash: true }),
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
  ],
  exports: [
    BrowserAnimationsModule
  ],
  providers: [
    HttpClientModule,
    AuthGuard, 
    UsuarioAuth, 
    { 
      provide: LocationStrategy, 
      useClass: HashLocationStrategy 
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    }],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})

export class AppModule { }
