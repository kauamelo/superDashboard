
// Pipe
let leftPipeImg;
let rightPipeImg;
let pipeHeightFactor = 0.2;

let pipeLengthFactor = 0.2; // Pipe length will be 0.2 * windowWidth

// Base Image
let baseImg;
let baseImgScaled;

// Animals GIFs
let horseGif;

let animal;


// Draw: pipes, base, 
function drawScene () {
    // Left Pipe
    leftPipeImg.position(0, pipeHeightFactor*windowHeight);

    // Right Pipe
    rightPipeImg.position(windowWidth - rightPipeImg.width, pipeHeightFactor*windowHeight);

    // Base
    image(baseImgScaled, windowWidth/2, windowHeight - baseImgScaled.height/2);
}


function preload() {
    // !! The order in which you load things here does matter !!
    // Gif are loaded as 'createImg' which creates an HTML element outside the canvas.
    // Because of that you need to import the pipes as HTML elements as well otherwise the GIFs 
    //  will always be in front of the pipes.

    // Animal GIFs
    horseGif = createImg('assets/gifs/horse.gif');

    // Pipe
    leftPipeImg = createImg('assets/pipe.png');
    rightPipeImg = createImg('assets/pipe.png');

    // Base
    baseImg = loadImage('assets/base.png');  // This will remain untouched.
    baseImgScaled = loadImage('assets/base.png'); // This will be resized possibly several times.
}

function setup() {
    createCanvas(windowWidth, windowHeight);

    angleMode(DEGREES);

    imageMode(CENTER); // This will make placement and rotation easier because the 
                       // anchor point is moved to the center of the image

    // Resizing images
    leftPipeImg.style('width', `${pipeLengthFactor * windowWidth}px`);
    leftPipeImg.style('height', `${leftPipeImg.height}px`);

    rightPipeImg.style('width', `${pipeLengthFactor * windowWidth}px`);
    rightPipeImg.style('height', `${rightPipeImg.height}px`);
    rightPipeImg.style('transform', 'scaleX(-1)');

    baseImgScaled.resize(windowWidth, baseImgScaled.height);

    // Bringing the pipes to the front so it always show above all other <imgs>
    // leftPipeImg.style('z-index', '2');
    // rightPipeImg.style('z-index', '2');

    animal = new Animal(leftPipeImg.width/2, 
                        pipeHeightFactor*windowHeight + leftPipeImg.height/2, 
                        "Busse", 
                        2, 
                        'assets/gifs/horse.gif');

}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);

    // Resizing the pipes
    let pipeLength = pipeLengthFactor*windowWidth;
    leftPipeImg.style('width', `${pipeLength}px`);
    leftPipeImg.style('height', `${leftPipeImg.height}px`);
    rightPipeImg.style('width', `${pipeLength}px`);
    rightPipeImg.style('height', `${leftPipeImg.height}px`);


    // Resizing the base
    baseImgScaled = baseImg.get();
    baseImgScaled.resize(windowWidth, baseImgScaled.height);
}

function update() {
    animal.update();
}

function draw() {
    update();
    background(0);

    drawScene();
    
    horseGif.position(mouseX, mouseY);

    animal.draw();

}
