export class Character {
  id: number;
  name: string;
  members: string[];
  currentLoc: string;
  currentLocIndex: number;
  numStars: number;
  numCoins: number;
  defaultPicture: string;
  color: string;
  canMove: boolean;
  turnIndex: number;
  diceRolls: number[];

  constructor(data: any) {
    this.id = data.id;
    this.name = data.name;
    this.members = data.members;
    this.currentLoc = data.currentLoc;
    this.currentLocIndex = data.currentLocIndex;
    this.numStars = data.numStars;
    this.numCoins = data.numCoins;
    this.defaultPicture = data.defaultPicture;
    this.color = data.color;
    this.canMove = data.canMove;
    this.turnIndex = data.turnIndex;
    this.diceRolls = data.diceRolls;
  }
}
