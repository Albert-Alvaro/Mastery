const canvas = document.querySelector('canvas');

const context = canvas.getContext('2d');

const image = new Image();
image.src = './map.png'
canvas.width = 1024;
canvas.height = 576;

const playerImage = new Image();
playerImage.src = './player.png';

context.fillRect(0, 0, canvas.width, canvas.height);

image.onload = () => {
    context.drawImage(image, -600, -700);
    playerImage.onload = () => {
        context.drawImage(
            playerImage,
            0,
            0,
            playerImage.width/4,
            playerImage.height/4, 
            canvas.width/2 - (playerImage.width / 4) / 2, 
            canvas.height /2- playerImage.height / 2,
            playerImage.width/4,
            playerImage.height/4, 
        );
    }
}

window.addEventListener('')