import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-my-page',
  templateUrl: './my-page.page.html',
  styleUrls: ['./my-page.page.scss'],
})
export class MyPagePage{
  nombre=""

  constructor(public navCtrl: NavController, private activatedRoute: ActivatedRoute) { }

  ngOnInit(){
    this.activatedRoute.params.subscribe((data)=>{
      console.log(data)
      this.nombre=data.nombre
    })
  }

  goToPage(){
    this.navCtrl.navigateBack("/home")
  }

}
