export class Moveset{
    constructor({sequence, sprite}){
        this.sequence = sequence
        this.sprite = sprite
    }
}
const attackImage = new Image();
attackImage.src = './ATTACK.png'

export const basic = new Moveset({sequence:['l','l','i'], sprite:attackImage})