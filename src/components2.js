//these are the player's points
var points = 0;

//this is the player's backpack


var backpack = {
    sashimi: 0,
    wasabi: 0,
    ginger: 0,
    sushiRice: 0,
    smallSushi: 0,
    mediumSushi: 0,
    largeSushi: 0
}




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
Crafty.c('Tree', {
	init: function() {
		this.requires('Actor, Solid, spr_counter');
	},
});

// A Bush is just an Actor with a certain sprite

/*

Crafty.c('Bush', {
	init: function() {
		this.requires('Actor, Solid, spr_bush');
	},
});
*/

// A Rock is just an Actor with a certain sprite

/*
Crafty.c('Rock', {
	init: function() {
    this.requires('Actor, Solid, spr_rock');
	},
});
*/
// This is the player-controlled character
Crafty.c('PlayerCharacter', {
	init: function() {
		this.requires('Actor, Fourway, Collision, spr_player, SpriteAnimation')
			.fourway(40)
			.onHit('Village', this.visitVillage)
            .onHit('Sashimi', this.pickupSashimi)
            .onHit('Wasabi', this.pickupWasabi)
            .onHit('Ginger', this.pickupGinger)
            .onHit('SushiRice', this.pickupSushiRice)
            .onHit('Plate', this.usePlate)
            .onHit('ChoppingBoard', this.orderUp)
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
			.bind('Move', function(evt){
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
			.reel('PlayerMovingUp',    600, 0, 1, 3)
			.reel('PlayerMovingRight', 600, 0, 3, 3)
			.reel('PlayerMovingDown',  600, 0, 0, 3)
			.reel('PlayerMovingLeft',  600, 0, 2, 3);

		// Watch for a change of direction and switch animations accordingly
		var animation_speed = 4;
		this.bind('NewDirection', function(data) {
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
		});
	},

	
	// Respond to this player visiting a village
	visitVillage: function(data) {
		villlage = data[0].obj;
		villlage.visit();
	},
    
    pickupSashimi: function(data) {
		sashimi = data[0].obj;
		sashimi.visit();
	},
    
    pickupWasabi: function(data) {
		wasabi = data[0].obj;
		wasabi.visit();
	},
         
    pickupGinger: function(data) {
		ginger = data[0].obj;
		ginger.visit();
	},

    pickupSushiRice: function(data) {
		sushiRice = data[0].obj;
		sushiRice.visit();
	},
    
    usePlate: function(data) {
		plate = data[0].obj;
		plate.use();
	},
    
    orderUp: function(data) {
		order = data[0].obj;
		order.turnIn();
	}
});

// A village is a tile on the grid that the PC must visit in order to win the game
/*
Crafty.c('Village', {
	init: function() {
		this.requires('Actor, spr_village');
	},

	// Process a visitation with this village
	visit: function() {
		this.destroy();
		Crafty.audio.play('knock');
		Crafty.trigger('VillageVisited', this);
	}
});
*/

Crafty.c('Plate', {
	init: function() {
		this.requires('Actor, spr_plate');
	},

	// Process a visitation with this village
	use: function() {
		this.destroy();
		Crafty.audio.play('plate');
        
        if(backpack.sashimi > 0 && backpack.sushiRice > 0 && backpack.ginger > 0 && backpack.wasabi > 0){
            backpack.largeSushi = backpack.largeSushi + 1;
            backpack.sashimi = backpack.sashimi - 1;
            backpack.sushiRice = backpack.sushiRice - 1;
            backpack.ginger = backpack.ginger - 1;
            backpack.wasabi = backpack.wasabi - 1;
        } else if(backpack.sashimi > 0 && backpack.sushiRice > 0){
            if(backpack.ginger > 0){
                backpack.sashimi = backpack.sashimi - 1;
                backpack.sushiRice = backpack.sushiRice - 1;
                backpack.ginger = backpack.ginger - 1;
                backpack.mediumSushi = backpack.mediumSushi + 1;
            } else if(backpack.wasabi > 0){
                backpack.sashimi = backpack.sashimi - 1;
                backpack.sushiRice = backpack.sushiRice - 1;
                backpack.wasabi = backpack.wasabi - 1;
                backpack.mediumSushi = backpack.mediumSushi + 1;
            }else{
                backpack.sashimi = backpack.sashimi - 1;
                backpack.sushiRice = backpack.sushiRice - 1;
                backpack.smallSushi = backpack.smallSushi + 1;
            }
        }
	}
});

Crafty.c('Sashimi', {
	init: function() {
		this.requires('Actor, spr_sashimi');
	},

	// Process a visitation with this village
	visit: function() {
		this.destroy();
		Crafty.audio.play('pickup');
        backpack.sashimi = backpack.sashimi + 1;
	}
});

Crafty.c('Wasabi', {
	init: function() {
		this.requires('Actor, spr_wasabi');
	},

	// Process a visitation with this village
	visit: function() {
		this.destroy();
		Crafty.audio.play('pickup');
        backpack.wasabi = backpack.wasabi + 1;
	}
});

Crafty.c('Ginger', {
	init: function() {
		this.requires('Actor, spr_ginger');
	},

	// Process a visitation with this village
	visit: function() {
		this.destroy();
		Crafty.audio.play('pickup');
        backpack.ginger = backpack.ginger + 1;
	}
});

Crafty.c('SushiRice', {
	init: function() {
		this.requires('Actor, spr_rice');
	},

	// Process a visitation with this village
	visit: function() {
		this.destroy();
		Crafty.audio.play('pickup');
        backpack.sushiRice = backpack.sushiRice + 1;
	}
});

Crafty.c('ChoppingBoard', {
	init: function() {
		this.requires('Actor, spr_table');
	},

	// Process a visitation with this village
	turnIn: function() {
		Crafty.audio.play('orderUp');
        
        if(backpack.largeSushi > 0){
            points = points + 50;
            backpack.largeSushi = backpack.largeSushi - 1;
        }
        
        if(backpack.mediumSushi > 0){
            points = points + 30;
            backpack.mediumSushi = backpack.mediumSushi - 1;
        }
        
        if(backpack.smallSushi > 0){
            points = points + 10;
            backpack.smallSushi = backpack.smallSushi -1;
        }
        
        $("#pointsDisplay").text("Points: " + points.toString());
	}
});