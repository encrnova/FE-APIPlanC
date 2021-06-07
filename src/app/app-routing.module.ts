import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ErrorComponent } from './error/error.component';
import { IniciarSesionComponent } from './iniciar-sesion/iniciar-sesion.component';
import { InicioComponent } from './inicio/inicio.component';
import { ReporteComponent } from './reporte/reporte.component';
import { AuthGuard } from './seguridad/auth.guard';

const routes: Routes = [
  {path: '', component: IniciarSesionComponent},
  {path: 'iniciarSesion', component: IniciarSesionComponent},
  {path: 'inicio', component: InicioComponent, canActivate: [AuthGuard]},
  {path: 'reporte', component: ReporteComponent, canActivate: [AuthGuard]},
  {path: '**', component: ErrorComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
