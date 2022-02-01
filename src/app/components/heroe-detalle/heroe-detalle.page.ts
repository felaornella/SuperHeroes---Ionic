import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-heroe-detalle',
  templateUrl: './heroe-detalle.page.html',
  styleUrls: ['./heroe-detalle.page.scss'],
})
export class HeroeDetallePage implements OnInit {
  id=""

  constructor(public navCtrl: NavController, private activatedRoute: ActivatedRoute) { }

  ngOnInit(){
    this.activatedRoute.params.subscribe((data)=>{
      console.log(data)
      this.id=data.id
    })
  }

  volver(){
    this.navCtrl.navigateBack("/home")
  }

}
