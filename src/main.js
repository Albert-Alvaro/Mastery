import { collisions } from "../data/collisions";

const canvas = document.querySelector('canvas');

const context = canvas.getContext('2d');



const image = new Image();
image.src = './map.png'
canvas.width = 1024;
canvas.height = 576;

const playerImage = new Image();
playerImage.src = './player.png';

const collisionsMap = []
for (let i = 0 ; i < collisions.length; i+=50){
    collisionsMap.push(collisions.slice(i, 50+i));
}

class Boundary {
    static width = 64
    static height = 64
    constructor({position}){
        this.position = position
        this.width = 64
        this.height = 64
    }

    draw(){
        context.fillStyle = 'rgba(255,0,0,0.2)';
        context.fillRect(this.position.x, this.position.y, this.width, this.height)
    }
}

const boundaries = []
const offset = {
    x:-600,
    y:-700
}
collisionsMap.forEach((row, i) => {
    row.forEach((symbol, j) => {
        if (symbol > 0)
        boundaries.push(new Boundary({position: {x: j*Boundary.width + offset.x ,y: i * Boundary.height +offset.y}}))
    })
})

class Sprite {
    constructor({position,image, frames = {max: 1}}) {
        this.position = position
        this.image = image
        this.frames = frames

        this.image.onload = () => {
            this.width = this.image.width/ this.frames.max
            this.height = this.image.height/ this.frames.max
            
        }
        
    }
    draw() {
        context.drawImage(
            this.image,
            0,
            0,
            this.image.width / this.frames.max,
            this.image.height / this.frames.max,
            this.position.x,
            this.position.y, 
            this.image.width / this.frames.max,
            this.image.height / this.frames.max, 
        );
    }
}

const player = new Sprite({
    position: {
        x:canvas.width/2 - (128 / 4) / 2, 
        y:canvas.height /2- 128 / 2,
    },
    image: playerImage,
    frames: {
        max: 4
    }
})

const background = new Sprite({
    position: { x: offset.x, y: offset.y,},
    image: image
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
const movables = [background, ...boundaries]

function rectCollision({rectangle1, rectangle2}){
    return (
        rectangle1.position.x + rectangle1.width >= rectangle2.position.x && 
        rectangle1.position.x <= rectangle2.position.x + rectangle2.width&&
        rectangle1.position.y<= rectangle2.position.y + rectangle2.height&&
        rectangle1.position.y + rectangle1.height >= rectangle2.position.y
    )
}

function animate() {
    window.requestAnimationFrame(animate);


        background.draw();
        boundaries.forEach(boundary => {
            boundary.draw()        
        })
        player.draw()
    let moving = true;
    if (keys.w.pressed && lastkey === 'w') {
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

animate()
let lastkey = "";
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
