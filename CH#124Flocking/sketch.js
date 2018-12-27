const flock = [];

function setup() {
//put setup code here
    createCanvas(600, 600);
    for(i = 0; i < 60; i++){
        flock.push(new Boid());
    }

}

function draw() {
//put drawing code here
    background(0);

    for (let boid of flock){
        boid.correctPosition();
        boid.applyForce(boid.getSteeringForce(flock)); //update boid's position and velocity vector by applying given force
        boid.show();    // draw boid on the screen
    }
}