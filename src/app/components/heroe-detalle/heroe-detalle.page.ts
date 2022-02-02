import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';
import { SuperHeroeService } from 'src/app/service/superheroes.service';
import { ToastController } from '@ionic/angular';
import { Platform } from '@ionic/angular';
import { HttpErrorResponse } from '@angular/common/http';
import { SocialSharing } from '@ionic-native/social-sharing/ngx';
import { DatabaseService } from 'src/app/service/database.service';
import { Superheroe } from 'src/app/models/superheroe';

@Component({
  selector: 'app-heroe-detalle',
  templateUrl: './heroe-detalle.page.html',
  styleUrls: ['./heroe-detalle.page.scss'],
})
export class HeroeDetallePage implements OnInit {
  id=""
  superheroe={}

  favoritos=[]
  favoritosBD=[]

  constructor(public navCtrl: NavController, 
              private activatedRoute: ActivatedRoute, 
              private shService: SuperHeroeService,
              private toastController: ToastController,
              private socialSharing: SocialSharing,
              public platform: Platform,
              public db: DatabaseService) {
                this.db.createDatabase()
              }

  ngOnInit(){
    this.activatedRoute.params.subscribe((data)=>{
      this.id=data.id
    })

    this.shService.buscarSuperheroeId(this.id).subscribe(
      (data:Response)=>{
        if(data["error"]){
          this.superheroe={}
          this.toast('Ocurrio un error inesperado');
        }else{
          this.superheroe= data;
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
    this.db.buscarSiEsFavorito(this.superheroe["id"]).then((data)=>{
      if (data.rows.length > 0){
        this.quitarDeFavoritos(this.superheroe["id"]);
        this.toast("Superheroe removido a Mis Favoritos");
        document.getElementById("iconoFavoritoActivo").setAttribute("hidden","hidden")
        document.getElementById("iconoFavoritoInactivo").removeAttribute("hidden")
      }else{
        this.agregarAFavoritos();
        this.toast("Superheroe agregado a Mis Favoritos");
        document.getElementById("iconoFavoritoInactivo").setAttribute("hidden","hidden")
        document.getElementById("iconoFavoritoActivo").removeAttribute("hidden")
      }
    })
  }

  quitarDeFavoritos(idHeroe){
    this.db.eliminarHeroe(idHeroe)
  }

  agregarAFavoritos(){
    this.db.insertarHeroe(this.superheroe)
  }

  share(){
    let imageUrl=this.superheroe["image"]["url"]
    let text= "Te presento a " + this.superheroe["name"] + ", el nuevo superheroe que llego a la ciudad para salvarnos a todos. \nNo le digas a nadie, pero su verdadero nombre es " + this.superheroe["biography"]["full-name"]  + " 🤫"
    this.socialSharing.share(text,"",imageUrl)
  }

  getHeroes() {
    this.db.getHeroes().then((data) => {
      this.favoritosBD=[]
      if (data.rows.length > 0) {
        for (var i = 0; i < data.rows.length; i++) {
          this.favoritosBD.push(data.rows.item(i));
        }
      }
      console.log("FAVORITOS: ", this.favoritosBD)
    });
  }

  imprimir(){
    this.getHeroes();
  }
}
