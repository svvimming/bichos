class Doodle {
  constructor(){
    this.points = [];
    this.hue = floor(random(0, 360));
    this.gray = 75;
    this.color = 'hsl('+this.hue+', 75%, 64%)';
    this.hsl = [];
    this.motion = 0;
    this.spin = 0;
    this.dummyX = 0;
    this.dummyY = 0;
    this.scale = 0;

    this.addVertices = function(xcoord, ycoord) {
      var p = {
        x: xcoord,
        y: ycoord
      }
      this.points.push(p);
    }

    this.squiggle = function(t) {
      this.spin = 10*sin(t*PI/this.points.length);
    }

    this.varyColor = function() {
        var h = (abs(this.hue + floor((mouseX-this.dummyX)*(360/canvas_width))) % 360);
        var g = Math.min(abs(this.gray + floor((mouseY-this.dummyY)*(100/canvas_height))), 100);
        var l = Math.max(this.gray - 11, 0);
        this.color = 'hsl('+h+', '+g+'%, '+l+'%)';
        this.hsl = [h, g, l];
    }

    this.disappear = function(t) {
      this.scale = 1.01-(0.01*t);
      if (0.5<this.scale) {
        for(var i=0; i<this.points.length; i++) {
          this.points[i].x *= this.scale;
          this.points[i].y *= this.scale;
          this.motion *= this.scale;
        }
      } else {
        this.points = [];
        index +=1;
        drawing = false;
        donedrawing = false;
        submitted = false;
        done = false;
        incA = 0;
        incB = 0;
      }
    }

    this.setmotion = function(amt) {
      this.motion = amt;
    }

    this.animateX = function(i) {
      var x = this.motion*20*sin(this.spin*i*PI/this.points.length);
      return x;
    }

    this.animateY = function(i) {
      var y = this.motion*20*cos(this.spin*i*PI/this.points.length);
      return y;
    }

    this.show = function() {
      noStroke();
      fill(this.color);
      beginShape();
      for (var i = 0; i < this.points.length; i++) {
        vertex(this.points[i].x + this.animateX(i), this.points[i].y + this.animateY(i));
      }
      endShape();
    }
  }
}
