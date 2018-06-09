// The Grid component allows an element to be located
//  on a grid of tiles
Crafty.c('Grid', {
	init: function() {
		this.attr({
			w: Game.map_grid.tile.width,
			h: Game.map_grid.tile.height
		});
	},

	// Locate this entity at the given position on the grid
	at: function(x, y) {
		if (x === undefined && y === undefined) {
			return { x: this.x/Game.map_grid.tile.width, y: this.y/Game.map_grid.tile.height };
		} else {
			this.attr({ x: x * Game.map_grid.tile.width, y: y * Game.map_grid.tile.height });
			return this;
		}
	}
});


// An "Actor" is an entity that is drawn in 2D on canvas
//  via our logical coordinate grid
Crafty.c('Actor', {
	init: function() {
		this.requires('2D, Canvas, Grid');
	},
});

// A Tree is just an Actor with a certain sprite
Crafty.c('Border', {
	init: function() {
		this.requires('Actor, Solid, border');
	},
});

// A Bush is just an Actor with a certain sprite
Crafty.c('Banana', {
	init: function() {
		this.requires('Actor, Solid, banana');
	},
});

// A Rock is just an Actor with a certain sprite
Crafty.c('Rock', {
	init: function() {
    this.requires('Actor, Solid, spr_rock');
	},
});

// This is the player-controlled character
Crafty.c('PlayerCharacter', {
	init: function() {
		this.requires('Actor, Twoway, Collision, spr_player, SpriteAnimation, Gravity, Jumper')
			.twoway(100)       
            .gravity('Floor')
            .jumper(440,['UP_ARROW', 'W'])
			.onHit('Village', this.visitVillage)    
    Crafty.e('Floor, 2D, Canvas, Color, Solid')
        .attr({x: 5, y: 230, w: 500, h: 10})
        .color('rgb(100,75,100)');
        },
    
			// this next method stops the playe if it hits a "Solid"
			//AND moves it back so that it is outside the solid it hit

			// THERE ARE 2 VERSIONS HERE  use the one based on your Crafty Version choice
			// v 7 and 8 it is Moved, in V9 it is Move
			// this is V 7 and v 8 code
			// .bind('Moved', function(evt){
			// 	if (this.hit('Solid')){
			// 		// evt still exists, but not evt.axis or .oldValue
			// 		this[evt.axis] = evt.oldValue;
			// 	}
			//   })

			//this is V 9 code
			/*.bind('Move', function(evt){
				var hitDatas, hitData;
				if ((hitDatas = this.hit('Solid'))) { // check for collision with Solid
					// MBR, simple collision resolution
					// move player to previous position
					this.x = evt._x;
					this.y = evt._y;
										
				  }
			  })
			
			// These next lines define our four animations
			//  each call to .animate specifies:
			//  - the name of the animation
			//  - the x and y coordinates within the sprite
			//     map at which the animation set begins
			//  - the number of animation frames *in addition to* the first one
			.reel('PlayerMovingUp',    600, 0, 0, 3)
			.reel('PlayerMovingRight', 600, 0, 1, 3)
			.reel('PlayerMovingDown',  600, 0, 2, 3)
			.reel('PlayerMovingLeft',  600, 0, 3, 3);*/

		// Watch for a change of direction and switch animations accordingly
		//var animation_speed = 4;
		/*this.bind('NewDirection', function(data) {
			if (data.x > 0) {
				this.animate('PlayerMovingRight', -1);
			} else if (data.x < 0) {
				this.animate('PlayerMovingLeft', -1);
			} else if (data.y > 0) {
				this.animate('PlayerMovingDown', -1);
			} else if (data.y < 0) {
				this.animate('PlayerMovingUp', -1);
			} else {
				this.pauseAnimation();
			}
		})*/
     /*  .bind("EnterFrame", function(){
                if (this.x == Game)  
                {
                    Crafty.pause();
                    Crafty.e('2D, DOM, Text')
                        .attr({x:Game/2, y:Game/2})
                        .text("You Completed Stage One!")
                        .textFont({size:'40px', weight:'bold'});
                }
            }
        );
   
      .bind("EnterFrame", function(){
        if (Crafty.frame() % 8 == 0) {
            //drop();
        }
    });*/
	// Respond to this player visiting a village
	visitVillage: function(data) {
		villlage = data[0].obj;
		villlage.visit();
	}
});


// A village is a tile on the grid that the PC must visit in order to win the game
Crafty.c('Village', {
	init: function() {
		this.requires('Actor, burger');
	},

	// Process a visitation with this village
	visit: function() {
		this.destroy();
		Crafty.audio.play('laf');
		Crafty.trigger('VillageVisited', this);
	}
});