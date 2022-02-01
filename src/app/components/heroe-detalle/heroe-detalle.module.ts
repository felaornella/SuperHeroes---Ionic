import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { HeroeDetallePageRoutingModule } from './heroe-detalle-routing.module';

import { HeroeDetallePage } from './heroe-detalle.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HeroeDetallePageRoutingModule
  ],
  declarations: [HeroeDetallePage]
})
export class HeroeDetallePageModule {}
