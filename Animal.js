
class Animal {
    constructor(posX, posY, name, type, handleAnimalBooked) {
        this.x = posX;
        this.y = posY;
        this.initialY = this.y;

        this.name = name;

        this.type = type;

        switch(type){
            case animalTypes.DOG:
                this.image = createImg('assets/gifs/dog.gif');
                break;

            case animalTypes.CAT:
                this.image = createImg('assets/gifs/cat.gif');
                break;

            case animalTypes.HORSE:
                this.image = createImg('assets/gifs/horse.gif');
                break;

            case animalTypes.EXOTIC:
                this.image = createImg('assets/gifs/exotic.gif');
                break;

            default:
                this.image = createImg('assets/gifs/exotic.gif');
        }

        this.speed = 3;

        this.isDead = false;
        this.leftFirstPipe = false;
        this.enteredSecondPipe = false;

        this.handleAnimalBooked = handleAnimalBooked;
    }
  
    update() {
        if(!this.isDead)
        {
            this.x += this.speed;
            this.y = this.initialY + 10 * sin(this.x * 2);

            // When leaving the first pipe
            if(!this.leftFirstPipe && this.x + 60 >= leftPipeImg.position().x + leftPipeImg.width) {
                this.leftFirstPipe = true;
                if(pipeSound.isLoaded()){
                    pipeSound.play();
                }
            }   

            // When entering the right pipe
            if(!this.enteredSecondPipe && this.x >= rightPipeImg.position().x) {
                this.enteredSecondPipe = true;

                if(coinSound.isLoaded()){
                    coinSound.play();
                }

                this.handleAnimalBooked(this.type);
            }
            
            // Kill this animal when getting in the right pipe.
            if(this.x >= windowWidth){
                this.kill();
            }
        }
    }
  
    draw() {
        if(!this.isDead)
        {
            fill(255);
            textAlign(CENTER);
            textSize(20);
            text(this.name, this.x, this.y-30);

            this.image.position(this.x - this.image.width/2, 
                                this.y - this.image.height/2);
        }
    }

    kill() {
        this.isDead = true;
        this.image.remove(); // Remove the HTML element
        this.image = null;
    }
}