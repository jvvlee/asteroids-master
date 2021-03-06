(function () {
    if ( typeof window.Asteroids === "undefined" ) {
      window.Asteroids = {};
    }

    var GameView = Asteroids.GameView = function (game, ctx) {
        this.game = game;
        this.ctx = ctx;
        this.threads = []
    };

    GameView.prototype.start = function () {
        var game_view = this
        var ship = this.game.ship
        
        key.unbind('r');
        
        var mofongo = setInterval( function () {
            game.step();
            game.draw(ctx);
            game_view.detectMultiKeyHandlers(ship);
        }, 20);
        
        var fufu = setInterval( function () {
            this.game.ship.deccelerate();
        }, 100);
      
        var nguzo_saba = this.game.asteroidAdder();

        this.threads = [mofongo,fufu,nguzo_saba];
    };
  
    GameView.prototype.stop = function () {
      this.threads.forEach(function (threadID) {
        clearInterval(threadID);
      });
      
    };
  
    GameView.prototype.gameOver = function () {
      this.stop(); 
      
      setTimeout(function () {
        
      ctx.save();
        
      ctx.font='bold 30px "Bangers"';
      ctx.textAlign = "center";
      ctx.fillStyle="#FFF";
      ctx.fillText("Final Score: "+game.score,600,400); //why does this clear? Does the draw function persist even after I stop it?
      ctx.fillText("Press the 'r' key to play again", 600,435);
      
      ctx.restore();
      }, 21);
      
      game_View = this
      key('r', function () {
        game_View.game.reset();
        game_View.start();
      })
    };
  

    GameView.prototype.bindKeyHandlers = function () {
      key('up', function () {return false} ); 
      key('down', function () {return false} );      
      key('space', function () {return false} );
      key('left', function () {return false} );
      key('right', function () {return false} );
      key('s', function () {return false} );
    };
  
    GameView.prototype.detectMultiKeyHandlers = function (ship) {
      if(key.isPressed("left")) {ship.rotate(-5)};
      if(key.isPressed("right")) {ship.rotate(5)};
      if(key.isPressed("up")) {ship.power([1,1])};
      if(key.isPressed("down")) {ship.power([-1,-1])};
      if(key.isPressed("space")) {ship.fireBullet()};
      if(key.isPressed("s")) {ship.reset()};
      if(key.isPressed("q")) {ship.game.reset()};
      return false
    };

})();
