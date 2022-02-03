import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { NavController } from '@ionic/angular';
import { SuperHeroeService } from 'src/app/service/superheroes.service';
import { ToastController } from '@ionic/angular';
import { AlertController } from '@ionic/angular';
import { DatabaseService } from 'src/app/service/database.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})

export class HomePage {
  slideOpts = {
    initialSlide: 1,
    speed: 400
  };
  token="7374955662544922"
  inputBusqueda=""

  marvelHeroes=[]
  tipoBusqueda="1"
  tipos=["","text","number"]

  favoritos=[]

  constructor(public navCtrl: NavController,
              private shService: SuperHeroeService,
              private toastController: ToastController,
              private alertController: AlertController,
              public db: DatabaseService) {
                this.db.createDatabase().then(()=>this.cargarHeroesFavoritos());
              }

  cargarHeroesFavoritos(){
    this.db.getHeroes().then((data) => {
      this.favoritos=[]
      if (data.rows.length > 0) {
        for (var i = 0; i < data.rows.length; i++) {
          this.favoritos.push(data.rows.item(i));
        }
      }
    })
  }
  ngOnInit(){
    document.getElementById("inputData").addEventListener("ionChange",()=>{
      if ((<HTMLInputElement>document.getElementById("inputData")).value ==""){
        document.getElementById("listaResultados").setAttribute("hidden","hidden")
      }
    })
  }

  buscar(){
    if (this.tipoBusqueda=="1"){
      this.shService.buscarSuperheroeNombre(this.inputBusqueda).subscribe(
        (data:Response)=>{
          if(data["error"]){
            this.marvelHeroes=[]
            this.toastMsg('No hubo resultados');
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
            this.toastMsg('No hubo resultados');
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

  async toastMsg(msg) {
    const toast = await this.toastController.create({
      message: msg,
      duration: 2000,
    });
    toast.present();
  }

  showDetailSuperheroe(id){
    this.navCtrl.navigateRoot("/heroe-detalle/" + id)
  }

  desfavear(id_heroe){
    this.presentAlertConfirm(id_heroe)
  }

  async presentAlertConfirm(id_heroe) {
    const alert = await this.alertController.create({
      cssClass: 'alertConfirm',
      header: '¿Estas seguro?',
      message: '¿Estas seguro que deseas quitar este personaje de Mis Favoritos?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'secondary',
          id: 'cancel-button',
          handler: ()=>{}
        }, {
          text: 'Confirmar',
          id: 'confirm-button',
          handler: () => {
            this.db.eliminarHeroe(id_heroe).then(()=>{
              let index= this.findIndexById(id_heroe)
              if (index==null){
                console.log("No se encontró")
              }else{
                this.favoritos.splice(this.findIndexById(id_heroe),1)
                this.toastMsg("Superheroe eliminado de Mis Favoritos correctamente")
              }
            })
          }
        }
      ]
    });

    await alert.present();
  }

  findIndexById(id_heroe){
    for (let i=0; i<this.favoritos.length; i++){
      if (parseInt(this.favoritos[i].id_heroe)==parseInt(id_heroe)){
        return i
      }
    }
    return null
  }
}
