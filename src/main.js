import { collisions } from "../data/collisions";
import { Boundary, Sprite } from "./classes";

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
const foreimg = new Image();
foreimg.src = './foremap.png';

const collisionsMap = []
for (let i = 0 ; i < collisions.length; i+=50){
    collisionsMap.push(collisions.slice(i, 50+i));
}

const boundaries = []
collisionsMap.forEach((row, i) => {
    row.forEach((symbol, j) => {
        if (symbol === 1704)
        boundaries.push(new Boundary({position: {x: j*Boundary.width + offset.x ,y: i * Boundary.height +offset.y}, context: context}))
    })
})

const player = new Sprite({
    position: {
        x:canvas.width/2 - (128 / 4) / 2, 
        y:canvas.height /2- 128 / 2,
    },
    image: playerImage,
    frames: {
        max: 4
    },
    sizef: {max:0.5},
    context: context
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
    }
}
const movables = [background, ...boundaries, foreground]

function rectCollision({rectangle1, rectangle2}){
    return (
        rectangle1.position.x + rectangle1.width >= rectangle2.position.x && 
        rectangle1.position.x <= rectangle2.position.x + rectangle2.width/2&&
        rectangle1.position.y<= rectangle2.position.y + rectangle2.height/8 &&
        rectangle1.position.y + rectangle1.height*1.7 >= rectangle2.position.y
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
    if ((keys.w.pressed) && (lastkey === 'w')) {
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
        }
        if (moving){
            movables.forEach((movable) => {
                movable.position.y += 3;
            })}
    }
    else if (keys.a.pressed && lastkey === 'a'){
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
        }
        if(moving){
            movables.forEach((movable) => {
                movable.position.x += 3;
            })
        }

    } 
    else if (keys.d.pressed && lastkey === 'd') {
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
        }
        if (moving) {
            movables.forEach((movable) => {
                movable.position.x -= 3;
            })
        }
    }
    else if (keys.s.pressed && lastkey === 's') {
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
        }
        if(moving) {
            movables.forEach((movable) => {
                movable.position.y -= 3;
            })
        }
    }
    
}
let lastkey = "";
animate()

window.addEventListener('keydown', (e) => {

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
    }
})
