let currentSecondEnd = 0
let currentMinuteEnd = 0
let currentHourEnd = 0

let scale = 1
let sizeX
let sizeY

let numberOfPoints = 512

let points = []

class Point {
    constructor(life) {
        this.size = 8
        this.x = map(Math.random(), 0, 1, -sizeX/2 + this.size/2, sizeX/2 - this.size/2);
        this.y = -sizeY/2 + this.size/2;
        this.fallSpeed = map(Math.random(), 0, 1, 2, 5);
        this.speedX = this.fallSpeed;
        this.speedY = this.fallSpeed*4;
        this.life = life * 0.5;
    }
    render() {
        this.x += this.speedX;
        this.y += this.speedY;
        this.life -= 0.01;
        if (this.life <= 0) {
            this.life = 0.5;
            this.x = map(Math.random(), 0, 1, -sizeX + this.size/2, sizeX - this.size/2);
            this.y = -sizeY/2 + this.size/2;
            this.fallSpeed = map(Math.random(), 0, 1, 2, 5);
            this.speedX = this.fallSpeed;
            this.speedY = this.fallSpeed*4;
        }
        let x = Math.round(this.x/this.size) * this.size;
        let y = Math.round(this.y/this.size) * this.size;
        noStroke();
        fill(`rgba(255, 255, 255, ${this.life})`);
        rect(x, y, this.size, this.size);
    }
}

function setup() {
    sizeX = windowWidth*scale;
    sizeY = windowHeight*scale;
    createCanvas(sizeX, sizeY);
    for (let i = 0; i < numberOfPoints; i++) {
        points.push(new Point(Math.random()));
    }
}

function clock() {
    fill(0);
    stroke(0);
    arc(0, 0, 210*scale, 210*scale, 0, PI*2);

    let currentHour = hour();
    let currentMinutes = minute();
    let currentSeconds = second();

    noFill();
    strokeWeight(10*scale);
    rotate(-PI/2);

    //Seconds
    stroke(255, 150, 150);
    let secondEnd = map(currentSeconds, 0, 60, 0, PI*2);
    currentSecondEnd += (secondEnd - currentSecondEnd) / 10;
    arc(0, 0, 200*scale, 200*scale, 0, currentSecondEnd);

    //Minutes
    stroke(150, 255, 150);
    let minuteEnd = map(currentMinutes, 0, 60, 0, PI*2);
    currentMinuteEnd += (minuteEnd - currentMinuteEnd) / 10;
    arc(0, 0, 160*scale, 160*scale, 0, currentMinuteEnd);
    
    //Hour
    stroke(150, 150, 255);
    let hourEnd = map(currentHour, 0, 24, 0, PI*2);
    currentHourEnd += (hourEnd - currentHourEnd) / 10;
    arc(0, 0, 120*scale, 120*scale, 0, currentHourEnd);

    //Greetings
    let greetings
    if (currentHour <= 11 && currentMinutes <= 59) {
        greetings = "Good Morning!";
    }
    if (currentHour > 11 && currentHour <= 18 && currentMinutes <= 59) {
        greetings = "Good Afternoon!";
    }
    if (currentHour > 18 && currentHour <= 23 && currentMinutes <= 59) {
        greetings = "Good Evening!";
    }
    fill(255);
    textAlign(CENTER, CENTER);
    textSize(32*scale);
    strokeWeight(1);
    rotate(PI/2);
    text(greetings, 0, 240);

    //Text
    currentHour = hour() < 10 ? "0" + hour() : hour();
    currentMinutes = minute() < 10 ? "0" + minute() : minute();
    let separator = ":";
    if (frameCount % 60 < 30) {
        separator = " ";
    }
    textSize(30*scale);
    strokeWeight(1);
    let finalText = currentHour + separator + currentMinutes;
    text(finalText, 0, 0);
}

function draw() {
    background(0);
    translate(sizeX/2, sizeY/2);
    for (let i = 0; i < numberOfPoints; i++) {
        points[i].render();
    }
    clock();
}