import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';
import { SuperHeroeService } from 'src/app/service/superheroes.service';
import { ToastController } from '@ionic/angular';
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
  no_connection=false
  favoritos=[]
  favoritosBD=[]
  busquedaLocal=false

  constructor(public navCtrl: NavController, 
              private activatedRoute: ActivatedRoute, 
              private shService: SuperHeroeService,
              private toastController: ToastController,
              private socialSharing: SocialSharing,
              public db: DatabaseService) {}

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
          this.db.buscarSiEsFavorito(this.superheroe["id"]).then((data)=>{
            if (data.rows.length > 0){
              document.getElementById("iconoFavoritoInactivo").setAttribute("hidden","hidden")
              document.getElementById("iconoFavoritoActivo").removeAttribute("hidden")
            }
          })
        }
      },
      (err:HttpErrorResponse)=>{
        this.db.buscarSiEsFavorito(this.id).then((data)=>{
          if (data.rows.length > 0){
            let heroe=data.rows.item(0)
            this.superheroe={
              image:{url:""},
              name:heroe.name,
              biography:{"full-name":heroe.b_full_name,
                         "place-of-birth":heroe.b_place_of_birth,
                         "publisher":heroe.b_publisher
                        },
              powerstats:{"intelligence":heroe.p_intelligence,
                          "strength":heroe.p_strength,
                          "speed":heroe.p_speed,
                          "durability":heroe.p_durability,
                          "power":heroe.p_power,
                          "combat":heroe.p_combat
                        },
              appearance:{"gender":heroe.a_gender,
                          "race":heroe.a_race,
                          "height":["0",heroe.a_height],
                          "weight":["0",heroe.a_weight],
                          "eye-color":heroe.a_eye_color,
                          "hair-color":heroe.a_hair_color,
                        },
              work:{"occupation":heroe.w_occupation}
            }
            this.busquedaLocal=true
            this.toast("Error de conexión. Datos recuperados localmente");
          }else{
            this.superheroe={}
            this.no_connection=true;
            document.getElementById("animationContainer1").setAttribute("hidden","hidden")
          }
        }).catch((err)=>{
          console.log("Error Buscando: ", err)
          this.no_connection=true;
          document.getElementById("animationContainer1").setAttribute("hidden","hidden")
        })
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

}
