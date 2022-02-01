import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';
import { SuperHeroeService } from 'src/app/service/superheroes.service';
import { ToastController } from '@ionic/angular';
import { HttpErrorResponse } from '@angular/common/http';
@Component({
  selector: 'app-heroe-detalle',
  templateUrl: './heroe-detalle.page.html',
  styleUrls: ['./heroe-detalle.page.scss'],
})
export class HeroeDetallePage implements OnInit {
  id=""
  superheroe={}

  favoritos=[]

  constructor(public navCtrl: NavController, 
              private activatedRoute: ActivatedRoute, 
              private shService: SuperHeroeService,
              private toastController: ToastController) { }

  ngOnInit(){
    this.activatedRoute.params.subscribe((data)=>{
      this.id=data.id
    })

    this.shService.buscarSuperheroeId(this.id).subscribe(
      (data:Response)=>{
        if(data["error"]){
          this.superheroe={}
          this.toast('Ocurrio un error inesperado');
          document.getElementById("listadoAtributos").setAttribute("hidden","hidden")
        }else{
          this.superheroe= data;
          // document.getElementById("listadoAtributos").removeAttribute("hidden")
          console.log(this.superheroe);
        }
      },
      (err:HttpErrorResponse)=>{
        console.log("Estado de error: " + err.status);
      }
    )
  }
  
  async toast(mensaje) {
    const toast = await this.toastController.create({
      message: mensaje,
      duration: 2000,
    });
    toast.present();
  }

  volver(){
    this.navCtrl.navigateBack("/home")
  }

  fav(){
    if (this.favoritos.includes(this.superheroe)){
      this.favoritos.splice(this.favoritos.indexOf(this.superheroe),1);
      this.toast("Superheroe removido a Mis Favoritos");
    }else{
      this.favoritos.push(this.superheroe)
      this.toast("Superheroe agregado a Mis Favoritos");

    }
    console.log("Favoritos: ") 
    console.log(this.favoritos)
  }
}
