import { Injectable } from '@angular/core';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite/ngx';
import { Superheroe } from '../models/superheroe';

@Injectable({
  providedIn: 'root',
})
export class DatabaseService {
    db: SQLiteObject
    tables = {
        heroes: "superheroes_favoritos"
    }

    constructor(private sqlite: SQLite) {}

    async createDatabase(){
        await this.sqlite.create({
            name:"superheroes",
            location:"default"
        })
        .then((db: SQLiteObject)=>{
            this.db=db;
        })
        .catch((e)=>{
            alert("Error creando la BD " + JSON.stringify(e));
        });

        await this.createTables();
    }

    async createTables(){
        let consulta="CREATE TABLE IF NOT EXISTS superheroes_favoritos ( id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT, id_heroe VARCHAR(255) NULL UNIQUE, name VARCHAR(255) NULL, p_intelligence VARCHAR(255) NULL, p_strength VARCHAR(255) NULL,p_speed VARCHAR(255) NULL,"
        consulta= consulta + "p_durability VARCHAR(255) NULL, p_power VARCHAR(255) NULL, p_combat VARCHAR(255) NULL, b_full_name VARCHAR(255) NULL, b_place_of_birth VARCHAR(255) NULL, b_publisher VARCHAR(255) NULL, a_gender VARCHAR(255) NULL,"
        consulta= consulta + "a_race VARCHAR(255) NULL, a_height VARCHAR(255) NULL, a_weight VARCHAR(255) NULL, a_eye_color VARCHAR(255) NULL, a_hair_color VARCHAR(255) NULL, w_occupation VARCHAR(255) NULL, image_url LONGTEXT NULL)"
        await this.db.executeSql(consulta,[])
    }


    async insertarHeroe(heroe){
        return this.db.executeSql(
            `INSERT INTO ${this.tables.heroes} (id_heroe, name, p_intelligence, p_strength, p_speed, p_durability, p_power, p_combat, b_full_name, b_place_of_birth, b_publisher, a_gender, a_race, a_height, a_weight, a_eye_color, a_hair_color, w_occupation, image_url) ` +
            `VALUES (${heroe.id}, '${heroe.name}','${heroe.powerstats["intelligence"]}','${heroe.powerstats["strength"]}','${heroe.powerstats["speed"]}','${heroe.powerstats["durability"]}',` + 
            `'${heroe.powerstats["power"]}','${heroe.powerstats["combat"]}','${heroe.biography["full-name"]}','${heroe.biography["place-of-birth"]}','${heroe.biography["publisher"]}',` + 
            `'${heroe.appearance["gender"]}','${heroe.appearance["race"]}','${heroe.appearance["height"][1]}','${heroe.appearance["weight"][1]}','${heroe.appearance["eye-color"]}',` + 
            `'${heroe.appearance["hair-color"]}','${heroe.work["occupation"]}','${heroe.image["url"]}')`,
            []
        ).then(()=>{
            return "Elemento Agregado"
        })
        .catch((e)=>{
            return JSON.stringify(e)
        })
    }

    async eliminarHeroe(id_heroe){
        return this.db
            .executeSql(`DELETE FROM ${this.tables.heroes} WHERE id_heroe = ${id_heroe}`, [])
            .then(() => {
                return "Heroe eliminado";
            })
            .catch((e) => {
                return "Error eliminado superheroe: " + JSON.stringify(e);
        });
    }

    async buscarSiEsFavorito(id_heroe){
        return this.db.executeSql(
            `SELECT id from superheroes_favoritos where id_heroe = ${id_heroe}`,
            []
        ).then((res)=>{
            return res;
        })
        .catch((e)=>{
            return JSON.stringify(e)
        })
    }

    async getHeroes(){
        return this.db.executeSql(
            "SELECT * from superheroes_favoritos",
            []
        ).then((res)=>{
            return res;
        })
        .catch((e)=>{
            return JSON.stringify(e)
        })
    }

    async deleteDatabase(){
        this.sqlite.deleteDatabase({ name: "superheroes", location: 'default'})
        .then(()=>{
            return "BD Borrada"
        })
        .catch((e)=>{
            return "Falló"
        })
        
    }
}