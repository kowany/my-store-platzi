import { NgModule } from '@angular/core';
import { RouterModule, Routes, PreloadAllModules, CanActivate } from '@angular/router';

// import { CustomPreloadService } from './services/custom-preload.service';

import { NotFoundComponent } from './not-found/not-found.component';
import { QuicklinkStrategy } from 'ngx-quicklink';
import { AdminGuard } from './guards/admin.guard';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./website/website.module').then( m => m.WebsiteModule ),
    data: {
      preload: true
    }
  },
  {
    path: 'cms',
    canActivate: [AdminGuard],
    loadChildren: () => import('./cms/cms.module').then( m => m.CmsModule ),
  },
  {
    path: '**',
    component: NotFoundComponent
  },
];

  // Se recomienda utilizar la técnica de preloadingStrategy:
  // PreloadAllModules cuando nuestra aplicación
  // tenga pocos módulos, porque si son demasiados
  // estaríamos ocupando el hilo principal de
  // ejecución del navegador, y tardaría demasiado
  // la carga.
@NgModule({
  imports: [RouterModule.forRoot(routes, {
    preloadingStrategy: QuicklinkStrategy
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
