export class Moveset{
    constructor({sequence, sprite, name}){
        this.name = name
        this.sequence = sequence
        this.sprite = sprite
    }
}
const attackImage = new Image();
attackImage.src = './ATTACK.png'

export const basic = new Moveset({sequence:['l','l','i'], sprite:attackImage})