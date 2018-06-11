// The Grid component allows an element to be located
//  on a grid of tiles
Crafty.c('Grid1', {
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
		this.requires('2D, Canvas, Grid1');
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
Crafty.c('PlayerCharacter1', {
	init: function() {
		var wimpy = this.requires('Actor, Twoway, Collision, spr_player, SpriteAnimation, Gravity, Jumper')
			.twoway(100)       
            .gravity('Floor')
            .jumper(420,['UP_ARROW', 'W'])
			.onHit('Village', this.visitVillage)

      wimpy.reel("walking", 1000, [
        [0, 1],
        [1, 1],
        [2, 1],
        [3, 1],
        [4, 1],
        [5, 1]
      ]);
      wimpy.animate("walking", -1);
        
    Crafty.e('Floor, 2D, Canvas, Color, Solid')
        .attr({x: 5, y: 230, w: 500, h: 10})
        .color('rgb(100,75,100)');
        },
   
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
})

function drop()
    {
        var hitCounter = 0;
        var hitText = Crafty.e('2D, Canvas, Text')
        .attr({ x: 620, y: 50, w: Game.width() });
        //hitText.text('Hits:' + hitCounter);
        hitText.textFont({ size: '30px', weight: 'bold' })
    
      var randomx = Math.floor((Math.random() * Game.map_grid.tile.width) + 80);
        Crafty.e('Drop, 2D, Solid, Gravity, Collision, banana, Canvas')
            .attr({x: randomx, y: 0, w: 16, h: 16})
            .gravity(.1)
            .onHit('Actor', function(){
                this.destroy();
                hitCounter++;
                hitText.text("Hits: " + hitCounter);
    
                if (hitCounter == 5)
                {
                  wimpy.x = 20;
                  hitCounter = 0;
                  hitText.text("Hits: " + hitCounter);
                }
            })
            .onHit('Floor', function(){
                this.destroy();
            })
            
            .bind("EnterFrame", function() {
                if (this.y > Game.map_grid.tile.height)
                  this.destroy();
            })
    };