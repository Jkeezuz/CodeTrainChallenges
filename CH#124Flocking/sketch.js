const flock = [];

function setup() {
//put setup code here
    createCanvas(640, 360);
    for(i = 0; i < 50; i++){
        flock.push(new Boid());
    }
}

function draw() {
//put drawing code here
    background(102);

    for (let boid of flock){
        boid.align();
        boid.update();
        boid.show();
    }
}