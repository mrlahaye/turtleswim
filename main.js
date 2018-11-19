/* global Phaser */

//Creates the "main" state of the game
var mainState={
    preload: function(){
        //This function will be executed at game start
        //Location to load ressources like images/sounds
        game.load.image('bird', 'assets/bird.png');
        game.load.image('pipe', 'assets/pipe.png');
    },
    create: function(){
        //Initialize Score
        this.score=0;
        this.labelScore = game.add.text(20, 20, "0",
        { font: "30px Arial", fill: "#ffffff" });
        
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
        
        //Create a group to display all pipes
        this.pipes = game.add.group();
        
        //Create a timer to display the pipes
        this.timer = game.time.events.loop(1500, this.addRowOfPipes, this);
        
        //Set default anchor on the bird sprite
        this.bird.anchor.setTo(-0.2, 0.5);
    },
    update: function(){
      //This function is called to update the gamestate
      //location for the games logic
      
      //If the turtle is out of the screen, restart game
      if (this.bird.y < 0 || this.bird.y > 490)
          this.restartGame();
      if (this.bird.angle < 20)
          this.bird.angle += 1;
      game.physics.arcade.overlap(
              this.bird, this.pipes, this.hitPipe, null, this);
    },
    jump: function(){
        if (this.bird.alive === false)
            return;
        //Add a Vertical velocity to the turtle
        this.bird.body.velocity.y = -350;
        
        //Create an animation on the bird sprite
        var animation = game.add.tween(this.bird);
        
        //Change the angle of the bird withn a 100 ms timeframe
        animation.to({angle : -20}, 100);
        
        //Start the animation
        animation.start();
    },
    restartGame: function(){
        //Start the 'Main' state, restarting the game
        game.state.start('main');
    },
    addOnePipe: function(x,y){
        //Create a pipe at x,y postion
        var pipe = game.add.sprite(x, y, 'pipe');
        
        //Add the pipe to the group in the create function
        this.pipes.add(pipe);
        
        //Enable physics on the pipes
        game.physics.arcade.enable(pipe);
        
        //Adding some velocity to the pipes to make em move
        pipe.body.velocity.x =-200;
        
        //Automatically remove pipes when no longer visible
        pipe.checkWorldBounds = true;
        pipe.outOfBoundsKill = true;        
    },
    addRowOfPipes: function(){
        //Randomly pick a number between 1 to 5 
        var hole = Math.floor(Math.random() * 5)+ 1;
        
        //Add 6 Pipes
        //With an hole  at position 'hole' and 'hole+1'
        for(var i = 0; i<8; i++)
            if(i !== hole && i !== hole + 1)
                this.addOnePipe(400,i*60+10);
        this.score += 1;
        this.labelScore.text = this.score;
    },
    hitPipe: function(){
        //If the bird already hit a pipe, do nothing.
        if (this.bird.alive === false)
            return;
        //set the alive propety of the bird to false
        this.bird.alive = false;
        
        //Prevent new pipes from being generated
        game.time.events.remove(this.timer);
        
        //Stop all movement of pipre
        this.pipes.forEach(function(p){
            p.body.velocity.x = 0;
        }, this);
        
    }
};
//Initializing Phaser module and create "playspace"
var game = new Phaser.Game(400,490);

//Add the "mainState" and call it "Main"
game.state.add('main',mainState);

//Starting the game
game.state.start('main');    