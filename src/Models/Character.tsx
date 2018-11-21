export default class Character {
  id?: number; //The id of the character.
  name?: string; //The name of the character.
  status?: string; //The status of the character ('Alive', 'Dead' or 'unknown').
  species?: string; //The species of the character.
  type?: string; //The type or subspecies of the character.
  gender?: string; //The gender of the character ('Female', 'Male', 'Genderless' or 'unknown').
  origin?: locationInterface; //Name and link to the character's origin location.
  location?: locationInterface; //Name and link to the character's last known location endpoint.
  image?: string; //Link to the character's image. All images are 300x300px and most are medium shots or portraits since they are intended to be used as avatars.
  episode?: string; //List of episodes in which this character appeared.
  url?: string; //Link to the character's own URL endpoint.
  created?: string; //Time at which the character was created in the database.

  matchingName = (formatedQuery: string) => {
    // TODO: implement matching name for list filtering
  };
}

// Normally we should create a class location and use the url
// to fetch the data related to the location, but here its not needed for this exercise
interface locationInterface {
  name: string;
  url: string;
}

export function mapCharacterJSONtoCharacter(object: any): Character {
  let character = new Character();
  character.id = object.id;
  character.name = object.name;
  character.status = object.status;
  character.species = object.species;
  character.type = object.type;
  character.gender = object.gender;
  character.origin = object.origin;
  character.location = object.location;
  character.image = object.image;
  character.episode = object.episode;
  character.url = object.url;
  character.created = object.created;
  return character;
}
