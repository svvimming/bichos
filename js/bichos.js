class Bicho {
  constructor(xpos, ypos, nodes, limbs, spacing, color, spring, damp, curve, radius, rotAngle, json){
    this.x = xpos;
    this.y = ypos;
    this.vx = 0;
    this.vy = 0;
    this.ax = 0;
    this.ay = 0;
    this.nodes = nodes;
    this.limbs = limbs;
    this.spacing = spacing;
    this.color = color;
    this.spring = spring;
    this.damp = damp;
    this.curve = curve;
    this.nodeX = new Array(this.nodes).fill(0);
    this.nodeY = new Array(this.nodes).fill(0);
    this.angle = new Array(this.nodes).fill(0);
    this.jitter = new Array(this.nodes).fill(0);
    this.radius = radius;
    this.rotAngle = rotAngle;
    this.json = json;
    for(let i=0; i<this.jitter.length; i++) {
      this.jitter[i] = random(0.9, 1.1);
    }

    this.accel = function () {
      this.ax = (mouseX-this.x)*0.5;
      this.ay = (mouseY-this.y)*0.5;
      //springing effect
      this.ax *= this.spring;
      this.ay *= this.spring;
    }

    this.vel = function () {
      this.vx += this.ax;
      this.vy += this.ay;
    }

    this.moveCentre = function() {
      this.x += this.vx;
      this.y += this.vy;

      for (var i=0; i<this.nodes; i++){
        this.nodeX[i] = this.x+cos(radians(this.rotAngle))*this.radius +sin(radians(this.angle[i]));//*(this.vx*0.1);
        this.nodeY[i] = this.y+sin(radians(this.rotAngle))*this.radius +sin(radians(this.angle[i]));//*(this.vy*0.1);
        this.rotAngle += 360.0/this.nodes;
        this.angle[i] *= this.jitter[i];
      }
    }

    // slow down bicho
    this.friction = function() {
      this.vx *= this.damp;
      this.vy *= this.damp;
    }

    this.moveNodes = function() {
     this.accel();
     this.vel();
     this.friction();
     this.moveCentre();
    }

    this.drawWave = function(offsetX, offsetY, rate, j) {
      // change curve tightness
       curveTightness(this.curve);
       fill(this.color);

       beginShape();
       let spacer = 0;

       for (var i=0; i < this.nodes; i++){
         spacer += i;
         curveVertex(
           //x
           (
             this.nodeX[i]+ this.json[i+j].x + offsetX + 0.4*100*
             sin(this.nodeX[i]*(rate+PI/this.nodes))
                  ),
           //y
           (
             this.nodeY[i]+ this.json[i+j].y + offsetY + 0.4*100*
             cos(this.nodeY[i]*(rate+PI/this.nodes))
                  )
         );
       }
       endShape(CLOSE);
    }
    this.drawBicho = function() {
      this.curve = 0.5-((abs(this.vx)+abs(this.vy))*0.1);

      for(var i=0; i<this.limbs; i++){
        this.drawWave(i*this.spacing, i*this.spacing, i*0.01, i);
      }
    }
  }
}
