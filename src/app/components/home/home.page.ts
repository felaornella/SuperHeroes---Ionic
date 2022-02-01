import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { NavController } from '@ionic/angular';
import { SuperHeroeService } from 'src/app/service/superheroes.service';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  token="7374955662544922"
  inputBusqueda=""

  marvelHeroes=[]
  tipoBusqueda="1"
  tipos=["","text","number"]

  constructor(public navCtrl: NavController,
              private shService: SuperHeroeService,
              private toastController: ToastController) {}

  ngOnInit(){
  }

  buscar(){
    if (this.tipoBusqueda=="1"){
      this.shService.buscarSuperheroeNombre(this.inputBusqueda).subscribe(
        (data:Response)=>{
          if(data["error"]){
            this.marvelHeroes=[]
            this.toastNoResults();
          }else{
            this.marvelHeroes= data["results"];
            document.getElementById("listaResultados").removeAttribute("hidden")
          }
        },
        (err:HttpErrorResponse)=>{
          console.log("Estado de error: " + err.status);
        }
      )
    }else if (this.tipoBusqueda=="2"){
      this.shService.buscarSuperheroeId(this.inputBusqueda).subscribe(
        (data:Response)=>{
          if(data["error"]){
            this.marvelHeroes=[]
            this.toastNoResults();
          }else{
            this.marvelHeroes= [{name:data["name"],image:{url:data["image"]["url"]},id:data["id"]}];
            document.getElementById("listaResultados").removeAttribute("hidden")
          }
        },
        (err:HttpErrorResponse)=>{
          console.log("Estado de error: " + err.status);
        }
      )
    }
    
  }

  async toastNoResults() {
    const toast = await this.toastController.create({
      message: 'No hubo resultados',
      duration: 2000,
    });
    toast.present();
  }

  showDetailSuperheroe(id){
    this.navCtrl.navigateForward("/heroe-detalle/" + id)
  }
}
