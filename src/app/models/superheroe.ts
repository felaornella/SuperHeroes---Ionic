export class Superheroe {
    id: string;
    name: string;
    powerstats: {};
    biography: {};
    appearance: {};
    work: {};
    image: {};
  
    constructor(
      id?: string,
      name?: string,
      powerstats?: {},
      biography?: {},
      appearance?: {},
      work?: {},
      image?: {}
    ) {
      this.id = id;
      this.name = name;
      this.powerstats = powerstats;
      this.biography = biography;
      this.appearance = appearance;
      this.work = work;
      this.image = image;
    }
  }