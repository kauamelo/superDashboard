

class Board {
    constructor () {

        // 
        this.todayTodayBookings = 0;

        // The number of each type of animal which has booked a meeting today.
        this.numberOfCats = 0;
        this.numberOfDogs = 0;
        this.numberOfHorses = 0;
        this.numberOfExotic = 0;

        // GIFs and images
        this.horseGif = createImg('assets/gifs/horse.gif');
        this.catGif = createImg('assets/gifs/cat.gif');
        this.dogGif = createImg('assets/gifs/dog.gif');
        this.exoticGif = createImg('assets/gifs/exotic.gif');
        this.coinImg = loadImage('assets/coin.png');

        // 
        this.highScoreData = [
            {  date: 'DEC 01', meetings: 320 },
            {  date: 'DEC 12', meetings: 311 },
            {  date: 'DEC 22', meetings: 291 },
            {  date: 'DEC 28', meetings: 121 },
            {  date: 'DEC 18', meetings: 97 }
          ];
    }


    draw() {

        // Invisible rect which wraps all the texts. 
        let rectWidth = 800;
        let rectHeight = windowHeight - 100;

        let dashBoardPosition = createVector(windowWidth/2 - rectWidth/2, 
                                             windowHeight/2 - rectHeight/2);


        push();
            translate(dashBoardPosition.x, dashBoardPosition.y);

            // Invisible rect which wraps all texts.
            // fill(200,140,100);
            // stroke(255);
            // noFill();
            // rect(0,0,rectWidth, rectHeight);

            // SUPER AGRIA VET GUIDE   /   TODAY * 230
            fill(255);
            textSize(44);
            text("SUPER AGRIA VET GUIDE", rectWidth/2, textAscent());
            text("TODAY", rectWidth/2 - 100, 2*textAscent() + 20);
            image(this.coinImg, rectWidth/2 + 60, 2*textAscent() + 5);
            textAlign(LEFT);
            text(`${this.todayTodayBookings}`, rectWidth/2 +100, 2*textAscent() + 20);


            // Gifs row
            // let gifRowPosY = dashBoardPosition.y + 6*textAscent() + 200;
            let gifRowPosY = windowHeight - 800;

            let paddingLeft = 55;
            let spaceBetweenGifs = 200;
            let numberOfAnimalsPadding = 70;
            textSize(33);

            this.dogGif.position(dashBoardPosition.x + paddingLeft, gifRowPosY);
            text(`${this.numberOfDogs}`, paddingLeft + numberOfAnimalsPadding, gifRowPosY-10);

            this.catGif.position(dashBoardPosition.x + paddingLeft + spaceBetweenGifs, gifRowPosY + 6);
            text(`${this.numberOfCats}`, paddingLeft + spaceBetweenGifs + numberOfAnimalsPadding, gifRowPosY - 10);

            this.horseGif.position(dashBoardPosition.x + paddingLeft + 2*spaceBetweenGifs, gifRowPosY - 2);
            text(`${this.numberOfHorses}`, paddingLeft + 2*spaceBetweenGifs + numberOfAnimalsPadding, gifRowPosY - 10);

            this.exoticGif.position(dashBoardPosition.x + paddingLeft + 3*spaceBetweenGifs, gifRowPosY);
            text(`${this.numberOfExotic}`,paddingLeft + 3*spaceBetweenGifs + numberOfAnimalsPadding, gifRowPosY -10);


            // High Score board
            push();
                let highScoreRectDimensions = createVector(700, 475);

                // Dashed borders
                translate(paddingLeft, gifRowPosY + 30);
                stroke(255);
                drawingContext.setLineDash([5, 5]);  // Set a dotted pattern for the stroke
                strokeWeight(2);
                noFill();
                rect(0, 0, highScoreRectDimensions.x, highScoreRectDimensions.y);
                drawingContext.setLineDash([]); // Reset the line dash to default

                //  Header: HIGH SCORE 
                fill(255);
                textAlign(CENTER);
                noStroke();
                text('HIGH SCORE', highScoreRectDimensions.x/2 , 60 );


                // TABLE
                let tablePosY = 150;
                let tableColumn1PaddingLeft = 20;
                let tableColumn2PaddingLeft = 180;
                let tableColumn3PaddingLeft = 470;
                let rowHight = 50;
                textAlign(LEFT);
                text("#", tableColumn1PaddingLeft, tablePosY);
                text("DAY", tableColumn2PaddingLeft, tablePosY);
                text("MEETINGS", tableColumn3PaddingLeft, tablePosY);

                for (let i = 0; i < this.highScoreData.length; i++) {
                    let yPos = tablePosY + (i+1.5)*rowHight; 

                    text((i+1).toString(), tableColumn1PaddingLeft, yPos);
                    text(this.highScoreData[i].date, tableColumn2PaddingLeft, yPos);
                    text(this.highScoreData[i].meetings, tableColumn3PaddingLeft, yPos);
                }

                // Yesterday's score
                textAlign(CENTER);
                textSize(28);
                text(`YESTERDAY'S SCORE: ${271}`, highScoreRectDimensions.x/2, highScoreRectDimensions.y + 50);

            pop();
        pop();
    }
}