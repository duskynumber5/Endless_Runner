class Play extends Phaser.Scene {
    constructor() {
        super("playScene")
    }

    create () {
        // background
        this.underwater = this.add.tileSprite(0, 0, game.config.width, game.config.height, 'underwater').setOrigin(0, 0)

        // jellyfish & infinite animation
        this.swim = this.add.sprite(game.config.width / 2 - 130, game.config.height - game.config.height / 3, 'jellyfish!').setOrigin(0,0)
        this.swim.anims.play('jellyfish!')              // play jellyfish animation

        // bind movement keys
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT)
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT)

        // set move speed
        this.moveSpeed = 7

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
        
        playConfig.fontSize = '70px'
        // timer
        this.timer = this.add.text(game.config.width / 2 - 25, game.config.height / 20 - 50, '0', playConfig).setOrigin(0,0)

        this.timeElapsed = 0
        let timer = this.time.addEvent({
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

        // bind restart and menu keys
        keyRESTART = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R)
        keyMENU = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.M)

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

    }  

    update() {
        // move background
        this.underwater.tilePositionY -= 7

        // movement w/ boundaries
        if(keyLEFT.isDown && this.swim.x >= borderUISize - this.swim.width / 1.2) {
            this.swim.x -= this.moveSpeed
        } else if(keyRIGHT.isDown && this.swim.x <= game.config.width - this.swim.width / 2) {
            this.swim.x += this.moveSpeed
        }

        // R key to restart
        if(Phaser.Input.Keyboard.JustDown(keyRESTART)) {
            this.scene.restart()
        }

        // M key for menu
        if(Phaser.Input.Keyboard.JustDown(keyMENU)) {
            this.scene.start('menuScene')
        }

        if(false) {
            // load sprites
            this.plastic1 = this.add.sprite(game.config.width / 2, game.config.height / 2, 'plastic1').setOrigin(0,0)
            this.plastic1.anims.play('plastic1') 

            this.plasticBag = this.add.sprite(game.config.width / 2, game.config.height / 2, 'plasticBag').setOrigin(0,0)
            this.plasticBag.anims.play('plasticBag')
        }
    }

}