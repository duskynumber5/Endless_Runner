class Play extends Phaser.Scene {
    constructor() {
        super("playScene")
    }

    create () {
// ----------------------------------- TEXT & BG ----------------------------------- //
        // background
        this.underwater = this.add.tileSprite(0, 0, game.config.width, game.config.height, 'underwater').setOrigin(0, 0)

        // config scene text
        let playConfig = {
            fontFamily: 'Gill Sans',
            fontSize: '25px',
            color: '#FFFFFF',
            align: 'left',
            padding: {top: 5, bottom: 5},
        }
        // restart and menu option
        this.add.text(game.config.width / 2 - 200, game.config.height - 50, 'press R to restart || press M for menu', playConfig).setOrigin(0,0)
// --------------------------------------------------------------------------------- //
        
// ------------------------------------- TIMER ------------------------------------- //
        // timer text
        playConfig.fontSize = '70px'
        this.timer = this.add.text(game.config.width / 2 - 25, game.config.height / 20 - 50, '0', playConfig).setOrigin(0,0)
        this.timeElapsed = 0
        game.timer = this.time.addEvent({
            delay: 1000,
            callback: () => {
                //console.log("Timer tick")
                this.timeElapsed++
                this.timer.setText(this.timeElapsed)

                // implement if collision max reached == game over
                if(game.timeRemaining <= -1) {
                    this.time.removeEvent(timer)
                    this.timeRight.text = 0
                    // game over scene
                    if (!this.gameOver) {
                        scoreConfig.fixedWidth = 0
                        this.add.text(game.config.width/2, game.config.height/2, 'GAME OVER', gameOverConfig).setOrigin(0.5)
                        this.add.text(game.config.width/2, game.config.height/2 + 64, 'Press (R) to Restart or ← for Menu', gameOverConfig).setOrigin(0.5) 
                        this.gameOver = true
                    }
                }
            },
            callbackScope: this,
            loop: true
        })
// --------------------------------------------------------------------------------- //

// ------------------------------ ANIMATION & SPRITES ------------------------------ //
        // create animation
        this.anims.create({
            key: 'jellyfish!',
            frames: this.anims.generateFrameNumbers('jellyfish!', { start: 0, end: 2, first: 0}),
            frameRate: 3,
            repeat: -1,
        })
        // jellyfish & infinite animation
        this.jellyfish = new Jellyfish(this, game.config.width / 2 - 125, game.config.height - game.config.height / 3, 'jellyfish!').setOrigin(0,0)
        this.jellyfish.anims.play('jellyfish!')

        // create plastic1 animation
        this.anims.create({
            key: 'plastic1',
            frames: this.anims.generateFrameNumbers('plastic1', { start: 0, end: 3, first: 0}),
            frameRate: 2,
            repeat: -1,
        })

        // create plasticBag animation
        this.anims.create({
            key: 'plasticBag',
            frames: this.anims.generateFrameNumbers('plasticBag', { start: 0, end: 1, first: 0}),
            frameRate: 2,
            repeat: -1,
        })

        // create restarting animation
        this.anims.create({
            key: 'restarting',
            frames: this.anims.generateFrameNumbers('restarting', { start: 0, end: 2, first: 0}),
            frameRate: 2,
            repeat: -1,
        })
// --------------------------------------------------------------------------------- //

// ----------------------------------- KEY BINDS ----------------------------------- //
        // bind restart and menu keys
        keyRESTART = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R)
        keyMENU = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.M)
        // bind movement keys
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT)
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT)
// --------------------------------------------------------------------------------- //

// ----------------------------------- RANDOM GEN ----------------------------------- //
        // group to manage obstacles
        this.obstaclesGroup = this.physics.add.group()

        // timer
        this.time.addEvent({
            delay: 1500,
            callback: () => {
                let texture = ''

                switch(Phaser.Math.Between(1, 2)) {
                    case 1:
                        console.log('case 1')
                        texture = 'plastic1' 
                        break
                    case 2:
                        console.log('case 2')
                        texture = 'plasticBag'
                        break
                    default:
                        console.log('flop')
                        break
                }

                // create obstacles
                game.obstacle_ = this.physics.add.sprite(Phaser.Math.Between(-1, game.config.width), 0, texture)


                if (texture = 'plastic1') {
                    game.obstacle_.setSize(150, 150)
                } else if (texture = 'plasticBag') {
                    game.obstacle_.setSize(500, 500)
                }

                // velocity
                game.obstacle_.setVelocityY(100)
                this.obstaclesGroup.add(game.obstacle_)
            },
            callbackScope: this,
            loop: true
        })

        game.obstacle_ = this.add.sprite(game.config.width, game.config.height, this.texture)
// ---------------------------------------------------------------------------------- //

        // game active
        this.gameOver = false
    }  

    update() {
        // continue until game over
        if(!this.gameOver) {
            this.jellyfish.update()
        }

// ---------------------------------- MOVE THINGS ---------------------------------- //
        // move background
        this.underwater.tilePositionY -= 7
        //game.obstacle_.y += 4.5
        // Move each obstacle and remove it if off-screen
        this.obstaclesGroup.getChildren().forEach((obstacle) => {
            if (obstacle.y > this.game.config.height) {
                this.obstaclesGroup.remove(obstacle, true, true); // Remove from group and destroy
            }
        })
// --------------------------------------------------------------------------------- //
        
// ----------------------------------- KEY BINDS ----------------------------------- //
        // R key to restart
        if(Phaser.Input.Keyboard.JustDown(keyRESTART)) {
            // stop timer
            this.time.removeEvent(game.timer)
            // indicate restarting
            this.restarting = this.add.sprite(game.config.width / 3 - 125, game.config.height / 2 - 400 , 'restarting').setOrigin(0,0)
            this.restarting.anims.play('restarting')
            // delay restart
            let restartDelay = this.time.addEvent({
                delay: 3000,
                callback: () => {
                    this.scene.restart()
                }  
            })
        }
        
        // M key for menu
        if(Phaser.Input.Keyboard.JustDown(keyMENU)) {
            this.scene.start('menuScene')
        }
// --------------------------------------------------------------------------------- //

// ----------------------------------- COLLISIONS ----------------------------------- //
        this.obstaclesGroup.getChildren().forEach((obstacle) => {
            this.physics.add.overlap(this.jellyfish, obstacle, () => {
                console.log('Collision detected!');
                // remove obstacle
                this.obstaclesGroup.remove(obstacle, true, true); // Remove from group and destroy

                // text
                this.ouch = this.add.text(this.jellyfish.x, this.jellyfish.y, 'OUCH :(')

                game.timer = this.time.addEvent({
                    delay: 1000,
                    callback: () => {
                        this.ouch.destroy()
                    },
                    callbackScope: this,
                    loop: false
                })

                // show impact on jellyfish
                this.jellyfish.reset()

            }, null, this);
        })

    }
// ---------------------------------------------------------------------------------- //

}