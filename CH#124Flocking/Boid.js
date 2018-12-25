class Boid{
    //A single "Boid", represented as a shape on the canvas
    constructor() {
        this.position = createVector(width / 2, height / 2);
        this.acceleration = createVector();
        this.velocity = p5.Vector.random2D();
        this.velocity.setMag(random(0.5,1.5));
    }

    show() {
        strokeWeight(16);
        stroke(255);
        point(this.position.x, this.position.y);
    }

    align(boids) {
        let range = 100;
        let avg = createVector();
        let total = 0;
        for(let other_boid of flock){
            if(other_boid != this 
                && dist(this.position.x, other_boid.position.x, this.position.y, other_boid.position.y) <= range){
                avg.add(other_boid.velocity);
                total++;
            }
        }
        if(total > 0){
            avg.div(total);
            avg.sub(this.velocity);
        }
            return avg;

    }

    update(){
        this.position.add(this.velocity);
        this.velocity.add(this.acceleration)
    }

}