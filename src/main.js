import { collisions , interacts} from "../data/collisions";
import { text_data } from "../data/interaction_data";
import { movesets_equipped } from "../data/movesets_data";
import { Boundary, Sprite } from "./classes";
import { basic, mastery, Moveset, test } from "./moveset";
import { displayDialogue, displayMenu } from "./utils";

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

const movesets_possesed = [];

const player = new Sprite({
    position: {
        x:canvas.width/2 - (256 / 4) / 2, 
        y:canvas.height /2- 256 / 2 
    },
    image: playerImage,
    frames: {
        max: 4
    },
    sizef: {max:0.25},
    context: context,
    sprites: attackImage
})

const dummy = new Sprite({
    position: {
        x:canvas.width/2 +250, 
        y:canvas.height/2 +400,
    },
    image: attackImage,
    frames: {
        max: 4
    },
    sizef: {max:0.25},
    context: context,
    sprites: attackImage
})

const enemies = [dummy]

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
    },
    shift: {
        pressed: false
    }
}

let pressed = ""
const movables = [background, ...boundaries, foreground, ...interactors, dummy]
const camera = [background,foreground]


function moveset({moveset}){
    const sequence = moveset.sequence
    if ( sequence === pressed){
            player.image = moveset.sprite
            player.frames.valy = 3
            timeCheck({time: counter, lower_boundary: moveset.lower_bound, upper_boundary: moveset.upper_bound})    
            setTimeout(() => {
                pressed = ""
                player.image = playerImage
            }, 400)
            setTimeout(() => {
                const msg = document.getElementById("msg")
                msg.innerText = ""
            }, 4000)
    }
}

function timeCheck({time, lower_boundary, upper_boundary}){
    if(time <= lower_boundary){
        const msg = document.getElementById("msg")
        msg.innerText = "LOWER WEAK"
        console.log("LOWER WEAK")
        counter =0
    }
    else if (time > lower_boundary && time < upper_boundary){
        const msg = document.getElementById("msg")
        msg.innerText = "CRITICAL"
        console.log("CRITICAL")
        counter =0

    } else if (time >= upper_boundary){
        const msg = document.getElementById("msg")
        msg.innerText = "UPPER WEAK"
        console.log("UPPER WEAK")
        counter =0
    }
}

function rectCollision({rectangle1, rectangle2}){
    return (
        rectangle1.position.x + rectangle1.width/1.7 >= rectangle2.position.x && 
        rectangle1.position.x <= rectangle2.position.x + rectangle2.width/3&&
        rectangle1.position.y<= rectangle2.position.y + rectangle2.height/12&&
        rectangle1.position.y + rectangle1.height/1.09>= rectangle2.position.y
    )
}
let time_elapsed = 0;
let counter = 0;
let speed;
function animate() {
    let currentMoveset = movesets_equipped[movesets_equipped.length-1];
    const eq = document.getElementById("equipped")
    eq.innerText = currentMoveset.name
    window.requestAnimationFrame(animate);
        background.draw();
        boundaries.forEach(boundary => {
            boundary.draw()        
        })
    dummy.draw()
    player.draw()
    foreground.draw()
    let moving = true;
    player.moving = false
    player.sizef.max = 0.25
    player.frames.max = 4
    player.key = ''
    if (keys.shift.pressed) speed = 3
    else speed = 1.5
    if ((keys.w.pressed) && (lastkey === 'w')) {
        player.image = playerImage
        player.moving = true
        player.key = 'w'

        // enemy collision
        for (let j = 0 ; j < enemies.length; j++){
            if(rectCollision({rectangle1: player, rectangle2:{...enemies[j], position: {
                x: enemies[j].position.x,
                y: enemies[j].position.y+3  
            }}
            })){
                moving = false;
                break;
            }  
        }

        //boundary and interactables collision
        for (let i = 0 ; i< boundaries.length; i++){
            const boundary = boundaries[i]
            if(rectCollision({rectangle1: player, rectangle2: {...boundary, position: {
                x: boundary.position.x, 
                y: boundary.position.y+3}}
            })){
                moving = false;
                break;
            }  
            if(i >= interactors.length) continue;
            const interactable = interactors[i]
            if(rectCollision({rectangle1: player, rectangle2: {...interactable, position: {
                x: interactable.position.x,
                y: interactable.position.y+3}}
            })){
                lastkey = ""
                if (interactable.id === 1800){
                    window.removeEventListener('keydown', handleKeydown)
                    if (!movesets_possesed.includes(basic)) movesets_possesed.push(basic)
                    displayDialogue(
                        text_data.sword_wall,
                        () => (window.addEventListener('keydown', handleKeydown))
                    );
                }
                else if (interactable.id === 1999){
                    window.removeEventListener('keydown', handleKeydown)
                    if (!movesets_possesed.includes(basic)) movesets_possesed.push(basic)
                    displayDialogue(
                        text_data.sword,
                        () => (window.addEventListener('keydown', handleKeydown))
                    );
                } else if (interactable.id === 1705){
                    window.removeEventListener('keydown', handleKeydown)
                    if (!movesets_possesed.includes(mastery)) movesets_possesed.push(mastery)
                    displayDialogue(
                      text_data.tombstone,
                      () => (window.addEventListener('keydown', handleKeydown))
                    );
                }
                console.log()
                moving = false;
                break;
            } 
        }
        if (moving){
            movables.forEach((movable) => {
                movable.position.y += speed;
        })}
    }
    else if (keys.a.pressed && lastkey === 'a'){
        player.image = playerImage
        player.moving = true
        player.key = 'a'
        // enemy collision
        for (let j = 0 ; j < enemies.length; j++){
            if(rectCollision({rectangle1: player, rectangle2:{...enemies[j], position: {
                x: enemies[j].position.x+3,
                y: enemies[j].position.y  
            }}
            })){
                moving = false;
                break;
            }  
        }

        // boundary and interactable collision
        for (let i = 0 ; i< boundaries.length; i++){
            const boundary = boundaries[i]
            if(rectCollision({rectangle1: player, rectangle2: {...boundary, position: {
                x: boundary.position.x+3, 
                y: boundary.position.y}}
            })){
                moving = false;
                break;
            }
            if(i >= interactors.length) continue;
            const interactable = interactors[i]
            if(rectCollision({rectangle1: player, rectangle2: {...interactable, position: {
                x: interactable.position.x +3,
                y: interactable.position.y}}
            })){
                lastkey = ""    
                if (interactable.id === 1705){
                    window.removeEventListener('keydown', handleKeydown)
                    displayDialogue(
                      text_data.tombstone,
                      () => (window.addEventListener('keydown', handleKeydown))
                    );
                }
                console.log()
                moving = false;
                break;
            }  
        }
        if(moving){
            movables.forEach((movable) => {
                movable.position.x += speed;
            })
        }

    } 
    else if (keys.d.pressed && lastkey === 'd') {
        player.image = playerImage
        player.moving = true
        player.key = 'd'
        // enemy collision
        for (let j = 0 ; j < enemies.length; j++){
            if(rectCollision({rectangle1: player, rectangle2:{...enemies[j], position: {
                x: enemies[j].position.x-3,
                y: enemies[j].position.y  
            }}
            })){
                moving = false;
                break;
            }  
        }

        // boundary and interactable collision
        for (let i = 0 ; i< boundaries.length; i++){
            const boundary = boundaries[i]
            if(rectCollision({rectangle1: player, rectangle2: {...boundary, position: {
                x: boundary.position.x-3, 
                y: boundary.position.y}}
            })){
                moving = false;
                break;
            } 
            if(i >= interactors.length) continue;
            const interactable = interactors[i]
            if(rectCollision({rectangle1: player, rectangle2: {...interactable, position: {
                x: interactable.position.x -3,
                y: interactable.position.y}}
            })){
                moving = false;
                break;
            }  
        }
        if (moving) {
            movables.forEach((movable) => {
                movable.position.x -= speed;
            })
        }
    }
    else if (keys.s.pressed && lastkey === 's') {
        player.image = playerImage
        player.moving = true
        player.key = 's'
        // enemy collision
        for (let j = 0 ; j < enemies.length; j++){
            if(rectCollision({rectangle1: player, rectangle2:{...enemies[j], position: {
                x: enemies[j].position.x,
                y: enemies[j].position.y-3  
            }}
            })){
                moving = false;
                break;
            }  
        }

        // boundary and interactable collision
        for (let i = 0 ; i< boundaries.length; i++){
            const boundary = boundaries[i]
            if(rectCollision({rectangle1: player, rectangle2: {...boundary, position: {
                x: boundary.position.x, 
                y: boundary.position.y-3}}
            })){
                moving = false;
                break;
            }
            if(i >= interactors.length) continue;
            const interactable = interactors[i]
            if(rectCollision({rectangle1: player, rectangle2: {...interactable, position: {
                x: interactable.position.x,
                y: interactable.position.y-3}}
            })){
                moving = false;
                break;
            }   
        }
        if(moving) {
            movables.forEach((movable) => {
                movable.position.y -= speed;
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
    else if (pressed.length > 0 && movesets_equipped.length > 1){
        time_elapsed++
        if (time_elapsed%110 === 0){
            counter++
            moveset({moveset: currentMoveset})
        }
    }
    if (pressed.length > 20){
        pressed = ""
    }
}

animate()
let lastkey = "";
window.addEventListener('keydown', handleKeydown)
window.addEventListener('keyup', handleKeyup)
window.addEventListener('keydown', sprint)
window.addEventListener('keyup', sprint_up)
function sprint(e){
    if (e.key === "Shift"){
        keys.shift.pressed = true
    }
}
function sprint_up(e){
    if (e.key === "Shift"){
        keys.shift.pressed = false
        lastkey = ''
    }
}

function handleKeydown(e){
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
        window.removeEventListener('keydown', handleKeydown)
        break;
        case 'j':
        keys.j.pressed = true;
        lastkey = 'j';
        pressed = 'j' + pressed
        window.removeEventListener('keydown', handleKeydown)
        break;
        case 'k':
        keys.k.pressed = true;
        lastkey = 'k';
        pressed = 'k' + pressed
        window.removeEventListener('keydown', handleKeydown)
        break;
        case 'l':
        keys.l.pressed = true;
        lastkey = 'l';
        pressed = 'l' + pressed
        window.removeEventListener('keydown', handleKeydown)
        break;
        case 'f':
        pressed = ""
        counter = 0
        break;
        case 'Tab':
            window.removeEventListener('keydown',handleKeydown)
            pressed = ""
            displayMenu( 
                movesets_possesed,
                () => (window.addEventListener('keydown', handleKeydown)))
        break;
    }
}

function handleKeyup(e){
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
            window.addEventListener('keydown', handleKeydown)
        }, 400)
        break;
        case 'j':
        setTimeout(() => {
            keys.j.pressed = false,
            lastkey = 'j'
            window.addEventListener('keydown', handleKeydown)
        }, 400)
        break;
        case 'k':
        setTimeout(() => {
            keys.k.pressed = false,
            lastkey = 'k'
            window.addEventListener('keydown', handleKeydown)
        }, 400)
        break;
        case 'l':
        setTimeout(() => {
            keys.l.pressed = false,
            lastkey = 'l'
            window.addEventListener('keydown', handleKeydown)
        }, 400)
        break;
    }
}