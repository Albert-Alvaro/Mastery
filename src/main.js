import { collisions , interacts} from "../data/collisions";
import { Boundary, Sprite } from "./classes";
import { Moveset } from "./moveset";
import { displayDialogue } from "./utils";

const canvas = document.querySelector('canvas');
canvas.width = 1024;
canvas.height = 576;

const context = canvas.getContext('2d');

const offset = {
    x:-600,
    y:-700
}

const image = new Image();
image.src = './map.png'

const playerImage = new Image();
playerImage.src = './player.png';

const attackImage = new Image();
attackImage.src = './ATTACK.png'

const foreimg = new Image();
foreimg.src = './foremap.png';

const collisionsMap = []
for (let i = 0 ; i < collisions.length; i+=50){
    collisionsMap.push(collisions.slice(i, 50+i));
}

const interactsMap = []
for (let i = 0 ; i < interacts.length; i += 50){
    interactsMap.push(interacts.slice(i,i+50));
}

const boundaries = []
collisionsMap.forEach((row, i) => {
    row.forEach((symbol, j) => {
        if (symbol === 1704)
        boundaries.push(new Boundary({position: {x: j*Boundary.width + offset.x ,y: i * Boundary.height +offset.y}, context: context}))
    })
})

const interactors = []
interactsMap.forEach((row, i) => {
    row.forEach((symbol,j) => {
        if (symbol > 0)
            interactors.push(new Boundary({id: symbol ,position: {x: j*Boundary.width + offset.x, y: i*Boundary.height +offset.y}, context: context}))
    })
})

const basic = new Moveset({sequence:"illillill", sprite:attackImage})
const test = new Moveset({sequence:'jkl', sprite:attackImage})

const player = new Sprite({
    position: {
        x:canvas.width/2 - (256 / 4) / 2, 
        y:canvas.height /2- 256 / 2,
    },
    image: playerImage,
    frames: {
        max: 4
    },
    sizef: {max:0.25},
    context: context,
    sprites: attackImage
})
const background = new Sprite({
    position: { x: offset.x, y: offset.y,},
    image: image, 
    context: context
});

const foreground = new Sprite({
    position: { x: offset.x, y: offset.y,},
    image: foreimg,
    context: context
});

const keys = {
    w: {
        pressed : false
    },
    s: {
        pressed: false
    },
    a: {
        pressed: false
    },
    d: {
        pressed: false
    },
    i: {
        pressed : false
    },
    j: {
        pressed: false
    },
    k: {
        pressed: false
    },
    l: {
        pressed: false
    }
}

var pressed = ""

function moveset({moveset}){
    console.log(pressed)
    const sequence = moveset.sequence
    if ( sequence === pressed){
        player.image = moveset.sprite
        player.frames.valy = 3
    }
}


const movables = [background, ...boundaries, foreground, ...interactors]
const camera = [background,foreground]
function rectCollision({rectangle1, rectangle2}){
    return (
        rectangle1.position.x + rectangle1.width/1.7 >= rectangle2.position.x && 
        rectangle1.position.x <= rectangle2.position.x + rectangle2.width/3&&
        rectangle1.position.y<= rectangle2.position.y + rectangle2.height/12&&
        rectangle1.position.y + rectangle1.height/1.09>= rectangle2.position.y
    )
}
function animate() {
    window.requestAnimationFrame(animate);
        background.draw();
        boundaries.forEach(boundary => {
            boundary.draw()        
        })
        player.draw()
        foreground.draw()
    let moving = true;
    player.moving = false
    player.sizef.max = 0.25
    player.frames.max = 4
    player.key = ''
    if ((keys.w.pressed) && (lastkey === 'w')) {
        player.image = playerImage
        player.moving = true
        player.key = 'w'
        for (let i = 0 ; i< boundaries.length; i++){
            const boundary = boundaries[i]
            if(rectCollision({rectangle1: player, rectangle2: {...boundary, position: {
                x: boundary.position.x, 
                y: boundary.position.y+3}}
            })){
                console.log('colliding')
                moving = false;
                break;
            }  
            if(i >= interactors.length) continue;
            const interactable = interactors[i]
            if(rectCollision({rectangle1: player, rectangle2: {...interactable, position: {
                x: interactable.position.x,
                y: interactable.position.y+3}}
            })){
                console.log('interacting!')
                if (interactable.id === 1800){
                    player.isInDialogue = true;
                    displayDialogue(
                      "hello",
                      () => (player.isInDialogue = false)
                    );
                }
                moving = false;
                break;
            } 
        }
        if (moving){
            movables.forEach((movable) => {
                movable.position.y += 3;
        })}
    }
    else if (keys.a.pressed && lastkey === 'a'){
        player.image = playerImage
        player.moving = true
        player.key = 'a'
        for (let i = 0 ; i< boundaries.length; i++){
            const boundary = boundaries[i]
            if(rectCollision({rectangle1: player, rectangle2: {...boundary, position: {
                x: boundary.position.x+3, 
                y: boundary.position.y}}
            })){
                console.log('colliding')
                moving = false;
                break;
            }
            if(i >= interactors.length) continue;
            const interactable = interactors[i]
            if(rectCollision({rectangle1: player, rectangle2: {...interactable, position: {
                x: interactable.position.x +3,
                y: interactable.position.y}}
            })){
                console.log('interacting!')
                moving = false;
                break;
            }  
        }
        if(moving){
            movables.forEach((movable) => {
                movable.position.x += 3;
            })
        }

    } 
    else if (keys.d.pressed && lastkey === 'd') {
        player.image = playerImage
        player.moving = true
        player.key = 'd'
        for (let i = 0 ; i< boundaries.length; i++){
            const boundary = boundaries[i]
            if(rectCollision({rectangle1: player, rectangle2: {...boundary, position: {
                x: boundary.position.x-3, 
                y: boundary.position.y}}
            })){
                console.log('colliding')
                moving = false;
                break;
            } 
            if(i >= interactors.length) continue;
            const interactable = interactors[i]
            if(rectCollision({rectangle1: player, rectangle2: {...interactable, position: {
                x: interactable.position.x -3,
                y: interactable.position.y}}
            })){
                console.log('interacting!')
                moving = false;
                break;
            }  
        }
        if (moving) {
            movables.forEach((movable) => {
                movable.position.x -= 3;
            })
        }
    }
    else if (keys.s.pressed && lastkey === 's') {
        player.image = playerImage
        player.moving = true
        player.key = 's'
        for (let i = 0 ; i< boundaries.length; i++){
            const boundary = boundaries[i]
            if(rectCollision({rectangle1: player, rectangle2: {...boundary, position: {
                x: boundary.position.x, 
                y: boundary.position.y-3}}
            })){
                console.log('colliding')
                moving = false;
                break;
            }
            if(i >= interactors.length) continue;
            const interactable = interactors[i]
            if(rectCollision({rectangle1: player, rectangle2: {...interactable, position: {
                x: interactable.position.x,
                y: interactable.position.y-3}}
            })){
                console.log('interacting!')
                moving = false;
                break;
            }   
        }
        if(moving) {
            movables.forEach((movable) => {
                movable.position.y -= 3;
            })
        }
    }else if (keys.i.pressed && lastkey === 'i'){
        player.image = player.sprites
        player.key = 'i'
        
    }else if (keys.l.pressed ){
        player.image = player.sprites
        player.key = 'l'
       
    } else if (keys.k.pressed){
        player.image = player.sprites
        player.key = 'k'
    }
    if (pressed.length > 0){
        const ms = moveset({moveset: basic})
    }
    if (pressed.length > 10){
        pressed = ""
    }
}


animate()
let lastkey = "";
window.addEventListener('keydown', (e) => {
    console.log(e)
    switch (e.key){
        case 'w':
        keys.w.pressed = true;
        lastkey = 'w';
        break;
        case 'a':
        keys.a.pressed = true;
        lastkey = 'a';
        break;
        case 's':
        keys.s.pressed = true;
        lastkey = 's';
        break;
        case 'd':
        keys.d.pressed = true;
        lastkey = 'd';
        break;
        case 'i':
        keys.i.pressed = true;
        lastkey = 'i';
        pressed = 'i' + pressed
        break;
        case 'j':
        keys.j.pressed = true;
        lastkey = 'j';
        pressed = 'j' + pressed
        break;
        case 'k':
        keys.k.pressed = true;
        lastkey = 'k';
        pressed = 'k' + pressed
        break;
        case 'l':
        keys.l.pressed = true;
        lastkey = 'l';
        pressed = 'l' + pressed
        break;
        case 'f':
        pressed = ""
        break;
    }
})

window.addEventListener('keyup', (e) => {
    switch (e.key){
        case 'w':
        keys.w.pressed = false;
        break;
        case 'a':
        keys.a.pressed = false;
        break;
        case 's':
        keys.s.pressed = false;
        break;
        case 'd':
        keys.d.pressed = false;  
        break;
        case 'i':
        setTimeout(() => {
            keys.i.pressed = false,
            lastkey = 'i'
        }, 400)
        break;
        case 'j':
        setTimeout(() => {
            keys.j.pressed = false,
            lastkey = 'j'
        }, 400)
        break;
        case 'k':
        setTimeout(() => {
            keys.k.pressed = false,
            lastkey = 'k'
        }, 400)
        break;
        case 'l':
        setTimeout(() => {
            keys.l.pressed = false,
            lastkey = 'l'
        }, 400)
        break;
    }
})
