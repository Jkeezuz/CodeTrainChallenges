class Boid{
    //A single "Boid", represented as a shape on the canvas
    constructor() {
        this.position = createVector(random(0, width), random(0, height));
        this.acceleration = createVector();
        this.velocity = p5.Vector.random2D();
        this.velocity.setMag(random(3,3.5));
        this.maxSpeed = 2;
        this.maxForce = 0.2;
    }

    show() {
        strokeWeight(8);
        stroke(125,125,0);
        point(this.position.x, this.position.y);
        //TODO: IMPLEMENT DRAWING BOID AS A TRIANGLE
        //FACING THE DIRECTION OF VELOCITY
   
    }


    align(steeringForce, range){
        let avgVel = createVector();//A vector for average velocity 
        let total = 0;//number of boids in range
        for(let other_boid of flock){
            if(other_boid != this && dist(this.position.x,this.position.y , other_boid.position.x, other_boid.position.y) <= range){
                //If other_boid isn't the same as this and it is within our range
                avgVel.add(other_boid.velocity);
                total++;
            }
        }
        if(total > 0){
            avgVel.div(total);
            //Steering force is equal to the substraction result of average vector - this boid's velocity vector
            //Force boids to always go with maximum speed
            avgVel.setMag(this.maxSpeed);

          //  steeringForce =  avgVel.sub(this.velocity);

            avgVel.sub(this.velocity);
            avgVel.limit(this.maxForce);
            steeringForce.add(avgVel);
            //Limit the steering force so the boid doesnt instantly start going with
            //the velocity of first neighbour
          //  steeringForce.limit(this.maxForce);
        }
        return steeringForce;
    }

    cohesion(steeringForce, range){
        let avgPos = createVector();
        let total = 0;
        for(let other_boid of flock){
            if(other_boid != this && dist(this.position.x,this.position.y , other_boid.position.x, other_boid.position.y) <= range){
                avgPos.add(other_boid.position);
                total++;
            }
        }
        if(total > 0){
            avgPos.div(total);
            avgPos.sub(this.position);
          //  avgPos.setMag(this.maxSpeed);
          //  avgPos.sub(this.velocity);
            //we should force our boid to rotate towards the avg position
            avgPos.limit(this.maxForce);
            steeringForce.add(avgPos);
       //     steeringForce = avgPos.sub(this.position)
         //   steeringForce.setMag(this.maxSpeed);
         //   steeringForce.sub(this.velocity);
         //   steeringForce.limit(this.maxForce);
        }
        return steeringForce;
    }
    separation(steeringForce, range){
        let separateVec = createVector();
        let distance = 0;
        for(let other_boid of flock){
            distance = dist(this.position.x,this.position.y , other_boid.position.x, other_boid.position.y);
            if(other_boid != this && distance <= range){
                separateVec = createVector( this.position.x - other_boid.position.x   ,  this.position.y  -  other_boid.position.y) ;
                distance = (1/distance);
                separateVec.mult(distance);
                separateVec.limit(this.maxForce);
                steeringForce.add(separateVec);
            }
        }
        return steeringForce;
    }

    
    getSteeringForce(boids) {
        let range = 40; //Range of visibility for a single boid
        let steeringForce = createVector(); //A vector that describes the steering force, that will be applied to the boid
        //1. Alignment
           //steeringForce = this.align(steeringForce, range);
         //2.Cohesion
           steeringForce = this.cohesion(steeringForce, range);
         //3.Separation
          // steeringForce = this.separation(steeringForce, range);
         return steeringForce;
    }

    correctPosition(){
        if(this.position.x > width) this.position.x = 0;
        if(this.position.x < 0) this.position.x = width -1;
        if(this.position.y > height) this.position.y = 0;
        if(this.position.y < 0) this.position.y = height - 1;
    }

    applyForce(force){
        
        this.acceleration = force;

        this.position.add(this.velocity);

        this.velocity.add(this.acceleration)
        this.velocity.setMag(this.maxSpeed);
     
    }

}