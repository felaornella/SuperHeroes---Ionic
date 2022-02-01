import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HeroeDetallePage } from './heroe-detalle.page';

const routes: Routes = [
  {
    path: '',
    component: HeroeDetallePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HeroeDetallePageRoutingModule {}
