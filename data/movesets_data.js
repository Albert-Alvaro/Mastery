import { Moveset } from "../src/moveset";
const attackImage = new Image();
attackImage.src = './ATTACK.png'
const filler = new Moveset({name:"test-almighty-easter-egg", sequence:"uifguweqfbwufbwqegefuegfwufbwqeuvbqwu", sprite:attackImage})

export var movesets_equipped = [filler];