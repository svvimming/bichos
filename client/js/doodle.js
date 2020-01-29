class Doodle {
  constructor(){
    this.points = [];
    this.hue = floor(random(0, 360));
    this.gray = 75;
    this.light = 64;
    this.color = 'hsl('+this.hue+', '+this.gray+'%, '+this.lgt+'%)';
    this.motion = 0;

    this.addVertices = function(xcoord, ycoord) {
      var p = {
        x: xcoord,
        y: ycoord
      }
      this.points.push(p);
    }

    this.squiggle = function(t) {
      this.spin = 10*sin(t*PI/points.length);
    }

    this.varyColor = function() {
        var h = (abs(this.hue + floor((mouseX-dummyX)*(360/canvas_width))) % 360);
        var g = Math.min(abs(this.gray + floor((mouseY-dummyY)*(100/canvas_height))), 100);
        var l = Math.max(this.light - 11, 0);
        this.color = 'hsl('+h+', '+g+'%, '+l+'%)';
    }

    this.disappear = function() {
      var scale = 1.01-(0.01*t);
    }

    this.animateX = function(i) {
      var x = this.motion*20*sin(this.spin*i*PI/this.points.length);
      return x;
    }

    this.animateY = function(i) {
      var y = this.motion*20*cos(this.spin*i*PI/this.points.length);
      return y;
    }

    this.display = function() {
      noStroke();
      fill(this.color);
      beginShape();
      for (var i = 0; i < this.points.length; i++) {
        vertex(this.points[i].x + this.animateX(i), this.points[i].y + this.animateY(i);
      }
      endShape();
    }
  }
}
