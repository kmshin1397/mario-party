export class Character {
  id: number;
  name: string;
  members: string[];
  currentLoc: string;
  currentLocIndex: number;
  numStars: number;
  numCoins: number;
  defaultPicture: string;

  constructor(data: any) {
    this.id = data.id;
    this.name = data.name;
    this.members = data.members;
    this.currentLoc = data.currentLoc;
    this.currentLocIndex = data.currentLocIndex;
    this.numStars = data.numStars;
    this.numCoins = data.numCoins;
    this.defaultPicture = data.defaultPicture;
  }
}
