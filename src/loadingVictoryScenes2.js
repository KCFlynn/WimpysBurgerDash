
// Victory scene
// -------------
// Tells the player when they've won and lets them start a new game
Crafty.scene('Victory', function() {
	// Display some text in celebration of the victory
	Crafty.e('2D, DOM, Text')
		.text('You won!')
		.attr({ x: 0, y: Game.height()/2 - 24, w: Game.width() })
		.textFont($text_css);

	// Give'em a round of applause!
	Crafty.audio.play('applause');

	// After a short delay, watch for the player to press a key, then restart
	// the game when a key is pressed
	var delay = true;
	setTimeout(function() { delay = false; }, 5000);
	this.restart_game = function() {
		if (!delay) {
			Crafty.scene('Game');
		}
	};
	Crafty.bind('KeyDown', this.restart_game);
}, function() {
	// Remove our event binding from above so that we don't
	//  end up having multiple redundant event watchers after
	//  multiple restarts of the game
	this.unbind('KeyDown', this.restart_game);
});

Crafty.scene('Lose', function() {
	// Display some text in celebration of the victory
	Crafty.e('2D, DOM, Text')
		.text('You lost!')
		.attr({ x: 0, y: Game.height()/2 - 24, w: Game.width() })
		.textFont($text_css);

	// Give'em a round of applause!
	Crafty.audio.play('lose');

	// After a short delay, watch for the player to press a key, then restart
	// the game when a key is pressed
	var delay = true;
	setTimeout(function() { delay = false; }, 5000);
	this.restart_game = function() {
		if (!delay) {
			Crafty.scene('Game');
		}
	};
	Crafty.bind('KeyDown', this.restart_game);
}, function() {
	// Remove our event binding from above so that we don't
	//  end up having multiple redundant event watchers after
	//  multiple restarts of the game
	this.unbind('KeyDown', this.restart_game);
});

// Loading scene
// -------------
// Handles the loading of binary assets such as images and audio files
Crafty.scene('Loading', function(){
	// Draw some text for the player to see in case the file
	//  takes a noticeable amount of time to load
	Crafty.e('2D, DOM, Text')
		.text('Welcome to Sushi Supremo! Gather as many ingredients as you can to make sushi plates and turn them in at the table to earn points. 100 points wins you the game.')
		.attr({ x: 0, y: Game.height()/2 - 24, w: Game.width() })
		.textFont($text_css);

	// Load our sound files for later use  (can also load sprite map images)
	var assetsObj = {
		"audio": {
            "lose": ['assets/sad_trumpets.wav'],
            "orderUp":['assets/order_up.mp3'],
            "plate":['assets/plate_food.wav'],
            "pickup":['assets/pickup_noise.mp3'],
			"knock": ['assets/door_knock_3x.mp3'],
			"applause": ['assets/board_room_applause.mp3', 'assets/board_room_applause.ogg', 'assets/board_room_applause.aac'],
			"ring": ['assets/candy_dish_lid.mp3', 'assets/candy_dish_lid.ogg', 'assets/candy_dish_lid.aac']
		}
        /*, 'assets/door_knock_3x.ogg', 'assets/door_knock_3x.aac'*/
		//"images": [	'assets/16x16_forest_2.gif', 'assets/hunter.png' ]
	};

	Crafty.load( assetsObj, function(){
		// Once the images are loaded...
		// Define the individual sprites in the image
		// Each one (spr_tree, etc.) becomes a component
		// These components' names are prefixed with "spr_"
		//  to remind us that they simply cause the entity
		//  to be drawn with a certain sprite
		Crafty.sprite(16, 'assets/16x16_forest_2.gif', {
			spr_tree:    [0, 0],
			spr_bush:    [1, 0],
			spr_village: [0, 1],
			spr_rock:    [1, 1]
		});
        
        Crafty.sprite(16, 'assets/sushi-plate-RESIZE.png', {
            spr_plate: [0,0]
        });
        
        Crafty.sprite(16, 'assets/sashimi-RESIZE.png', {
            spr_sashimi: [0,0]
        });
        
        Crafty.sprite(16, 'assets/ginger-RESIZE.png', {
            spr_ginger: [0,0]
        });
        
        Crafty.sprite(16, 'assets/wasabi-RESIZE.png', {
            spr_wasabi: [0,0]
        });
        
        Crafty.sprite(16, 'assets/sushi-rice-RESIZE.png', {
            spr_rice: [0,0]
        });
        
        Crafty.sprite(16, 'assets/table-RESIZE.png', {
            spr_table: [0,0]
        });
        
        Crafty.sprite(16, 'assets/counter-RESIZE.png', {
            spr_counter: [0,0]
        });
        
        

		// Define the PC's sprite to be the first sprite in the third row of the
		//  animation sprite map
		Crafty.sprite(15, 'assets/man-RESIZE2.png', {
			spr_player:  [0, 2],
		}, 0, 2);

		
		// Now that our sprites are ready to draw, start the game
        
        $("#playButton").click(function(){
            Crafty.scene('Game');
        });
        
	});
});