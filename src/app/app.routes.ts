import { Routes } from '@angular/router';

// Layouts
import { PublicLayout } from './layouts/public-layout/public-layout';
import { PrivateLayout } from './layouts/private-layout/private-layout';

// Páginas públicas
import { Home } from './pages/public/home/home';
import { Nosotros } from './pages/public/nosotros/nosotros';
import { Servicios } from './pages/public/servicios/servicios';
import { Soporte } from './pages/public/soporte/soporte';
import { Login } from './pages/public/login/login';

// Páginas privadas (usuario)
import { InicioUser } from './pages/private/user/inicio/inicio';
import { Documentos } from './pages/private/user/documentos/documentos';
import { Reportes } from './pages/private/user/reportes/reportes';
import { Grupos } from './pages/private/user/grupos/grupos';

// Páginas privadas (admin)
import { InicioAdmin } from './pages/private/admin/inicio/inicio';
import { Actualizaciones } from './pages/private/admin/actualizaciones/actualizaciones';
import { ReportesUso } from './pages/private/admin/reportes-uso/reportes-uso';
import { Alertas } from './pages/private/admin/alertas/alertas';
import { Accesos } from './pages/private/admin/accesos/accesos';

export const routes: Routes = [
  {
    path: '',
    component: PublicLayout,
    children: [
      { path: '', component: Home },
      { path: 'nosotros', component: Nosotros },
      { path: 'servicios', component: Servicios },
      { path: 'soporte', component: Soporte },
      { path: 'login', component: Login },
    ],
  },
  {
    path: 'user',
    component: PrivateLayout,
    children: [
      { path: 'inicio', component: InicioUser },
      { path: 'documentos', component: Documentos },
      { path: 'reportes', component: Reportes },
      { path: 'grupos', component: Grupos },
      { path: 'soporte', component: Soporte },
      { path: '', redirectTo: 'inicio', pathMatch: 'full' },
    ],
  },
  {
    path: 'admin',
    component: PrivateLayout,
    children: [
      { path: 'inicio', component: InicioAdmin },
      { path: 'actualizaciones', component: Actualizaciones },
      { path: 'reportes-uso', component: ReportesUso },
      { path: 'alertas', component: Alertas },
      { path: 'accesos', component: Accesos },
      { path: '', redirectTo: 'inicio', pathMatch: 'full' },
    ],
  },
  { path: '**', redirectTo: '' },
];
