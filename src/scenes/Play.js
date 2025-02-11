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
        this.keysText = this.add.text(game.config.width / 2 - 200, game.config.height - 50, 'press R to restart || press M for menu', playConfig).setOrigin(0,0)

        // lives tracker
        playConfig.fontSize = '40px'
        this.numLives = 3
        this.livesCount = this.add.text(game.config.width / 5 - 240, game.config.height - game.config.height + 10, 'lives: 3', playConfig).setOrigin(0,0)
// --------------------------------------------------------------------------------- //
        
// ------------------------------------- TIMER ------------------------------------- //
        // initalize count
        this.collisionCount = 0

        // timer text
        playConfig.fontSize = '70px'
        this.timer = this.add.text(game.config.width / 2 - 25, game.config.height / 20 - 50, '0', playConfig).setOrigin(0,0)
        this.timeElapsed = 0
        let gameTimer = this.time.addEvent({
            delay: 1000,
            callback: () => {
                //console.log("Timer tick")
                this.timeElapsed++
                this.timer.setText(this.timeElapsed)

                // implement if collision max reached == game over
                if(this.numLives <= 0) {
                    this.time.removeEvent(gameTimer)
                    // game over scene
                    this.gameOver = true
                    this.keysText.text = ''
                    this.jellyfish.anims.stop('jellyfish!')
                    this.jellyfish.body.allowGravity = true
                    this.jellyfish.body.setVelocityY(25)
                    this.jellyfish.body.setCollideWorldBounds(false)

                    playConfig.fontSize = '40px'
                    playConfig.backgroundColor = '#141b8e'
                    this.gameOverText1 = this.add.text(game.config.width/2, game.config.height/2 - 64, ' GAME OVER ', playConfig).setOrigin(0.5)
                    this.gameOverText2 = this.add.text(game.config.width/2, game.config.height/2, ' press R to restart or M for menu ', playConfig).setOrigin(0.5) 
                    game.ouch.destroy()
                    this.livesCount.text = 'lives: 0'
                    this.sound.play('gameOver')
                }
            },
            callbackScope: this,
            loop: true
        })
// --------------------------------------------------------------------------------- //

// ------------------------------ ANIMATION & SPRITES ------------------------------ //
        // jellyfish & infinite animation
        this.jellyfish = new Jellyfish(this, game.config.width / 2 - 125, game.config.height - game.config.height / 3, 'jellyfish!').setOrigin(0,0)
        this.jellyfish.anims.play('jellyfish!')

        // create plastic1 animation
        this.anims.create({
            key: 'plastic1',
            frames: this.anims.generateFrameNumbers('plastic1', { start: 0, end: 3, first: 0}),
            frameRate: 1,
            repeat: -1,
        })

        // create plasticBag animation
        this.anims.create({
            key: 'plasticBag',
            frames: this.anims.generateFrameNumbers('plasticBag', { start: 0, end: 1, first: 0}),
            frameRate: 1,
            repeat: -1,
        })
        
        // create can animation
        this.anims.create({
            key: 'can',
            frames: this.anims.generateFrameNumbers('can', { start: 0, end: 3, first: 0}),
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

                switch(Phaser.Math.Between(1, 3)) {
                    case 1:
                        //console.log('case 1')
                        texture = 'plastic1' 
                        break
                    case 2:
                        //console.log('case 2')
                        texture = 'plasticBag'
                        break
                    case 3:
                        //console.log('case 2')
                        texture = 'can'
                        break
                    default:
                        //console.log('flop')
                        break
                }

                // create obstacles
                game.obstacle_ = this.physics.add.sprite(Phaser.Math.Between(-1, game.config.width), 0, texture)

                // hitbox size
                game.obstacle_.setSize(150, 150)

                // animation
                game.obstacle_.anims.play(game.obstacle_.texture)

                // velocity
                game.obstacle_.setVelocityY(100)
                this.obstaclesGroup.add(game.obstacle_)
                if(!this.gameOver) {    
                    game.sound.play('spawn')
                }
            },
            callbackScope: this,
            loop: true
        })

        // increase speed over time
        this.time.addEvent({
            delay: 1000,
            callback: () => {
                if(!this.gameOver) {
                    this.physics.world.gravity.y = this.physics.world.gravity.y + 5
                    //console.log('gravity is: ' + this.physics.world.gravity.y)
                }
            },
            callbackScope: this,
            loop: true
        })
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
        if(!this.gameOver) {
            this.underwater.tilePositionY -= 7
        }
        if(this.gameOver) {
            this.underwater.tilePositionY += 3
        }

        // Move each obstacle and remove it if-screen
        this.obstaclesGroup.getChildren().forEach((obstacle) => {
            if (obstacle.y > game.config.height) {
                this.obstaclesGroup.remove(obstacle, true, true); // Remove from group and destroy
            }
        })
// --------------------------------------------------------------------------------- //
        
// --------------------------------- RESTART & MENU --------------------------------- //
        // R key to restart
        if(Phaser.Input.Keyboard.JustDown(keyRESTART)) {
                // stop timer
                this.time.removeEvent(game.timer)
                this.gameOverText1.text = ''
                this.gameOverText2.text = ''
                // indicate restarting
                this.sound.play('select')
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
            this.sound.play('select')
            this.scene.start('menuScene')
        }
// ---------------------------------------------------------------------------------- //

// ----------------------------------- COLLISIONS ----------------------------------- //
        // collisions true while not game over
        if (!this.gameOver) {
            this.obstaclesGroup.getChildren().forEach((obstacle) => {
                this.physics.add.overlap(this.jellyfish, obstacle, () => {
                    //console.log('Collision detected!')
                    this.numLives -= 1
                    this.livesCount.text = 'lives: ' + this.numLives
                    // remove obstacle
                    this.obstaclesGroup.remove(obstacle, true, true); // Remove from group and destroy

                    // text
                    game.ouch = this.add.text(this.jellyfish.x + 100, this.jellyfish.y, 'OUCH :(')
                    this.sound.play('hurt', {
                        volume: 0.25
                    })

                    game.timer = this.time.addEvent({
                        delay: 1000,
                        callback: () => {
                            game.ouch.destroy()
                        },
                        callbackScope: this,
                        loop: false
                    })

                    // show impact on jellyfish
                    this.jellyfish.reset()

                }, null, this);
            })
        }
    }
// ---------------------------------------------------------------------------------- //

}