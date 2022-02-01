import { Component } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  marvelHeroes= [
    {nombre:"Spider-Man"},
    {nombre:"Black Panther"},
    {nombre:"Thor"},
    {nombre:"Capitan America"}
  ];

  constructor(public navCtrl: NavController) {}

  goToPage(){
    this.navCtrl.navigateForward("/my-page/Felipe")
  }
}
