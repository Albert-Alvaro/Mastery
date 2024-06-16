export class Moveset{
    constructor({sequence, sprite, name, lower_bound, upper_bound}){
        this.name = name
        this.sequence = sequence
        this.sprite = sprite
        this.lower_bound = lower_bound
        this.upper_bound = upper_bound
    }
}
const attackImage = new Image();
attackImage.src = './ATTACK.png'

export const basic = new Moveset({sequence:['l','l','i'], sprite:attackImage})