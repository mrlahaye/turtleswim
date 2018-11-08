/* global Phaser */

//Creates the "main" state of the game
var mainState={
    preload: function(){
        //This function will be executed at game start
        //Location to load ressources like images/sounds
        game.load.image('bird', 'assets/bird.png');
    },
    create: function(){
        //This function is called after the preload one
        //Location to setup the game, sprites...
        game.stage.backgroundColor = '#71c5cf';
        
        //Setting Physics
        game.physics.startSystem(Phaser.Physics.ARCADE);
        
        //display turtle at position x=100 y=245
        this.bird = game.add.sprite(100, 245, 'bird');
        
        //Add Physics to turtlesprite
        game.physics.arcade.enable(this.bird);
        
        //Add Gravity to turtlesprite
        this.bird.body.gravity.y = 1000;
        
        //Make the turtleswim on spacebar hit
        var spaceKey = game.input.keyboard.addKey(
                        Phaser.Keyboard.SPACEBAR);
        spaceKey.onDown.add(this.jump, this);        
        
    },
    update: function(){
      //This function is called to update the gamestate
      //location for the games logic
      
      //If the turtle is out of the screen, restart game
      if (this.bird.y < 0 || this.bird.y > 490)
          this.restartGame();
    },
    jump: function(){
        //Add a Vertical velocity to the turtle
        this.bird.body.velocity.y = -350;
    },
    restartGame: function(){
        //Start the 'Main' state, restarting the game
        game.state.start('main');
    }
};
//Initializing Phaser module and create "playspace"
var game = new Phaser.Game(400,490);

//Add the "mainState" and call it "Main"
game.state.add('main',mainState);

//Starting the game
game.state.start('main');