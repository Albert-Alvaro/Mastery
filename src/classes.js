export class Sprite {
    constructor({position,image, frames = {max: 1}, sizef = {max: 1}, context, item, sprites}) {
        this.position = position
        this.image = image
        this.frames = {...frames, valx: 0, valy: 0, elapsed: 0}
        this.sizef = sizef
        this.context = context
        this.moving = false
        this.key = ''
        this.item = item
        this.sprites = sprites

        this.image.onload = () => {
            this.width = this.image.width/ this.frames.max
            this.height = this.image.height/ this.frames.max
            
        }
        
    }
    draw() {
        this.context.drawImage(
            this.image,
            this.frames.valx * this.width,
            this.frames.valy * this.height,
            this.image.width / this.frames.max,
            this.image.height / this.frames.max,
            this.position.x,
            this.position.y, 
            this.image.width * this.sizef.max,
            this.image.height * this.sizef.max, 
        );
        if(!this.moving) {
            this.frames.valx = 0 
            return}
        if(this.key === 'w'){
            this.frames.valy = 2
            if(this.frames.max > 1){
                this.frames.elapsed++
            } 
            if(this.frames.elapsed%20 === 0 ){
                if (this.frames.valx < this.frames.max -1 ) this.frames.valx++
                else this.frames.valx = 0
            }
        }else if (this.key === 'a'){
            this.frames.valy = 3
            if(this.frames.max > 1){
                this.frames.elapsed++
            }
    
            if(this.frames.elapsed%20 === 0 ){
                if (this.frames.valx < this.frames.max -1 ) this.frames.valx++
                else this.frames.valx = 0
            }
        }else if (this.key === 'd'){
            this.frames.valy = 1
            if(this.frames.max > 1){
                this.frames.elapsed++
            }
    
            if(this.frames.elapsed%20 === 0 ){
                if (this.frames.valx < this.frames.max -1 ) this.frames.valx++
                else this.frames.valx = 0
            }
        }else if (this.key === 's'){
            this.frames.valy = 0
            if(this.frames.max > 1){
                this.frames.elapsed++
            }
    
            if(this.frames.elapsed%20 === 0 ){
                if (this.frames.valx < this.frames.max -1 ) this.frames.valx++
                else this.frames.valx = 0
            }
        } else if (this.key === 'i'){
            this.frames.max = 3
            this.frames.valy = 0
            this.frames.valx = 0
        }
        
    }   
}

export class Boundary {
    static width = 48
    static height = 48
    constructor({position, context}){
        this.position = position
        this.width = 48
        this.height = 48
        this.context = context
    }

    draw(){
        this.context.fillStyle = 'rgba(255,0,0,0)';
        this.context.fillRect(this.position.x, this.position.y, this.width, this.height)
    }
}

export class Item{
    constructor({id, type, sprite}){
        this.id = id
        this.type = type
        this.sprite = sprite
        this.equipped = false
    }
}