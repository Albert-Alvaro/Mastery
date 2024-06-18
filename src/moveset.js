export class Moveset{
    constructor({sequence, sprite, name,  hidden_name = "nothing to see ;)", lower_bound, upper_bound}){
        this.name = name
        this.hidden_name = hidden_name
        this.sequence = sequence
        this.sprite = sprite
        this.lower_bound = lower_bound
        this.upper_bound = upper_bound
    }
}
const attackImage = new Image();
attackImage.src = './ATTACK.png'

export const basic = new Moveset({name: "basic", sequence:"illi", sprite:attackImage, upper_bound: 4, lower_bound: 2})
export const test = new Moveset({name: "test", sequence:'jkl', sprite:attackImage, upper_bound: 4, lower_bound: 2})
export const mastery = new Moveset({name: "Mastery", sequence:'iikklliikkll', sprite:attackImage, upper_bound: 15, lower_bound: 13})