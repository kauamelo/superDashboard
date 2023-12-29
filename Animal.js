
class Animal {
    constructor(x, y, name, type, imagePath) {
      this.x = x;
      this.y = y;

      this.name = name;

      this.type = type;
      this.image = createImg(imagePath);

      this.speed = 3;

      this.isDead = false;
    }
  
    update() {
      if(!this.isDead)
      {
          this.x += this.speed;
    
          if(this.x >= windowWidth){
            this.kill();
          }
      }
    }
  
    draw() {
        if(!this.isDead)
        {
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