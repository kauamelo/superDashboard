
class Animal {
    constructor(x, y, name, type, imagePath) {
      this.x = x;
      this.y = y;

      this.name = name;

      this.type = type;
      this.image = createImg(imagePath);

      this.speed = 3;

      this.isDead = false;
      this.leftFirstPipe = false;
      this.enteredSecondPipe = false;
    }
  
    update() {
      if(!this.isDead)
      {
            this.x += this.speed;

            // Play pipe sound.
            if(pipeSound.isLoaded()){
                // when leaving the first pipe
                if(!this.leftFirstPipe && this.x + 60 >= leftPipeImg.position().x + leftPipeImg.width) {
                    this.leftFirstPipe = true;
                    pipeSound.play();
                }   

                // when entering the right pipe
                if(!this.enteredSecondPipe && this.x >= rightPipeImg.position().x) {
                    this.enteredSecondPipe = true;
                    pipeSound.play();
                }
            }
            
            // Kill it when getting in the right pipe
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