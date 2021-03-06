(function () {
  if ( typeof window.Asteroids === "undefined") {
      window.Asteroids = {};
  }
  
  Asteroid = Asteroids.Asteroid = function (asterArgs) { // takes in pos, game)
      Asteroids.MovingObject.call(this, asterArgs); // calls parent constructor with pos, game
      this.vel = Asteroids.Util.randomVec(5);
      this.radius = 40
      this.sprite = new Image();
      this.sprite.onload = function () {
        this.draw
      };
      this.sprite.src = 'lib/1725.png';
      this.img_center = [40, 35];
      this.center = function () {
         return [this.pos[0]+ 40, this.pos[1] + 35];
      }
  };

  Asteroids.Util.inherits.call(Asteroid, Asteroids.MovingObject); 
  
  Asteroid.prototype.draw = function (ctx) {
    ctx.drawImage(this.sprite, 0, 0, 79, 86, this.pos[0], this.pos[1], 79, 86);
  };

  Asteroid.prototype.collideWith = function (otherObject) { //just set position the same as bullet exit for ship collision
    if (otherObject.constructor === Asteroids.Ship) {
      otherObject.relocate();
      this.game.lives -= 1
      if (game.lives == 0) {
        gameView.gameOver();
      }
    } else if (otherObject.constructor === Asteroids.Asteroid) {
      if (!this._recent_change) {
        this._recent_change = true
        otherObject._recent_change = true
        
        setTimeout(function () {
          this._recent_change = false;
          otherObject._recent_change = false;
        }.bind(this), 200)
        
        var dist = this.vectorDistance(otherObject);
        
        switch (Asteroids.Util.comparison(dist[0],dist[1])) {
          case 1:
            this.vel = [this.vel[0], -this.vel[1]];
            otherObject.vel = [otherObject.vel[0], -otherObject.vel[1]];
          case -1:
            this.vel = [-this.vel[0], this.vel[1]];
            otherObject.vel = [-otherObject.vel[0], otherObject.vel[1]];
          default:
            this.vel = [this.vel[0]*-1, this.vel[1]*-1];
            otherObject.vel = [otherObject.vel[0]*-1, otherObject.vel[1]*-1];
        }
      }
    }
  };
  
  Asteroid.prototype.isCollidedWith = function (otherObject) {
    var dist = this.absoluteDistance(otherObject)
    var radii_distance = this.radius + otherObject.radius;
    return (dist <= radii_distance)
  };
  
  Asteroid.prototype.spawn = function () {
    
  }

})();
